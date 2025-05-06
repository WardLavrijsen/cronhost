import { DataTable } from "~/components/tables/schedule-table";

import { api } from "~/trpc/server";

export default async function Page() {
  const schedules = await api.schedule.getAll();

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <DataTable data={schedules} />
        </div>
      </div>
    </div>
  );
}
