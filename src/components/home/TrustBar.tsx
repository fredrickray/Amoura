import { Reveal } from "@/components/Reveal";

const items = [
  {
    label: "Worldwide shipping",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M3 7h11v10H3V7Zm11 3h4l3 3v4h-7v-7Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="7" cy="18" r="1.5" fill="currentColor" />
        <circle cx="17" cy="18" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Studio appointments",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 3l1.8 5.4H19l-4.4 3.2 1.7 5.4L12 13.8 7.7 17l1.7-5.4L5 8.4h5.2L12 3Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "30 days returns",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 12a8 8 0 1 0 2.3-5.7M4 4v4h4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export function TrustBar() {
  return (
    <section className="px-5 pb-8 md:px-8">
      <Reveal>
        <div className="mx-auto grid max-w-[1240px] gap-4 rounded-[22px] border border-line bg-surface px-4 py-5 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-line sm:px-2">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-center gap-3 px-4 py-2 text-sm font-semibold uppercase tracking-[0.06em] text-ink"
            >
              <span className="text-ink-soft">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
