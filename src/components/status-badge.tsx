import { Pause } from "lucide-react";
import { Badge } from "./ui/badge";
import { IconCircleCheckFilled } from "@tabler/icons-react";

export function StatusBadge({ isEnabled }: { isEnabled: boolean }) {
  return (
    <Badge variant="outline" className="text-muted-foreground px-1.5">
      {isEnabled ? (
        <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
      ) : (
        <Pause className="fill-red-500 text-red-500" />
      )}
      {isEnabled ? "Enabled" : "Disabled"}
    </Badge>
  );
}
