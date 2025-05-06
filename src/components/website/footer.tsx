import Link from "next/link";
import React from "react";

import type { IMenuItem, ISocials } from "~/types";

const footerDetails: {
  quickLinks: IMenuItem[];
  email: string;
  socials: ISocials;
} = {
  quickLinks: [
    {
      text: "Features",
      url: "#features",
    },
    {
      text: "Pricing",
      url: "#pricing",
    },
    {
      text: "FAQ",
      url: "#faq",
    },
    {
      text: "Dashboard",
      url: "/dashboard",
    },
  ],
  email: "help@cronho.st",
  socials: {
    github: "https://github.com",
    x: "https://twitter.com/x",
    twitter: "https://twitter.com/Twitter",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
    linkedin: "https://www.linkedin.com",
  },
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-accent text-foreground py-10">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-6 md:grid-cols-3">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <h3 className="text-primary cursor-pointer text-4xl font-extrabold">
              cron<span className="text-secondary">host*</span>
            </h3>
          </Link>
          <p className="text-foreground-accent mt-3.5">
            Stop wrestling with crontabs and server management. Trigger any
            webhook on your schedule, reliably managed by cronhost.
          </p>
        </div>
        <div>
          <h4 className="mb-4 text-lg font-semibold">Quick Links</h4>
          <ul className="text-foreground-accent">
            {footerDetails.quickLinks.map((link) => (
              <li key={link.text} className="mb-2">
                <Link href={link.url} className="hover:text-foreground">
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-lg font-semibold">Contact Us</h4>

          {footerDetails.email && (
            <a
              href={`mailto:${footerDetails.email}`}
              className="text-foreground-accent hover:text-foreground block"
            >
              Email: {footerDetails.email}
            </a>
          )}

          {/* {footerDetails.socials && (
            <div className="mt-5 flex flex-wrap items-center gap-5">
              {Object.keys(footerDetails.socials).map((platformName) => {
                if (platformName && footerDetails.socials[platformName]) {
                  return (
                    <Link
                      href={footerDetails.socials[platformName]}
                      key={platformName}
                      aria-label={platformName}
                    >
                      {getPlatformIconByName(platformName)}
                    </Link>
                  );
                }
              })}
            </div>
          )} */}
        </div>
      </div>
      <div className="text-foreground-accent mt-8 px-6 md:text-center">
        <p>
          Copyright &copy; {new Date().getFullYear()} cronhost. All rights
          reserved.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Made with ❤️ by{" "}
          <a href="https://wardlavrijsen.com" target="_blank">
            Ward Lavrijsen
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
