/** Admin-defined page tiers — even counts only. Replace with CMS later. */
export type MagazinePageTier = {
  pages: number;
  price: number; // full price in Naira
};

export const MAGAZINE_PAGE_MIN = 20;
export const MAGAZINE_PAGE_MAX = 120;
export const MAGAZINE_PAGE_STEP = 4; // even increments (actually keep even: 20, 24, 28...)

/** Price table mocked as admin config */
export const magazinePageTiers: MagazinePageTier[] = [
  { pages: 20, price: 28000 },
  { pages: 24, price: 32000 },
  { pages: 28, price: 36000 },
  { pages: 32, price: 40000 },
  { pages: 36, price: 44000 },
  { pages: 40, price: 48000 },
  { pages: 48, price: 55000 },
  { pages: 56, price: 62000 },
  { pages: 64, price: 70000 },
  { pages: 72, price: 78000 },
  { pages: 80, price: 86000 },
  { pages: 96, price: 98000 },
  { pages: 112, price: 112000 },
  { pages: 120, price: 120000 },
];

export function getMagazinePrice(pages: number) {
  const tier = magazinePageTiers.find((t) => t.pages === pages);
  return tier?.price ?? null;
}

export function getMagazineDeposit(fullPrice: number) {
  return Math.round(fullPrice * 0.5);
}

export function getMagazineBalance(fullPrice: number) {
  return fullPrice - getMagazineDeposit(fullPrice);
}

export const MAGAZINE_INSPO_MAX_IMAGES = 2;
export const MAGAZINE_INSPO_MAX_VIDEOS = 1;
