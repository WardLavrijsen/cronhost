import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { validateCronAndGetNextDate } from "~/lib/cron";
import { createScheduleSchema } from "~/schemas/schedules/create";
import { schedules } from "~/server/db/schema";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const scheduleRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createScheduleSchema)
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx.session;
      const { cron, timezone, name, description, url, type, body, headers } =
        input;

      let nextRunDateTime: Date;

      try {
        // 1. Validate cron expression and calculate the first run time
        // This now returns a Luxon DateTime object or null/throws on error
        const nextRunLuxon = validateCronAndGetNextDate(cron, timezone);

        if (!nextRunLuxon) {
          // This case handles potential internal errors in getNextDateLuxon
          // if validation somehow passed but calculation failed.
          console.error(
            `Failed to calculate next run time for ${cron} in ${timezone}, though validation passed.`,
          );
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Could not calculate the first run time for the schedule.",
          });
        }

        // 2. Convert Luxon DateTime to standard JS Date (which is UTC) for DB
        nextRunDateTime = nextRunLuxon.toJSDate();
      } catch (error) {
        // Catch errors from validateCronAndGetNextDate (e.g., invalid cron string)
        if (
          error instanceof Error &&
          error.message.includes("Invalid cron expression")
        ) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: error.message, // Forward the specific validation error
            cause: error,
          });
        }
        // Catch other unexpected errors during calculation
        console.error(
          "Unexpected error during cron validation/calculation:",
          error,
        );
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to validate or calculate schedule timing.",
          cause: error,
        });
      }

      try {
        // 3. Insert into the database
        const [newSchedule] = await ctx.db
          .insert(schedules)
          .values({
            userId: user.id,
            name: name,
            description: description,
            cronExpression: cron, // Store original expression
            timezone: timezone, // Store user's timezone
            endpoint: url,
            httpMethod: type,
            body: body, // Store as JSON or text? Depends on schema
            headers: headers, // Store as JSON or text? Depends on schema
            isEnabled: true, // Default to enabled
            nextRunAtUtc: nextRunDateTime, // Store calculated UTC time
          })
          .returning();

        if (!newSchedule) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create schedule record after insertion.",
          });
        }

        // 4. Return the newly created schedule
        return newSchedule;
      } catch (dbError) {
        // Handle potential database errors (e.g., constraint violations)
        console.error("Database error creating schedule:", dbError);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to save the schedule to the database.",
          cause: dbError,
        });
      }
    }),

  // Query to get all schedules for the current user
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const { user } = ctx.session;

    try {
      const userSchedules = await ctx.db.query.schedules.findMany({
        where: eq(schedules.userId, user.id), // Filter by the logged-in user's ID
        orderBy: (schedules, { desc }) => [desc(schedules.createdAt)], // Optional: Order by creation date, newest first
      });
      return userSchedules;
    } catch (error) {
      console.error("Database error fetching user schedules:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to retrieve your schedules.",
        cause: error,
      });
    }
  }),

  // Query to get a schedule by its ID
  getById: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const { user } = ctx.session;

      try {
        const userSchedules = await ctx.db.query.schedules.findFirst({
          where: and(eq(schedules.userId, user.id), eq(schedules.id, input)),
          with: {
            jobs: true,
          },
        });

        return userSchedules;
      } catch (error) {
        console.error("Database error fetching user schedules:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to retrieve the schedule.",
          cause: error,
        });
      }
    }),

  // Query to get a schedule by its ID
  updateEnabled: protectedProcedure
    .input(
      z.object({
        scheduleId: z.string(),
        isEnabled: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx.session;

      try {
        await ctx.db
          .update(schedules)
          .set({
            isEnabled: input.isEnabled,
          })
          .where(
            and(
              eq(schedules.userId, user.id),
              eq(schedules.id, input.scheduleId),
            ),
          );

        return true;
      } catch (error) {
        console.error("Database error fetching user schedules:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to retrieve the schedule.",
          cause: error,
        });
      }
    }),
});
