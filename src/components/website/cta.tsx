import Link from "next/link";
import { Button } from "~/components/ui/button";

const CTA: React.FC = () => {
  return (
    <section id="cta" className="mt-10 mb-5 lg:my-20">
      <div className="relative z-10 mx-auto h-full w-full py-12 sm:py-20">
        <div className="h-full w-full">
          <div className="absolute inset-0 -z-10 h-full w-full rounded-3xl bg-[#050a02] bg-[linear-gradient(to_right,#12170f_1px,transparent_1px),linear-gradient(to_bottom,#12170f_1px,transparent_1px)] bg-[size:6rem_4rem] opacity-95">
            <div className="absolute top-0 right-0 bottom-0 left-0 rounded-3xl bg-[radial-gradient(circle_600px_at_50%_500px,#1C1C02,transparent)]"></div>
          </div>

          <div className="flex h-full flex-col items-center justify-center px-5 text-center text-white">
            <h2 className="mb-4 max-w-2xl text-2xl font-semibold sm:text-3xl md:text-5xl md:leading-tight">
              Ready to Simplify Your Scheduled Tasks?
            </h2>

            <p className="mx-auto max-w-xl md:px-5">
              Get reliable webhook triggering up and running in minutes.
            </p>

            <div className="mt-4 flex flex-col items-center sm:flex-row sm:gap-4">
              <Button asChild size="lg">
                <Link href="/dashboard">
                  Sign Up Free & Schedule Your First Job
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
