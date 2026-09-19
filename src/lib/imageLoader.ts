/**
 * Bypass Next's image optimization proxy for remote URLs.
 * Unsplash (and similar CDNs) often time out when fetched server-side
 * through /_next/image — load them directly in the browser instead.
 */
export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  if (src.startsWith("https://images.unsplash.com")) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 75));
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "crop");
    return url.toString();
  }

  // Local / public assets — serve as-is (width handled by CSS / next sizing)
  if (src.startsWith("/")) {
    return src;
  }

  return src;
}
