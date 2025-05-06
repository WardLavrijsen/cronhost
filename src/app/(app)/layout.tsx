import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "~/server/auth";

import { SiteHeader } from "~/components/site-header";
import { SidebarInset } from "~/components/ui/sidebar";

export default async function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <>
      <SidebarInset>
        <SiteHeader />
        {children}
      </SidebarInset>
    </>
    // <SidebarProvider
    //   style={
    //     {
    //       "--sidebar-width": "calc(var(--spacing) * 72)",
    //       "--header-height": "calc(var(--spacing) * 12)",
    //     } as React.CSSProperties
    //   }
    // >
    //   <AppSidebar variant="inset" />
    //   <SidebarInset>
    //     <SiteHeader />
    //     {children}
    //   </SidebarInset>
    // </SidebarProvider>
  );
}
