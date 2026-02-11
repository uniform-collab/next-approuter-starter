interface HeroProps {
  title: string;
  image: {
    src: string;
    alt: string;
  };
}

export default function Hero({ title, image }: HeroProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-16 pb-20">
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-primary leading-[1.05] tracking-tight text-center max-w-5xl mx-auto text-balance">
        {title}
      </h1>
      <div className="mt-12 w-full overflow-hidden rounded-2xl bg-surface">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-auto object-cover aspect-video"
        />
      </div>
    </section>
  );
}
