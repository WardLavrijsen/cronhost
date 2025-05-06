import { relations, sql } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  jsonb,
  pgEnum,
  integer,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const schedules = pgTable("schedules", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"), // Nullable based on schema usage elsewhere
  cronExpression: text("cron_expression").notNull(),
  timezone: text("timezone").notNull(), // IANA timezone string
  endpoint: text("endpoint").notNull(), // URL to call
  httpMethod: text("http_method", {
    enum: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  }).notNull(), // Use enum for restricted values
  body: jsonb("body"), // Store request body as JSON, nullable
  headers: jsonb("headers"), // Store request headers as JSON, nullable
  isEnabled: boolean("is_enabled").notNull().default(true),
  nextRunAtUtc: timestamp("next_run_at_utc", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
  lastRunAtUtc: timestamp("last_run_at_utc", {
    withTimezone: true,
    mode: "date",
  }), // Nullable
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" })
    .notNull()
    .defaultNow(),
});

export type Schedule = typeof schedules.$inferSelect;

export const statusEnum = pgEnum("job_status", [
  "STARTED",
  "RUNNING",
  "SUCCESS",
  "FAILED",
]);

export const jobs = pgTable("jobs", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  scheduleId: text("schedule_id")
    .notNull()
    .references(() => schedules.id, { onDelete: "cascade" }),
  status: statusEnum("status").notNull().default("STARTED"),
  statusCode: integer("status_code"),
  response: jsonb("response"),
  retryAmount: integer("retry_amount").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" })
    .notNull()
    .defaultNow(),
});

export const jobRelations = relations(jobs, ({ one }) => ({
  schedules: one(schedules, {
    fields: [jobs.id],
    references: [schedules.id],
  }),
}));

export const scheduleRelations = relations(schedules, ({ many }) => ({
  jobs: many(jobs),
}));

export type Job = typeof jobs.$inferSelect;
