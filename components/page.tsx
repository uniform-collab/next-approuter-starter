import {
  ComponentProps,
  UniformSlot,
} from "@uniformdev/next-app-router/component";

export type PageProps = unknown;
export type PageSlots = "content";

export const Page = ({ slots }: ComponentProps<PageProps, PageSlots>) => <UniformSlot slot={slots.content} />