import {
  ComponentParameter,
  ComponentProps,
  UniformText,
} from "@uniformdev/next-app-router/component";

export type WhyChooseUsProps = {
  title: ComponentParameter<string>;
  description: ComponentParameter<string>;
};

export const WhyChooseUsComponent = ({
  parameters: { title, description },
  component,
}: ComponentProps<WhyChooseUsProps>) => {
  return (
    <section className="bg-[#fffbfa] px-6 sm:px-12 lg:px-20 py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <UniformText
          component={component}
          parameter={title}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#b62000] leading-tight md:w-1/2"
          placeholder="Why Choose Us?"
          as="h2"
        />
        <UniformText
          component={component}
          parameter={description}
          className="text-base sm:text-lg leading-relaxed text-[#281d1b] md:w-1/2 md:pt-2"
          placeholder="Our platform is designed to scale with your business, offering unmatched flexibility and performance."
          as="p"
        />
      </div>
    </section>
  );
};
