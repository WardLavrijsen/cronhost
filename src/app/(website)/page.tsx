import Benefits from "~/components/website/benefits/benefits";
import Container from "~/components/website/container";
import CTA from "~/components/website/cta";
import FAQ from "~/components/website/faq";
import Hero from "~/components/website/hero";
// import Logos from "~/components/website/logos";
import Pricing from "~/components/website/pricing";
import Section from "~/components/website/section";
import Stats from "~/components/website/stats";
// import Testimonials from "~/components/website/testimonials";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });

  // void api.post.getLatest.prefetch();

  return (
    <>
      <Hero />
      {/* <Logos /> */}

      <Container>
        <Stats />

        <Benefits />

        <Section
          id="pricing"
          title="Pricing"
          description="Free unless you need something more."
        >
          <Pricing />
        </Section>

        {/* <Section
          id="testimonials"
          title="What Our Clients Say"
          description="Hear from those who have partnered with us."
        >
          <Testimonials />
        </Section> */}

        <FAQ />

        {/* <Stats /> */}

        <CTA />
      </Container>
    </>
  );
}
