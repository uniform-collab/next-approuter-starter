import {
  ComponentParameter,
  ComponentProps,
  UniformRichText,
  UniformText,
} from "@uniformdev/next-app-router/component";

export const HeroComponent = ({
  parameters: { title, subline, description },
  component,
}: ComponentProps<HeroProps>) => {
  return (
    <section className="flex flex-col items-center gap-6">
      <div className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1 text-xs font-medium text-indigo-600 tracking-wide">
        Uniform Starter Kit for Next.js App Router
      </div>
      <UniformText
        component={component}
        parameter={title}
        className="m-0 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-center tracking-tight text-neutral-900"
        placeholder={"title goes here"}
        as="h1"
      />
      <UniformText
        component={component}
        parameter={subline}
        className="text-lg sm:text-xl font-medium text-center text-neutral-600"
        placeholder={"subline goes here"}
        as="p"
      />
      <UniformRichText
        component={component}
        parameter={description}
        placeholder={"description goes here"}
        className="max-w-2xl text-lg sm:text-xl leading-relaxed text-center text-neutral-500"
      />
      <div className="mt-4 h-px w-16 bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />
    </section>
  );
};

export type HeroProps = {
  title: ComponentParameter<string>;
  subline: ComponentParameter<string>;
  description: ComponentParameter<string>;
};
