import Image from "next/image";
import Link from "next/link";

export function AuthShell({
  children,
  title,
  subtitle,
  imageSrc,
  imageAlt,
  imageCaption,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  imageCaption?: string;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative flex flex-col px-5 py-8 md:px-10 md:py-10 lg:px-14">
        <Link
          href="/"
          className="mb-10 flex w-fit items-center gap-2.5 transition-transform duration-160 active:scale-[0.98]"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-ink text-white">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M8 1.5C5.2 4.1 3.5 6.4 3.5 8.7a4.5 4.5 0 0 0 9 0C12.5 6.4 10.8 4.1 8 1.5Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span className="font-script text-[2rem] leading-none text-blush-deep">
            Amoura
          </span>
        </Link>

        <div className="mx-auto flex w-full max-w-[420px] flex-1 flex-col justify-center pb-10">
          <h1 className="font-display text-[clamp(2rem,4vw,2.75rem)] leading-[1.1] tracking-[-0.03em] text-ink">
            {title}
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>

      <div className="relative hidden min-h-screen overflow-hidden bg-ink lg:block">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className="object-cover"
          sizes="50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/20" />
        <div className="absolute inset-x-0 bottom-0 p-10 xl:p-14">
          <p className="font-script text-4xl text-blush xl:text-5xl">Amoura</p>
          <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-white/75">
            {imageCaption ??
              "Perfumes, custom magazines, and lash artistry — beauty that feels personal."}
          </p>
        </div>
      </div>
    </div>
  );
}

export function AuthCard({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex min-h-screen flex-col px-5 py-8 md:px-10">
      <Link
        href="/"
        className="mb-10 flex w-fit items-center gap-2.5 transition-transform duration-160 active:scale-[0.98]"
      >
        <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-ink text-white">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M8 1.5C5.2 4.1 3.5 6.4 3.5 8.7a4.5 4.5 0 0 0 9 0C12.5 6.4 10.8 4.1 8 1.5Z"
              fill="currentColor"
            />
          </svg>
        </span>
        <span className="font-script text-[2rem] leading-none text-blush-deep">
          Amoura
        </span>
      </Link>

      <div className="mx-auto flex w-full max-w-[440px] flex-1 flex-col justify-center pb-16">
        <h1 className="font-display text-[clamp(2rem,4vw,2.75rem)] leading-[1.1] tracking-[-0.03em]">
          {title}
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{subtitle}</p>
        <div className="mt-8 rounded-[24px] border border-line bg-surface p-6 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
