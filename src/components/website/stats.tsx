import { BarChart, Globe, Star } from "lucide-react";
import type { IStats } from "~/types";

export const stats: IStats[] = [
  {
    title: "100.000+",
    icon: <BarChart size={34} className="text-primary" />,
    description:
      "Scheduled tasks processed securely every month, providing real-time insights.",
  },
  {
    title: "5.0",
    icon: <Star size={34} className="text-primary" />,
    description: "Star rating, consistently maintained.",
  },
  {
    title: "99.99%",
    icon: <Globe size={34} className="text-primary" />,
    description:
      "Uptime guarantee, ensuring your scheduled tasks are always running.",
  },
];

const Stats: React.FC = () => {
  return (
    <section id="stats" className="py-10 lg:py-36">
      <div className="grid gap-8 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="mx-auto max-w-md text-center sm:max-w-full sm:text-left"
          >
            <h3 className="mb-5 flex items-center justify-center gap-2 text-3xl font-semibold sm:justify-start">
              {stat.icon}
              {stat.title}
            </h3>
            <p className="text-foreground-accent">{stat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
