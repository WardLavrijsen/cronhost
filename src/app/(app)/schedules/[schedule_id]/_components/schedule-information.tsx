import { IconDotsVertical } from "@tabler/icons-react";
import { Pause, Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { StatusBadge } from "~/components/status-badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import type { Schedule } from "~/server/db/schema";
import { api } from "~/trpc/react";

function DataPoint({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <p className="text-sm font-bold">{label}</p>
      <p className="text-muted-foreground text-base">{value}</p>
    </div>
  );
}

export function ScheduleInformation({
  schedule,
  className,
}: {
  schedule: Schedule;
  className?: string;
}) {
  const router = useRouter();

  const updateEnabledSchedule = api.schedule.updateEnabled.useMutation({
    onSuccess: () => {
      toast.success(
        "Schedule is now " + (schedule.isEnabled ? "paused" : "active"),
      );

      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message ?? "Failed to update schedule");
    },
  });

  async function updateEnabled() {
    updateEnabledSchedule.mutate({
      isEnabled: !schedule.isEnabled,
      scheduleId: schedule.id,
    });
  }

  return (
    <Card className={className ?? ""}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg">
          {schedule.name}
          <StatusBadge isEnabled={schedule.isEnabled} />
        </CardTitle>
        <CardDescription className="text-base">
          {schedule.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <DataPoint label="Schedule" value={schedule.cronExpression} />
          <DataPoint label="Timezone" value={schedule.timezone} />
          <DataPoint label="Endpoint" value={schedule.endpoint} />
          <DataPoint label="HTTP Method" value={schedule.httpMethod} />
          <DataPoint
            label="Request headers"
            value={JSON.stringify(schedule.headers ?? {})}
          />
          <DataPoint
            label="Request body"
            value={JSON.stringify(schedule.body ?? {})}
          />

          <div className="my-10"></div>

          <DataPoint
            label="Next run (browser time)"
            value={schedule.nextRunAtUtc.toLocaleString()}
          />

          <DataPoint
            label="Last run (browser time)"
            value={schedule.lastRunAtUtc?.toLocaleString() ?? "Not run yet"}
          />
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button>Run now</Button>
          {schedule.isEnabled ? (
            <Button variant="outline">
              <Pause className="mr-1 size-4 fill-red-500 text-red-500" /> Pause
            </Button>
          ) : (
            <Button variant="outline" onClick={updateEnabled}>
              <Play className="mr-1 size-4 fill-green-500 text-green-500" />{" "}
              Activate
            </Button>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
              size="icon"
            >
              <IconDotsVertical />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}
