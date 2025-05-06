import { CronJob } from "cron";
import { DateTime } from "luxon";
import cronValidate from "cron-validate";

export function validateCron(cronExpression: string): boolean {
  const result = cronValidate(cronExpression, {
    preset: "npm-node-cron",
    override: {
      useSeconds: false,
    },
  });
  return (
    typeof result === "object" &&
    result !== null &&
    "isValid" in result &&
    result.isValid()
  );
}

export function getNextDateLuxon(
  cronExpression: string,
  timezone: string,
  referenceDate?: DateTime,
): DateTime | null {
  try {
    const nowInZone = referenceDate ?? DateTime.now().setZone(timezone);

    const job = new CronJob(
      cronExpression,
      () => {
        /* onTick - not used for calculation */
      },
      null, // onComplete
      false, // start = false
      timezone, // Timezone applied here
      null, // context
      false, // runOnInit
      undefined, // utcOffset - use timezone instead
      true, // unrefTimeout
    );

    // .nextDate() requires the context to be set correctly for the reference time.
    // We'll manually adjust the job's internal state for the reference date.
    // This is a bit of a workaround as cron doesn't directly take a reference date for nextDate().
    // We set the job's internal 'lastExecution' relative to our reference date.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
    (job as any).lastExecution = nowInZone;

    const nextDate = job.nextDate();

    // Important: Stop the job timer explicitly, even though start=false,
    // to prevent potential resource leaks if internal timers were somehow initiated.
    void job.stop(); // Explicitly ignore potential promise return

    return nextDate;
  } catch (error) {
    console.error(
      `Error calculating next date for "${cronExpression}" in timezone "${timezone}":`,
      error,
    );
    return null;
  }
}

export function validateCronAndGetNextDate(
  cronExpression: string,
  timezone: string,
  referenceDate?: DateTime,
): DateTime | null {
  if (!validateCron(cronExpression)) {
    throw new Error(`Invalid cron expression`);
  }
  return getNextDateLuxon(cronExpression, timezone, referenceDate);
}

export function getNextDateUtc(
  cronExpression: string,
  timezone: string,
  referenceDate?: DateTime,
): Date | null {
  const nextLuxonDate = getNextDateLuxon(
    cronExpression,
    timezone,
    referenceDate,
  );
  return nextLuxonDate ? nextLuxonDate.toJSDate() : null;
}
