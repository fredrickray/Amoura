export type Catalogue = "perfume" | "magazine" | "lashes";

export type Product = {
  slug: string;
  name: string;
  brand: string;
  catalogue: Catalogue;
  price: number;
  compareAt?: number;
  rating: number;
  reviews: number;
  size: string;
  description: string;
  features: string[];
  image: string;
  gallery: string[];
};

export const products: Product[] = [
  {
    slug: "lum-noir",
    name: "Lum Noir",
    brand: "Amoura Parfum",
    catalogue: "perfume",
    price: 89000,
    compareAt: 110000,
    rating: 4.8,
    reviews: 312,
    size: "Eau de Parfum, 50ml",
    description:
      "A deep, luminous scent woven from smoked cedar, black orchid, and warm amber — made for evenings that linger.",
    features: [
      "Long-wear concentration that unfolds over hours",
      "Hand-blended in small batches with natural extracts",
    ],
    image: "/products/lum-parfum.png",
    gallery: [
      "/products/lum-parfum.png",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59db9?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    slug: "dew-elixir",
    name: "Dew Elixir",
    brand: "Amoura Parfum",
    catalogue: "perfume",
    price: 78000,
    rating: 4.7,
    reviews: 186,
    size: "Body mist, 100ml",
    description:
      "A soft luminous mist of florals and cream woods — light enough for day, polished enough for evening.",
    features: [
      "Soft textures, powerful presence",
      "Gentle by nature, memorable by design",
    ],
    image: "/products/dew-elixir.png",
    gallery: [
      "/products/dew-elixir.png",
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    slug: "amoura-edit-vol-3",
    name: "Amoura Edit Vol. III",
    brand: "Custom Magazine",
    catalogue: "magazine",
    price: 45000,
    rating: 4.9,
    reviews: 94,
    size: "Print edition, 96 pages",
    description:
      "A personalized editorial — your story, photos, and style notes bound into a keepsake magazine.",
    features: [
      "Fully customized cover and spreads",
      "Premium matte paper with soft-touch finish",
    ],
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    slug: "private-issue",
    name: "Private Issue",
    brand: "Custom Magazine",
    catalogue: "magazine",
    price: 55000,
    rating: 4.8,
    reviews: 67,
    size: "Print edition, 120 pages",
    description:
      "An elevated keepsake magazine designed around milestones — birthdays, proposals, brand launches.",
    features: [
      "Dedicated art direction for your theme",
      "Shipped in a protective presentation sleeve",
    ],
    image:
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1481627834876-b7833e1d6431?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    slug: "silk-lash-set",
    name: "Silk Lash Set",
    brand: "Amoura Lash Studio",
    catalogue: "lashes",
    price: 65000,
    compareAt: 80000,
    rating: 4.9,
    reviews: 420,
    size: "Classic volume, salon set",
    description:
      "Feather-light classic volume lashes applied for soft drama that lasts through weeks of wear.",
    features: [
      "Premium synthetic fibers with a natural curl",
      "Gentle adhesive formula for sensitive eyes",
    ],
    image:
      "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=900&q=80",
      "/methods/soft-volume.png",
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    slug: "hydra-lash-balm",
    name: "Hydra Lash Balm",
    brand: "Amoura Lash Studio",
    catalogue: "lashes",
    price: 48000,
    rating: 4.7,
    reviews: 255,
    size: "Aftercare balm, 30ml",
    description:
      "A hydrating aftercare balm that keeps extensions soft, clean, and camera-ready between appointments.",
    features: [
      "Ultra-fine formula for a weightless feel",
      "Designed for all-day comfort",
    ],
    image: "/products/hydra-balm.png",
    gallery: [
      "/products/hydra-balm.png",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1512207652378-967d4b6dbcea?auto=format&fit=crop&w=600&q=80",
    ],
  },
];

export const catalogueLabels: Record<Catalogue, string> = {
  perfume: "Perfumes",
  magazine: "Custom Magazines",
  lashes: "Lashes",
};

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getByCatalogue(catalogue: Catalogue) {
  return products.filter((p) => p.catalogue === catalogue);
}

export function getRelated(slug: string, limit = 3) {
  const current = getProduct(slug);
  if (!current) return products.slice(0, limit);
  return products.filter((p) => p.slug !== slug).slice(0, limit);
}

export const blogPosts = [
  {
    slug: "scent-layering",
    title: "How to layer scents without overwhelm",
    category: "Perfume tips",
    excerpt:
      "Build a personal fragrance wardrobe that feels intentional — from base notes to finishing mist.",
    readTime: "5 min read",
    author: "Maya Okonkwo",
    role: "Fragrance director",
    image:
      "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=1000&q=80",
  },
  {
    slug: "magazine-keepsakes",
    title: "Turning memories into custom magazines",
    category: "Editorial",
    excerpt:
      "A guide to storytelling spreads, cover concepts, and paper stocks that feel collectible.",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "lash-aftercare",
    title: "Lash aftercare that actually lasts",
    category: "Beauty",
    excerpt:
      "Simple habits that keep extensions soft, clean, and camera-ready between appointments.",
    readTime: "6 min read",
    image: "/methods/soft-volume.png",
  },
  {
    slug: "atelier-rituals",
    title: "Atelier rituals for slower beauty",
    category: "Lifestyle",
    excerpt:
      "How scent, print, and lashes come together in a daily ritual of quiet confidence.",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
  },
];

export const faqs = [
  {
    q: "What does Amoura offer?",
    a: "We curate three catalogues: signature perfumes, fully customized magazines, and professional lash sets — goods and services designed to feel personal.",
  },
  {
    q: "Do you ship internationally?",
    a: "Perfumes and magazines ship worldwide. Lash appointments are booked in-studio; travel kits ship to most regions.",
  },
  {
    q: "What is your return policy?",
    a: "Unopened perfume and unused magazine prints may be returned within 30 days. Custom magazines and completed lash services are final sale.",
  },
  {
    q: "Can I customize a magazine?",
    a: "Yes. Choose a theme, upload photos and copy, and our editors design a print-ready keepsake with your approval before print.",
  },
  {
    q: "How do I book a lash appointment?",
    a: "Select a lash set from the store, choose Available Here, and you’ll be guided to pick a studio time that fits your schedule.",
  },
];
