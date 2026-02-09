import {
  ComponentParameter,
  ComponentProps,
  UniformRichText,
  UniformText,
} from "@uniformdev/next-app-router/component";

export const HeroComponent = ({
  parameters: { title, description },
  // you can get variant if needed
  // variant,
  component,
}: ComponentProps<HeroProps>) => {
  return (
    <>
      <UniformText
        component={component}
        parameter={title}
        className="m-0 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-center"
        placeholder={"title goes here"}
        as="h1"
      />
      <UniformRichText
        component={component}
        parameter={description}
        placeholder={"description goes here"}
        className="my-4 text-xl sm:text-2xl leading-normal text-center"
      />
    </>
  );
};

export type HeroProps = {
  title: ComponentParameter<string>;
  description: ComponentParameter<string>;
};
