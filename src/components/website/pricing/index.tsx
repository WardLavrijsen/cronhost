import PricingColumn from "./pricing-column";

import type { IPricing } from "~/types";

export const tiers: IPricing[] = [
  {
    name: "Free",
    price: "Free",
    description: "The best way to get started",
    features: [
      "Webhook scheduling", // Core feature
      "Customizable requests (method, headers, body)", // Core feature
      "Automatic retries on failure", // Core feature
      "Up to 1 run per minute (per job)", // Frequency limit
      "7-day execution history", // Retention limit
      "Single user access", // User limit
      "Email support", // Support level
    ],
    buttonText: "Get Started",
    buttonLink: "/dashboard",
  },
  {
    name: "Custom",
    price: "Contact us",
    description: "Everything in free, plus...",
    features: [
      "Everything in starter, plus:", // Build on Starter
      "Higher frequency scheduling", // Key upgrade
      "Unlimited active jobs", // Key upgrade
      "Extended execution history", // Key upgrade
      "Multiple users & team features", // Key upgrade
      "Dedicated support", // Key upgrade
      "Custom solutions & integrations", // Catch-all
    ],
    buttonText: "Contact us",
    buttonLink: "mailto:help@cronho.st",
  },
];

const Pricing: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      {tiers.map((tier) => (
        <PricingColumn key={tier.name} tier={tier} />
      ))}
    </div>
  );
};

export default Pricing;
