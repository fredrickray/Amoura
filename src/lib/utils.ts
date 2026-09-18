export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function formatPrice(value: number) {
  return `₦${value.toLocaleString("en-NG")}`;
}
