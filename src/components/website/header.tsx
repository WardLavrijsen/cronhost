"use client";

import Link from "next/link";
import type React from "react";
import { Menu } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import Container from "~/components/website/container";

import type { IMenuItem } from "~/types";

export const menuItems: IMenuItem[] = [
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
];

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 mx-auto w-full bg-transparent md:absolute">
      <Container className="!px-0">
        <nav className="mx-auto flex items-center justify-between bg-white px-5 py-2 shadow-md md:bg-transparent md:py-10 md:shadow-none">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <span className="text-primary cursor-pointer text-4xl font-extrabold">
              cron<span className="text-secondary">host*</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden space-x-6 md:flex md:items-center">
            {menuItems.map((item) => (
              <li key={item.text}>
                <Link
                  href={item.url}
                  className="text-foreground hover:text-primary text-base transition-colors"
                >
                  {item.text}
                </Link>
              </li>
            ))}
            <li>
              <Button size="lg" asChild>
                <Link href="/dashboard">Go to app</Link>
              </Button>
            </li>
          </ul>

          {/* Mobile Menu Button with Sheet */}
          <div className="flex items-center md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  variant="default"
                  className="rounded-full"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] px-3 pt-10 sm:w-[400px]"
              >
                {/* Logo in Mobile Menu */}
                <Link href="/" className="mb-8 flex items-center gap-1">
                  <span className="text-primary cursor-pointer text-4xl font-extrabold">
                    cron<span className="text-secondary">host*</span>
                  </span>
                </Link>
                {/* Mobile Menu Links */}
                <ul className="flex flex-col space-y-6">
                  {menuItems.map((item) => (
                    <li key={item.text}>
                      <Link
                        href={item.url}
                        className="text-foreground hover:text-primary text-lg"
                      >
                        {item.text}
                      </Link>
                    </li>
                  ))}
                  <li className="pt-4">
                    <Button asChild size="lg" className="w-full">
                      <Link href="/dashboard">Go to app</Link>
                    </Button>
                  </li>
                </ul>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
