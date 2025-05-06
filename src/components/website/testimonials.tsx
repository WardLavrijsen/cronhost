import React from "react";

import type { ITestimonial } from "~/types";

export const testimonials: ITestimonial[] = [
  {
    name: "Sarah K.",
    role: " Indie developer",
    message: `Finally, cron jobs without the headache! cronhost took minutes to set up for tasks that used to involve SSHing and wrestling with crontabs. The UI is clean, it just works, and it saves me a ton of time.`,
  },
  {
    name: "Mike R.",
    role: "Lead frontend engineer",
    message: `We needed a reliable way to trigger our serverless functions on a schedule. cronho.st was the perfect fit. It's straightforward, handles retries gracefully, and the execution history gives us confidence that our critical webhooks are firing correctly.`,
  },
  {
    name: "Jamie L.",
    role: "DevOps engineer",
    message: `Needed a simple, free way to ping an API endpoint every hour for a monitoring script. cronhost was incredibly easy to set up and the free tier is perfect for this kind of task. Does exactly what it says on the tin.`,
  },
];

const Testimonials: React.FC = () => {
  return (
    <div className="mx-auto grid w-full max-w-lg gap-14 lg:max-w-full lg:grid-cols-3 lg:gap-8">
      {testimonials.map((testimonial, index) => (
        <div key={index} className="">
          <div className="mb-4 w-full">
            <h3 className="text-secondary text-lg font-semibold">
              {testimonial.name}
            </h3>
            <p className="text-foreground-accent text-sm">{testimonial.role}</p>
          </div>
          <p className="text-foreground-accent text-center lg:text-left">
            &quot;{testimonial.message}&quot;
          </p>
        </div>
      ))}
    </div>
  );
};

export default Testimonials;
