import BenefitSection from "./benefit-section";
import type { IBenefit } from "~/types";

import {
  Activity,
  Asterisk,
  Earth,
  FolderKanban,
  LayoutDashboard,
  Logs,
  RotateCcw,
  Settings2,
  Webhook,
} from "lucide-react";

export const benefits: IBenefit[] = [
  {
    title: "Effortless scheduling",
    description:
      "Setting up complex schedules shouldn't be complex. Define when your jobs run using familiar syntax or our simple UI, set your timezone, and let cronhost handle the precision timing.",
    bullets: [
      {
        title: "Standard cron syntax",
        description:
          "Use the powerful and familiar cron format you already know.",
        icon: <Asterisk className="size-7" />,
      },
      {
        title: "Timezone support",
        description:
          "Ensure accuracy across locations by setting your job's specific timezone.",
        icon: <Earth className="size-7" />,
      },
      {
        title: "Simple web interface",
        description:
          "Easily create, update, and manage jobs through a clean dashboard.",
        icon: <LayoutDashboard className="size-7" />,
      },
    ],
    imageSrc: "/dashboard.jpg",
  },
  {
    title: "Flexible & reliable triggering",
    description:
      "Configure precisely how your webhooks are called and trust cronhost to execute them reliably, even handling temporary network issues or endpoint failures automatically.",
    bullets: [
      {
        title: "Customizable requests",
        description:
          "Define HTTP method (POST, GET, etc.), custom headers, and request body.",
        icon: <Settings2 className="size-6" />,
      },
      {
        title: "Automatic retries",
        description:
          "Jobs automatically retry on failure, ensuring temporary issues don't stop your workflow.",
        icon: <RotateCcw className="size-6" />,
      },
      {
        title: "Direct webhook execution",
        description:
          "Simple, direct triggering of your specified URL without complex setup.",
        icon: <Webhook className="size-6" />,
      },
    ],
    imageSrc: "/dashboard.jpg",
  },
  {
    title: "Insightful monitoring & control",
    description:
      "Get clear visibility into job performance and easily manage all your scheduled tasks from a central dashboard. Understand exactly what happened and when.",
    bullets: [
      {
        title: "Detailed execution history",
        description:
          "Review past runs with timestamps, success/failure status, and response codes.",
        icon: <Logs className="size-6" />,
      },
      {
        title: "At-a-glance job status",
        description:
          "Quickly see the current state and health of all your configured jobs.",
        icon: <Activity className="size-6" />,
      },
      {
        title: "Centralized job management",
        description:
          "View, edit, enable, disable, or delete all your scheduled jobs in one place.",
        icon: <FolderKanban className="size-6" />,
      },
    ],
    imageSrc: "/dashboard.jpg",
  },
];

const Benefits: React.FC = () => {
  return (
    <div id="features">
      <h2 className="sr-only">Features</h2>
      {benefits.map((item, index) => {
        return (
          <BenefitSection
            key={index}
            benefit={item}
            imageAtRight={index % 2 !== 0}
            isLast={index === benefits.length - 1}
          />
        );
      })}
    </div>
  );
};

export default Benefits;
