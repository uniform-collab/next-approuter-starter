import {
  UniformComposition,
  UniformPageParameters,
  resolveRouteFromCode,
} from "@uniformdev/next-app-router";
import { resolveComponent } from "@/components/resolveComponent";

// Enable ISR: pages are generated on first visit and cached
export const generateStaticParams = async () => {
  return [];
};

export default async function UniformPage(props: UniformPageParameters) {
  const { code } = await props.params;
  return (
    <UniformComposition
      code={code}
      resolveRoute={resolveRouteFromCode}
      resolveComponent={resolveComponent}
    />
  );
}
