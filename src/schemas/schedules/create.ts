import { z } from "zod";

const jsonString = z.string().refine(
  (val) => {
    // Allow empty string
    if (val.trim() === "") return true;
    try {
      JSON.parse(val);
      return true;
    } catch {
      return false;
    }
  },
  { message: "Invalid JSON format" },
);

export const createScheduleSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  description: z.string().optional(),
  cron: z.string().min(1, {
    message: "Cron is required",
  }),
  timezone: z.string().min(1, { message: "Timezone is required" }),
  type: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
  url: z.string().min(1, {
    message: "URL is required",
  }),
  headers: jsonString.optional(),
  body: jsonString.optional(),
});
