import Link from "next/link";

import { LoginForm } from "~/components/forms/login-form";

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center justify-center gap-1">
          <span className="text-primary cursor-pointer text-4xl font-extrabold">
            cron<span className="text-secondary">host*</span>
          </span>
        </Link>
        <LoginForm />
      </div>
    </div>
  );
}
