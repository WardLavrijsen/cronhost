import { redirect } from "next/navigation";
import { api } from "~/trpc/server";
import { ScheduleInformation } from "./_components/schedule-information";
import { JobsTable } from "~/components/tables/jobs-table";

export default async function NewSchedulePage({
  params,
}: {
  params: Promise<{ schedule_id: string }>;
}) {
  const scheduleId = (await params).schedule_id;

  const schedule = await api.schedule.getById(scheduleId);

  if (!schedule) {
    redirect("/schedules");
  }

  return (
    <div className="@container/main flex flex-1 flex-col gap-2 px-4 py-4 md:gap-6 md:py-6 lg:px-6">
      <div className="flex flex-col gap-4 xl:flex-row">
        <ScheduleInformation className="w-full max-w-xl" schedule={schedule} />
        <JobsTable data={schedule.jobs} />
      </div>
    </div>
  );
}
