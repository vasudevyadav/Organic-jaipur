import { PrismaClient, Category } from "@prisma/client";

const prisma = new PrismaClient();

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const productImage = (file: string) => `/product/${file}`;

type SeedProduct = {
  name: string;
  category: Category;
  price: number;
  originalPrice?: number;
  unit: string;
  description: string;
  ingredients?: string;
  benefits?: string;
  imageUrl: string;
  featured?: boolean;
};

const products: SeedProduct[] = [
  // Ghee
  {
    name: "A2 Gir Cow Ghee",
    category: Category.GHEE,
    price: 1899,
    originalPrice: 2399,
    unit: "1 kg",
    description:
      "Hand-churned using the traditional bilona method from the milk of indigenous Gir cows. Rich, aromatic, and made in small batches with no shortcuts.",
    benefits: "Supports digestion, rich in A2 protein, naturally lactose-tolerant for most people.",
    imageUrl: productImage("ChatGPT Image Aug 7, 2026, 11_27_14 AM (1).png"),
    featured: true,
  },
  {
    name: "A2 Gir Cow Ghee, 500 g",
    category: Category.GHEE,
    price: 999,
    originalPrice: 1299,
    unit: "500 g",
    description: "Our signature bilona-churned A2 Gir Cow Ghee in a convenient 500 g jar — perfect to start with.",
    imageUrl: productImage("ChatGPT Image Aug 7, 2026, 11_27_15 AM (2).png"),
    featured: true,
  },
  {
    name: "A2 Gir Cow Ghee, Family Pack",
    category: Category.GHEE,
    price: 3599,
    originalPrice: 4599,
    unit: "2 kg",
    description: "The same bilona-churned A2 Gir Cow Ghee in a larger family-size jar for everyday cooking.",
    imageUrl: productImage("ChatGPT Image Aug 7, 2026, 11_27_15 AM (3).png"),
  },
  {
    name: "A2 Desi Cow Ghee",
    category: Category.GHEE,
    price: 1699,
    originalPrice: 2099,
    unit: "1 kg",
    description: "Slow-cooked A2 desi cow ghee, churned the bilona way for a deep aroma and grainy texture.",
    imageUrl: productImage("ChatGPT Image Aug 7, 2026, 12_11_19 PM (2).png"),
  },
  {
    name: "Buffalo Bilona Ghee",
    category: Category.GHEE,
    price: 1499,
    originalPrice: 1899,
    unit: "1 kg",
    description: "Rich, creamy ghee made from pure buffalo milk using the traditional bilona churning process.",
    imageUrl: productImage("ChatGPT Image Aug 7, 2026, 12_11_20 PM (3).png"),
  },
  {
    name: "Bilona Ghee",
    category: Category.GHEE,
    price: 1799,
    originalPrice: 2199,
    unit: "1 kg",
    description: "Our classic hand-churned bilona ghee — curd to butter to gold, exactly as it's made at home.",
    imageUrl: productImage("ChatGPT Image Aug 7, 2026, 12_11_20 PM (4).png"),
    featured: true,
  },

  // Cold-pressed oils
  {
    name: "Kachi Ghani Black Mustard Oil",
    category: Category.MUSTARD_OIL,
    price: 399,
    originalPrice: 499,
    unit: "1 L",
    description: "Cold-pressed on a traditional wooden ghani to retain natural pungency and nutrients — no heat, no chemical solvents.",
    imageUrl: productImage("ChatGPT Image Aug 7, 2026, 11_27_16 AM (6).png"),
    featured: true,
  },
  {
    name: "Wood-Pressed Groundnut Oil",
    category: Category.MUSTARD_OIL,
    price: 449,
    originalPrice: 549,
    unit: "1 L",
    description: "Cold-pressed groundnut oil, rich in Vitamin E, with a light nutty aroma perfect for everyday cooking.",
    imageUrl: productImage("ChatGPT Image Aug 7, 2026, 11_27_16 AM (5).png"),
  },
  {
    name: "Cold-Pressed Coconut Oil",
    category: Category.MUSTARD_OIL,
    price: 429,
    originalPrice: 529,
    unit: "1 L",
    description: "Traditional stone-pressed coconut oil, unrefined and naturally aromatic.",
    imageUrl: productImage("ChatGPT Image Aug 7, 2026, 11_27_15 AM (4).png"),
  },
  {
    name: "Stone-Pressed Sunflower Oil",
    category: Category.MUSTARD_OIL,
    price: 1699,
    originalPrice: 1999,
    unit: "5 L",
    description: "Bulk pack of traditionally stone-pressed sunflower oil, rich in Vitamin E — ideal for families who cook daily.",
    imageUrl: productImage("ChatGPT Image Aug 7, 2026, 12_11_21 PM (8).png"),
  },
  {
    name: "Stone-Pressed Groundnut Oil, 5 L",
    category: Category.MUSTARD_OIL,
    price: 1799,
    originalPrice: 2099,
    unit: "5 L",
    description: "Bulk pack of traditionally stone-pressed groundnut oil for everyday family cooking.",
    imageUrl: productImage("ChatGPT Image Aug 7, 2026, 12_11_21 PM (7).png"),
  },
  {
    name: "Pressed Yellow Mustard Oil, 5 L",
    category: Category.MUSTARD_OIL,
    price: 1649,
    originalPrice: 1949,
    unit: "5 L",
    description: "Traditional stone-pressed yellow mustard oil in a bulk 5 litre tin.",
    imageUrl: productImage("ChatGPT Image Aug 7, 2026, 12_11_20 PM (5).png"),
  },

  // Honey
  {
    name: "Raw Wild Forest Honey",
    category: Category.HONEY,
    price: 549,
    originalPrice: 649,
    unit: "500 g",
    description: "Unprocessed, raw honey harvested from wildflower forests. No heating, no additives — just pure honey.",
    imageUrl: productImage("ChatGPT Image Aug 7, 2026, 11_27_20 AM (8).png"),
    featured: true,
  },

  // Pickles & chutneys
  {
    name: "Green Chilli Pickle",
    category: Category.PICKLES,
    price: 249,
    originalPrice: 299,
    unit: "500 g",
    description: "A traditional Rajasthani green chilli pickle, made in small batches with no preservatives.",
    imageUrl: productImage("ChatGPT Image Aug 7, 2026, 11_27_20 AM (9).png"),
  },
  {
    name: "Rajasthani Laal Mirch Chutney",
    category: Category.PICKLES,
    price: 269,
    originalPrice: 329,
    unit: "500 g",
    description: "Stone-ground red chilli chutney with garlic, made the traditional village way — hot, bold, and rich in flavour.",
    imageUrl: productImage("ChatGPT Image Aug 7, 2026, 11_27_20 AM (10).png"),
  },
];

async function main() {
  console.log("Seeding database...");

  for (const p of products) {
    const slug = slugify(p.name);
    await prisma.product.upsert({
      where: { slug },
      update: {
        name: p.name,
        category: p.category,
        price: p.price,
        originalPrice: p.originalPrice ?? null,
        unit: p.unit,
        description: p.description,
        benefits: p.benefits ?? null,
        imageUrl: p.imageUrl,
        featured: p.featured ?? false,
      },
      create: {
        name: p.name,
        slug,
        category: p.category,
        price: p.price,
        originalPrice: p.originalPrice ?? null,
        unit: p.unit,
        description: p.description,
        benefits: p.benefits ?? null,
        imageUrl: p.imageUrl,
        featured: p.featured ?? false,
      },
    });
  }

  console.log(`Seeded ${products.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
