import { PrismaClient, Category } from "@prisma/client";
import { getDatabaseUrl } from "../src/lib/database-url";

const prisma = new PrismaClient({ datasourceUrl: getDatabaseUrl() });

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
  storageInfo?: string;
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
      "Made the traditional bilona way: curd, hand-churned to butter, then slow-cooked to ghee. From the A2 milk of indigenous Gir cows raised on our own farm in Jaipur. Grainy texture, deep aroma, no shortcuts.",
    ingredients: "100% A2 Gir cow milk. No additives, no preservatives.",
    benefits: "Choose it for its grainy texture, deep aroma and traditional curd-churned process. The 1 kg jar suits regular family use.",
    storageInfo: "Store in a cool, dry place, away from direct sunlight. Shelf life 12 months unopened. No refrigeration needed.",
    imageUrl: productImage("ChatGPT Image Aug 7, 2026, 11_27_14 AM (1).png"),
    featured: true,
  },
  {
    name: "A2 Gir Cow Ghee, 500 g",
    category: Category.GHEE,
    price: 999,
    originalPrice: 1299,
    unit: "500 g",
    description: "The same hand-churned, bilona-made A2 Gir Cow Ghee as our 1 kg jar, sized for a single household or a first order.",
    ingredients: "100% A2 Gir cow milk. No additives, no preservatives.",
    benefits: "A practical first-order size for one or two people. You get the same grainy texture and deep aroma as the larger jars with a lower upfront spend.",
    storageInfo: "Store in a cool, dry place, away from direct sunlight. Shelf life 12 months unopened.",
    imageUrl: productImage("ChatGPT Image Aug 7, 2026, 11_27_15 AM (2).png"),
    featured: true,
  },
  {
    name: "A2 Gir Cow Ghee, Family Pack",
    category: Category.GHEE,
    price: 3599,
    originalPrice: 4599,
    unit: "2 kg",
    description: "Our signature bilona-churned A2 Gir Cow Ghee in a larger jar, built for families who go through ghee daily and want to order less often.",
    ingredients: "100% A2 Gir cow milk. No additives, no preservatives.",
    benefits: "Costs less per kg than the 1 kg jar and reduces repeat ordering. Best for larger households that use ghee every day.",
    storageInfo: "Store in a cool, dry place, away from direct sunlight. Shelf life 12 months unopened.",
    imageUrl: productImage("ChatGPT Image Aug 7, 2026, 11_27_15 AM (3).png"),
  },
  {
    name: "A2 Desi Cow Ghee",
    category: Category.GHEE,
    price: 1699,
    originalPrice: 2099,
    unit: "1 kg",
    description: "Slow-cooked A2 desi cow ghee, churned the bilona way. Grainy texture and a strong, traditional aroma at a more accessible price than our Gir cow ghee.",
    ingredients: "100% A2 desi cow milk. No additives, no preservatives.",
    benefits: "A more affordable cow-ghee option for daily tadka, rotis and cooking, with the aroma and grain of a curd-churned bilona process.",
    storageInfo: "Store in a cool, dry place, away from direct sunlight. Shelf life 12 months unopened.",
    imageUrl: productImage("ChatGPT Image Aug 7, 2026, 12_11_19 PM (2).png"),
  },
  {
    name: "Buffalo Bilona Ghee",
    category: Category.GHEE,
    price: 1499,
    originalPrice: 1899,
    unit: "1 kg",
    description: "Made from pure buffalo milk using the bilona churning process. Richer, creamier and higher-yielding in cooking than cow ghee, the choice halwais and traditional cooks prefer.",
    ingredients: "100% buffalo milk. No additives, no preservatives.",
    benefits: "Choose it for a richer, creamier taste in frying, halwa, laddoos and other sweets. Priced below our Gir cow ghee.",
    storageInfo: "Store in a cool, dry place, away from direct sunlight. Shelf life 12 months unopened.",
    imageUrl: productImage("ChatGPT Image Aug 7, 2026, 12_11_20 PM (3).png"),
  },
  {
    name: "Bilona Ghee",
    category: Category.GHEE,
    price: 1799,
    originalPrice: 2199,
    unit: "1 kg",
    description: "Hand-churned exactly as it's made at home: curd, churned to butter, then slow-cooked to ghee. Our most traditional, no-frills jar.",
    ingredients: "100% desi cow milk. No additives, no preservatives.",
    benefits: "A straightforward everyday ghee for rotis, dal, tadka and cooking, with a familiar home-style taste and aroma.",
    storageInfo: "Store in a cool, dry place, away from direct sunlight. Shelf life 12 months unopened.",
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
    description: "Cold-pressed on a traditional wooden ghani from black mustard seed grown on our farm. Strong and pungent, suited to achar, sabzi and bold Rajasthani cooking.",
    ingredients: "100% black mustard seed oil. Cold-pressed, unrefined.",
    benefits: "Choose it when you want a sharp mustard flavour. The 1 L bottle is easy to try, store and pour for everyday cooking.",
    storageInfo: "Store in a cool, dry place, tightly sealed. Shelf life 12 months unopened.",
    imageUrl: productImage("ChatGPT Image Aug 7, 2026, 11_27_16 AM (6).png"),
    featured: true,
  },
  {
    name: "Wood-Pressed Groundnut Oil",
    category: Category.MUSTARD_OIL,
    price: 449,
    originalPrice: 549,
    unit: "1 L",
    description: "Cold-pressed groundnut oil with a light, nutty aroma. A lighter everyday cooking oil for meals that don't need mustard oil's sharpness.",
    ingredients: "100% groundnut oil. Wood-pressed, unrefined.",
    benefits: "Choose it for a lighter, nutty flavour in sabzi, poha and everyday frying when mustard oil feels too sharp.",
    storageInfo: "Store in a cool, dry place, tightly sealed. Shelf life 12 months unopened.",
    imageUrl: productImage("ChatGPT Image Aug 7, 2026, 11_27_16 AM (5).png"),
  },
  {
    name: "Cold-Pressed Coconut Oil",
    category: Category.MUSTARD_OIL,
    price: 429,
    originalPrice: 529,
    unit: "1 L",
    description: "Traditional stone-pressed coconut oil, unrefined and naturally aromatic, for cooking, hair and skin use.",
    ingredients: "100% coconut oil. Stone-pressed, unrefined.",
    benefits: "Unrefined, retains natural coconut aroma. No bleaching, no deodorising. Multi-use: cooking, hair, skin.",
    storageInfo: "Store in a cool, dry place. May solidify in cold weather; this is natural and does not affect quality.",
    imageUrl: productImage("ChatGPT Image Aug 7, 2026, 11_27_15 AM (4).png"),
  },
  {
    name: "Stone-Pressed Sunflower Oil",
    category: Category.MUSTARD_OIL,
    price: 1699,
    originalPrice: 1999,
    unit: "5 L",
    description: "Bulk pack of traditionally stone-pressed sunflower oil, rich in Vitamin E, built for families who cook daily and want fewer reorders.",
    ingredients: "100% sunflower oil. Stone-pressed, unrefined.",
    benefits: "A neutral-tasting bulk oil for regular family cooking. The 5 L pack lowers the cost per litre and reduces repeat orders.",
    storageInfo: "Store in a cool, dry place, tightly sealed. Shelf life 12 months unopened.",
    imageUrl: productImage("ChatGPT Image Aug 7, 2026, 12_11_21 PM (8).png"),
  },
  {
    name: "Stone-Pressed Groundnut Oil, 5 L",
    category: Category.MUSTARD_OIL,
    price: 1799,
    originalPrice: 2099,
    unit: "5 L",
    description: "Bulk pack of traditionally stone-pressed groundnut oil for everyday family cooking. Light, nutty and unrefined.",
    ingredients: "100% groundnut oil. Stone-pressed, unrefined.",
    benefits: "Bulk size cuts cost per litre. Light, nutty flavour for daily meals. Unrefined, cold-extracted.",
    storageInfo: "Store in a cool, dry place, tightly sealed. Shelf life 12 months unopened.",
    imageUrl: productImage("ChatGPT Image Aug 7, 2026, 12_11_21 PM (7).png"),
  },
  {
    name: "Pressed Yellow Mustard Oil, 5 L",
    category: Category.MUSTARD_OIL,
    price: 1649,
    originalPrice: 1949,
    unit: "5 L",
    description: "Traditional stone-pressed yellow mustard oil in a bulk 5 L tin. A milder mustard oil for families who find black mustard oil too sharp.",
    ingredients: "100% yellow mustard seed oil. Stone-pressed, unrefined.",
    benefits: "Milder than kachi ghani black mustard oil. Bulk 5 L tin, lower cost per litre. No chemical solvents in extraction.",
    storageInfo: "Store in a cool, dry place, tightly sealed. Shelf life 12 months unopened.",
    imageUrl: productImage("ChatGPT Image Aug 7, 2026, 12_11_20 PM (5).png"),
  },

  // Honey
  {
    name: "Raw Wild Forest Honey",
    category: Category.HONEY,
    price: 549,
    originalPrice: 649,
    unit: "500 g",
    description: "Unprocessed honey harvested from wildflower forests via our own managed beehives. Only lightly filtered to remove wax: no heating, no added sugar, no syrup.",
    ingredients: "100% raw honey. No added sugar, no syrup, no preservatives.",
    benefits: "Use it in tea, breakfast, dressings or by the spoon. The 500 g jar is lightly filtered, unheated and contains no added sugar or syrup.",
    storageInfo: "Store at room temperature, away from direct sunlight. May crystallise naturally: this is a sign of purity, not spoilage. Warm the jar in water to loosen if preferred.",
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
    description: "Farm-grown green chillies, pickled in small batches with traditional spice and oil. No artificial preservatives, matured naturally for shelf stability.",
    ingredients: "Green chilli, mustard oil, traditional spices, salt. No artificial preservatives.",
    benefits: "Farm-grown chillies, not market-bought. No artificial preservatives. Small-batch, traditional recipe.",
    storageInfo: "Store in a cool, dry place. Refrigerate after opening and use a dry spoon for best taste.",
    imageUrl: productImage("ChatGPT Image Aug 7, 2026, 11_27_20 AM (9).png"),
  },
  {
    name: "Rajasthani Laal Mirch Chutney",
    category: Category.PICKLES,
    price: 269,
    originalPrice: 329,
    unit: "500 g",
    description: "Stone-ground red chilli chutney with garlic, made the traditional village way. Bold, spicy, rich in flavour.",
    ingredients: "Red chilli, garlic, mustard oil, traditional spices, salt. No artificial preservatives.",
    benefits: "Stone-ground for authentic texture. Bold garlic-chilli flavour, traditional recipe. No preservatives.",
    storageInfo: "Store in a cool, dry place. Refrigerate after opening and use a dry spoon for best taste.",
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
        ingredients: p.ingredients ?? null,
        benefits: p.benefits ?? null,
        storageInfo: p.storageInfo ?? null,
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
        ingredients: p.ingredients ?? null,
        benefits: p.benefits ?? null,
        storageInfo: p.storageInfo ?? null,
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
