import "~/styles/globals.css";

import { type Metadata } from "next";
import localFont from "next/font/local";

import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "~/components/theme-provider";

export const metadata: Metadata = {
  title: "Free & Reliable Cron Job Webhook Scheduler | cronhost",
  description:
    "Stop wrestling with crontabs! cronhost offers free, reliable cron scheduling for webhooks. Easy UI, custom requests, auto-retries & insightful monitoring. Sign up free!",
  icons: [{ rel: "icon", url: "/logo.svg" }],
};

const satoshi = localFont({
  src: [
    // Variable font (normal)
    {
      path: "../fonts/Satoshi-Variable.woff2",
      weight: "300 900",
      style: "normal",
    },
    // Variable font (italic)
    {
      path: "../fonts/Satoshi-VariableItalic.woff2",
      weight: "300 900",
      style: "italic",
    },
  ],
  variable: "--font-satoshi",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${satoshi.className}`}>
      <head>
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="0704f807-3c9d-4a0c-b8bc-159d0267387d"
        ></script>
      </head>
      <body>
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
