import Link from "next/link";
import Container from "~/components/website/container";

export default function NotFound() {
  return (
    <Container>
      <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
          404
        </h1>
        <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400">
          Oops! Page not found.
        </p>
        <p className="mt-2 text-base text-gray-500 dark:text-gray-500">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="bg-primary hover:bg-secondary focus-visible:outline-primary rounded-full px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-offset-2"
          >
            Go back home
          </Link>
          {/* Optional: Add a contact link */}
          {/* <Link href="/contact" className="text-sm font-semibold text-gray-900 dark:text-white">
            Contact support <span aria-hidden="true">&rarr;</span>
          </Link> */}
        </div>
      </div>
    </Container>
  );
}
