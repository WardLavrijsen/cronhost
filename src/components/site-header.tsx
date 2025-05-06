"use client";

import { IconDashboard, IconListDetails } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { NavUser } from "./nav-user";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: IconDashboard,
  },
  {
    href: "/schedules",
    label: "Schedules",
    icon: IconListDetails,
  },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="flex shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 py-4 lg:gap-2 lg:px-6">
        {/* <SidebarTrigger className="-ml-1" /> */}
        <Link href="/" className="flex items-center gap-1">
          <span className="text-primary cursor-pointer text-3xl font-extrabold">
            cron<span className="text-secondary">host*</span>
          </span>
        </Link>
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Button
              key={item.href}
              variant="ghost"
              asChild
              size="sm"
              className="hidden sm:flex"
            >
              <Link href={item.href} className={isActive ? "underline" : ""}>
                <Icon className="mr-2 h-4 w-4" /> {item.label}
              </Link>
            </Button>
          );
        })}
        <div className="ml-auto flex items-center gap-2">
          <NavUser />
        </div>
      </div>
    </header>
  );
}
