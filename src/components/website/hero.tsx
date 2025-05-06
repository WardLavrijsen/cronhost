import React from "react";
import Image from "next/image";

import { Button } from "../ui/button";
import Link from "next/link";

const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative flex items-center justify-center px-5 pt-32 pb-0 md:pt-40"
    >
      <div className="absolute top-0 bottom-0 left-0 -z-10 w-full">
        <div className="bg-hero-background absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] bg-[size:40px_40px]"></div>
      </div>

      <div className="absolute right-0 bottom-0 left-0 h-40 bg-gradient-to-b from-transparent via-[rgba(233,238,255,0.5)] to-[rgba(202,208,230,0.5)] backdrop-blur-[2px]"></div>

      <div className="text-center">
        <h1 className="text-foreground mx-auto max-w-lg text-4xl font-bold md:max-w-3xl md:text-6xl md:leading-tight">
          Reliable <span className="text-primary">cron</span> scheduling,
          completely <span className="text-secondary">free</span>.
        </h1>
        <p className="text-foreground mx-auto mt-4 max-w-lg">
          Stop wrestling with crontabs and server management. Trigger any
          webhook on your schedule, reliably managed by cronhost.
        </p>
        <div className="mx-auto mt-6 flex w-fit flex-col items-center sm:flex-row sm:gap-4">
          <Button size="lg" asChild>
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>
        <div className="relative z-10 mx-auto mt-12 h-[388px] w-full max-w-4xl overflow-hidden rounded-t-lg border-3 border-b-0 md:mt-16">
          <Image
            src="/dashboard.jpg"
            width={1024}
            height={576}
            quality={100}
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority={true}
            unoptimized={true}
            alt="app mockup"
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
