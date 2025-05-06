"use client";

import type { IFAQ } from "~/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

import SectionTitle from "./section-title";

const faqs: IFAQ[] = [
  {
    question: `What exactly does cronhost do?`,
    answer:
      "cronhost is a simple web service that allows you to schedule HTTP requests (webhook triggers) using standard cron syntax. You define a schedule, a target URL, and optionally customize the request (method, headers, body), and our service will reliably trigger that URL for you at the specified times.",
  },
  {
    question: `Is it really free? What's the catch?`,
    answer:
      " Yes, cronhost is currently offered free of charge. It was initially built for personal use and is being shared with the community. While we aim to keep it free, fair use policies apply, and we may need to introduce usage limits or tiers in the future to ensure service stability and cover operational costs if usage grows significantly.",
  },
  {
    question: "What cron syntax is supported?",
    answer: `We support the standard 5-field cron format (* * * * * - minute, hour, day of month, month, day of week). You can use standard operators like *, ,, -, and / to define complex schedules.`,
  },
  {
    question: "Can I customize the HTTP request?",
    answer:
      "Yes! You can specify the HTTP method (GET, POST, PUT, DELETE, etc.), add custom request headers (e.g., for authentication tokens), and include a custom request body (e.g., JSON payload for POST requests).",
  },
  {
    question: "What happens if my webhook endpoint fails or times out?",
    answer:
      "cronhost includes automatic retries with exponential backoff for transient failures (like network errors or temporary server issues on your end). If your endpoint consistently fails, the job will eventually be marked as failed after several attempts.",
  },
  {
    question:
      "How is this different from using the cron daemon on my own server?",
    answer:
      "cronhost removes the need for you to manage a server, configure the cron daemon, handle logging, ensure uptime, or implement retry logic yourself. It provides a centralized web interface for management and monitoring.",
  },
  {
    question: "How secure is my information (webhook URLs, headers)?",
    answer:
      "We take security seriously. Communication with cronhost is over HTTPS. We follow standard security practices for web applications. However, we recommend using dedicated API keys or tokens in headers/body rather than embedding highly sensitive credentials directly if possible, as is good practice for any webhook system.",
  },
];

const FAQ: React.FC = () => {
  return (
    <section id="faq" className="py-10 lg:py-20">
      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="">
          <p className="text-foreground-accent hidden lg:block">FAQ&apos;S</p>
          <SectionTitle>
            <h2 className="my-3 text-center !leading-snug lg:max-w-sm lg:text-left">
              Frequently Asked Questions
            </h2>
          </SectionTitle>
          <p className="text-foreground-accent text-center lg:mt-10 lg:text-left">
            Ask us anything!
          </p>
          <a
            href="mailto:help@cronho.st"
            className="text-secondary mt-3 block text-center text-xl font-semibold hover:underline lg:text-left lg:text-4xl"
          >
            help@cronho.st
          </a>
        </div>

        <div className="mx-auto w-full lg:max-w-2xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-2xl font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground-accent text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
