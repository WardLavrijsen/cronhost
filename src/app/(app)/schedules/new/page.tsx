import { NewScheduleForm } from "~/components/forms/new-schedule";

export default function NewSchedulePage() {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2 px-4 py-4 md:gap-6 md:py-6 lg:px-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">New Schedule</h1>
        <NewScheduleForm className="w-full max-w-2xl" />
      </div>
    </div>
  );
}
