import Image from "next/image";
import Link from "next/link";
import { PillButton } from "@/components/PillButton";
import { Reveal } from "@/components/Reveal";
import { blogPosts } from "@/data/catalog";

export function BlogSection() {
  const [featured, ...rest] = blogPosts;

  return (
    <section className="px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="badge mb-4">Blog</p>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] tracking-[-0.03em]">
              Explore Beauty Reads Tailored to Your Lifestyle
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <PillButton href="/blog" variant="solid">
              View All
            </PillButton>
          </Reveal>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          <Reveal>
            <Link
              href={`/blog#${featured.slug}`}
              className="group grid overflow-hidden rounded-[24px] border border-line bg-surface md:grid-cols-[1.1fr_0.9fr]"
            >
              <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[360px]">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out-strong)] group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-col justify-between p-6 md:p-8">
                <div>
                  <p className="text-sm text-ink-muted">{featured.category}</p>
                  <h3 className="mt-2 font-display text-3xl leading-tight tracking-tight">
                    {featured.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                    {featured.excerpt}
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-between text-sm text-ink-soft">
                  <div>
                    <p className="font-medium text-ink">{featured.author}</p>
                    <p>{featured.role}</p>
                  </div>
                  <p>{featured.readTime}</p>
                </div>
              </div>
            </Link>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={0.06 * (i + 1)}>
                <Link
                  href={`/blog#${post.slug}`}
                  className="group flex gap-4 overflow-hidden rounded-[20px] border border-line bg-surface p-3 transition-colors hover:bg-white"
                >
                  <div className="relative size-24 shrink-0 overflow-hidden rounded-[14px] sm:size-28">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-[var(--ease-out-strong)] group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-col justify-center py-1">
                    <p className="text-xs text-ink-muted">{post.readTime}</p>
                    <p className="mt-1 text-[15px] font-semibold leading-snug">
                      {post.title}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
