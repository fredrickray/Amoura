import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { blogPosts } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogPage() {
  return (
    <div className="px-5 pb-24 pt-10 md:px-8 md:pt-16">
      <div className="mx-auto max-w-[980px]">
        <Reveal>
          <p className="badge mb-4">Blog</p>
          <h1 className="font-display text-[clamp(2.4rem,5vw,4rem)] leading-[1.02] tracking-[-0.03em]">
            Explore Beauty Reads Tailored to Your Lifestyle
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-soft">
            Notes on fragrance, editorial print, and lash care from the Amoura
            atelier.
          </p>
        </Reveal>

        <div className="mt-14 flex flex-col gap-10">
          {blogPosts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.05} id={post.slug}>
              <article className="grid overflow-hidden rounded-[24px] border border-line bg-surface md:grid-cols-[0.9fr_1.1fr]">
                <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[260px]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center p-6 md:p-8">
                  <p className="text-sm text-ink-muted">
                    {post.category} · {post.readTime}
                  </p>
                  <h2 className="mt-2 font-display text-3xl tracking-tight">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                    {post.excerpt}
                  </p>
                  {post.author ? (
                    <p className="mt-6 text-sm text-ink-soft">
                      <span className="font-medium text-ink">{post.author}</span>
                      {post.role ? ` · ${post.role}` : null}
                    </p>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
