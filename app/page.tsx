import cmsData from "@/cms.json";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import SectionHeader from "@/components/landing/SectionHeader";
import PricingCard from "@/components/landing/PricingCard";
import SplitContent from "@/components/landing/SplitContent";
import TestimonialCard from "@/components/landing/TestimonialCard";
import Footer from "@/components/landing/Footer";

export default function HomePage() {
  const { header, hero, pricing, splitContent, testimonials, footer } = cmsData;

  return (
    <>
      <Header
        logo={header.logo}
        navigation={header.navigation}
        actions={header.actions}
      />

      <main>
        {/* Hero */}
        <Hero title={hero.title} image={hero.image} />

        {/* Pricing */}
        <section className="mx-auto max-w-7xl px-6 py-16" id="pricing">
          <SectionHeader
            title={pricing.sectionTitle}
            subtitle={pricing.sectionSubtitle}
          />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricing.plans.map((plan) => (
              <PricingCard
                key={plan.tier}
                tier={plan.tier}
                price={plan.price}
                description={plan.description}
                ctaLabel={plan.ctaLabel}
                ctaVariant={plan.ctaVariant as "primary" | "outline"}
                highlighted={plan.highlighted}
                features={plan.features}
              />
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <SplitContent
          eyebrow={splitContent.eyebrow}
          body={splitContent.body}
        />

        {/* Testimonials */}
        <section className="py-16 overflow-hidden" id="testimonials">
          <div className="mx-auto max-w-7xl px-6">
            <SectionHeader title={testimonials.sectionTitle} />
          </div>
          <div className="mt-10 flex gap-5 px-6 overflow-x-auto pb-4 scrollbar-hide">
            <div className="mx-auto flex gap-5">
              {testimonials.items.map((item) => (
                <TestimonialCard
                  key={item.name}
                  name={item.name}
                  role={item.role}
                  avatar={item.avatar}
                  quote={item.quote}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer
        logo={footer.logo}
        columns={footer.columns}
        socialIcons={footer.socialIcons}
      />
    </>
  );
}
