export const SITE_NAME = "Organic Jaipur";

export const SITE_URL = "https://organicjaipur.store";

export const BUSINESS = {
  name: "Organic Jaipur",
  address: "GOVINDM RESIDENCY, P.NO 109, Mahapura Rd, Jaipur, Rajasthan 302026",
  phone: "8955286866",
  phoneDisplay: "+91 89552 86866",
  whatsappNumber: "918955286866",
  mapEmbedSrc:
    "https://www.google.com/maps?q=GOVINDM+RESIDENCY,+P.NO+109,+Mahapura+Rd,+Jaipur,+Rajasthan+302026&output=embed",
  mapLink:
    "https://www.google.com/maps/search/?api=1&query=GOVINDM+RESIDENCY,+P.NO+109,+Mahapura+Rd,+Jaipur,+Rajasthan+302026",
} as const;

// TODO: replace "#" with the real profile URLs once available.
export const SOCIAL_LINKS = [
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "Facebook", href: "#", icon: "facebook" },
  { label: "YouTube", href: "#", icon: "youtube" },
] as const;

export const CATEGORIES = [
  { value: "GHEE", label: "Ghee" },
  { value: "MUSTARD_OIL", label: "Cold-Pressed Oils" },
  { value: "HONEY", label: "Honey" },
  { value: "PICKLES", label: "Pickles & Chutneys" },
] as const;

export type CategoryValue = (typeof CATEGORIES)[number]["value"];
export const STOREFRONT_CATEGORY_VALUES: CategoryValue[] = CATEGORIES.map((category) => category.value);

export function categoryLabel(value: string): string {
  return CATEGORIES.find((c) => c.value === value)?.label ?? value;
}

export const CATEGORY_IMAGES: Record<CategoryValue, string> = {
  GHEE: "/images/products/ghee.jpg",
  MUSTARD_OIL: "/images/products/mustard-oil.jpg",
  HONEY: "/images/products/honey.jpg",
  PICKLES: "/product/ChatGPT Image Aug 7, 2026, 11_27_20 AM (9).png",
};

export const STATS = [
  { value: "500+", label: "Happy Families" },
  { value: "Own", label: "Farm & Cows" },
  { value: "100%", label: "Chemical-Free" },
  { value: "24 Hr", label: "Fresh Delivery" },
] as const;

export const FAQS_PRICE = [
  {
    question: "Why does your price look higher than ghee or oil sold in the local market?",
    answer:
      "Loose or mass-market ghee and oil sold in Jaipur's local market is often blended, adulterated, or made from milk and seeds of unknown origin to keep costs low. Every product we sell is 100% organic and pure, grown and made on our own farm in Jaipur, Rajasthan — no blending, no adulteration, no shortcuts. That traceability and purity is what you're paying for.",
  },
] as const;

export const FAQS_HOME = [
  {
    question: "Do the main ingredients come from your own farm?",
    answer:
      "Yes. Our Gir cows, mustard crop and managed beehives are on our own farm in Jaipur, Rajasthan. Mango, lemon, chilli and other seasonal produce used in our pickles are also grown there — every product is 100% organic and pure.",
  },
  {
    question: "Is your mustard oil really cold-pressed?",
    answer:
      "Yes. Our mustard oil is extracted using the traditional kachi ghani method on wooden presses, without heat or chemical solvents, which preserves its natural pungency and nutrients.",
  },
  {
    question: "How is your A2 ghee made?",
    answer:
      "Our A2 ghee is hand-churned from the milk of grass-fed cows using the traditional bilona method — curd is churned to butter, then slow-cooked to ghee. No shortcuts, no additives.",
  },
  {
    question: "Do you deliver across Jaipur and Rajasthan?",
    answer:
      "Yes, we deliver to homes across Jaipur, and can ship across Rajasthan. Message us on WhatsApp with your location and order, and we'll confirm delivery timing the same day.",
  },
  {
    question: "How do I place an order?",
    answer:
      "Browse our Products page, then tap \"Order on WhatsApp\" on any product — it opens WhatsApp with a pre-filled message so you can confirm quantity and delivery details directly with us.",
  },
  {
    question: "Are your products lab tested?",
    answer:
      "Every batch is quality-checked for purity and safety before it reaches your doorstep, so you can trust what's on your table.",
  },
  ...FAQS_PRICE,
] as const;

export const FAQS_GHEE = [
  {
    question: "What makes your A2 ghee different from regular ghee?",
    answer:
      "Our A2 ghee is made from the A2 milk of Gir cows raised on our own farm in Jaipur, using the slow, traditional bilona method — curd is hand-churned to butter, then slow-cooked into ghee. Regular market ghee is often made faster, from mixed-breed milk, with less care for aroma and purity.",
  },
  {
    question: "Is bilona ghee worth the extra time and price?",
    answer:
      "Bilona ghee takes far longer to make than commercial ghee, but the slow churning and cooking preserves its natural aroma, grain, and nutrition. It's a traditional Rajasthani method we've kept exactly as it's always been done, on our own farm.",
  },
  ...FAQS_PRICE,
] as const;

export const FAQS_OILS = [
  {
    question: "What is kachi ghani cold-pressed mustard oil?",
    answer:
      "Kachi ghani is a traditional wooden cold-press method that extracts oil from mustard seeds without heat or chemical solvents, keeping its natural pungency and nutrients intact. Our mustard and other oilseeds are grown on our own farm in Jaipur, Rajasthan.",
  },
  {
    question: "Is cold-pressed oil better than refined oil?",
    answer:
      "Cold-pressed oil is extracted at low temperature with no chemical processing, so it retains more of its natural flavour and nutrients compared to refined oils, which are typically processed with heat and solvents.",
  },
  ...FAQS_PRICE,
] as const;

export const FAQS_HONEY = [
  {
    question: "Is your honey raw and unprocessed?",
    answer:
      "Yes. Our honey is collected from beehives managed on our own farm in Jaipur and only lightly filtered to remove physical impurities — no heating, no added sugar, no artificial processing.",
  },
  {
    question: "How can I tell raw honey from adulterated honey?",
    answer:
      "Raw honey from a known source, like our own managed farm in Rajasthan, is the most reliable way to avoid the sugar-syrup adulteration common in mass-market honey brands.",
  },
  ...FAQS_PRICE,
] as const;

export const FAQS_PICKLES = [
  {
    question: "Are your pickles made the traditional Rajasthani way?",
    answer:
      "Yes. Our pickles and chutneys use farm-grown mango, lemon and chilli, mixed with traditional spices and oil, then matured naturally in small batches — the same way they've always been made in Rajasthani households.",
  },
  {
    question: "Do your pickles contain preservatives?",
    answer:
      "No artificial preservatives are added. Traditional oil-and-spice based curing, done patiently in small batches, is what keeps our pickles shelf-stable.",
  },
  ...FAQS_PRICE,
] as const;

export const FAQS = FAQS_HOME;

export const FAQS_BY_CATEGORY: Record<string, readonly { question: string; answer: string }[]> = {
  GHEE: FAQS_GHEE,
  MUSTARD_OIL: FAQS_OILS,
  HONEY: FAQS_HONEY,
  PICKLES: FAQS_PICKLES,
};

export const FAQS_PRODUCTS_ALL = [
  FAQS_GHEE[0],
  FAQS_OILS[0],
  FAQS_HONEY[0],
  FAQS_PICKLES[0],
  ...FAQS_PRICE,
] as const;

export function faqsForRajasthanCity(cityName: string) {
  return [
    {
      question: `Do you ship A2 ghee, oil, honey and pickles to ${cityName}?`,
      answer: `Yes, we ship our A2 Bilona ghee, cold-pressed mustard oil, raw honey and Rajasthani pickles to ${cityName} via courier. Message us on WhatsApp with your address and order, and we'll confirm delivery timing and any shipping charges the same day.`,
    },
    FAQS_GHEE[0],
    FAQS_OILS[0],
    FAQS_HONEY[0],
    FAQS_PICKLES[0],
    ...FAQS_PRICE,
  ] as const;
}

export const FAQS_SHIPPING = [
  {
    question: "Which areas do you deliver to?",
    answer: "We offer free doorstep delivery within Jaipur, Rajasthan, and also ship our A2 ghee, cold-pressed oil, honey and pickles across Rajasthan — to Jodhpur, Udaipur, Kota, Ajmer, Bikaner and other cities — via courier. Message us on WhatsApp with your address and we'll confirm delivery timing and any shipping charges.",
  },
  {
    question: "Is delivery free?",
    answer: "Yes, delivery is free on all orders within our Jaipur service area. For orders shipped to other cities in Rajasthan via courier, any shipping charge will be shown clearly before you confirm your order.",
  },
  {
    question: "How long does delivery take?",
    answer: "Ghee, cold-pressed oil, honey and pickles are shelf-stable and are typically dispatched within a day or two of order confirmation. Orders within Jaipur usually arrive the same or next day; orders shipped elsewhere in Rajasthan via courier typically take a few extra days depending on the city. We'll confirm the exact delivery window with you on WhatsApp or by phone.",
  },
] as const;

export const FAQS_RETURNS = [
  {
    question: "Can I return a product after I've opened it?",
    answer: "We don't accept returns of opened products for reasons of personal taste, since these are consumable food items. If a product is unopened, or arrives defective, contaminated, leaking, or not as described, you can request a return or replacement within 1 day of delivery.",
  },
  {
    question: "How do refunds work since you're Cash on Delivery only?",
    answer: "Since we accept Cash on Delivery (COD) only, a valid claim is resolved as a free replacement on your next delivery, store credit, or a refund via bank transfer/UPI, as agreed with you.",
  },
  {
    question: "Can I cancel my order?",
    answer: "Yes, you can cancel an order before it has been packed or dispatched by contacting us on WhatsApp or phone with your order number.",
  },
] as const;

export const FAQS_PRIVACY = [
  {
    question: "Do you sell my personal information?",
    answer: "No. We do not sell your personal information. We only share it where necessary — with our own delivery staff, our website/database hosting providers, or if required by law.",
  },
  {
    question: "Do you store my payment details?",
    answer: "No. We do not knowingly collect sensitive information such as payment card details, since we currently accept Cash on Delivery (COD) only.",
  },
  {
    question: "Can I ask you to delete my account and data?",
    answer: "Yes. You can ask us to delete your account and associated personal information at any time, subject to records we're legally required to retain, such as order records for accounting purposes.",
  },
] as const;

export const FAQS_TERMS = [
  {
    question: "What payment methods do you accept?",
    answer: "Currently, we accept Cash on Delivery (COD) only. Please ensure someone is available at the delivery address to receive and pay for the order.",
  },
  {
    question: "Can prices change after I've viewed a product?",
    answer: "Prices are current at the time of browsing but may change due to seasonal availability or market rates. The price confirmed with you at the time of order confirmation is the one that applies.",
  },
  {
    question: "Which laws govern these Terms?",
    answer: "These Terms are governed by the laws of India, and disputes are subject to the jurisdiction of the courts in Jaipur, Rajasthan.",
  },
] as const;

// Business currently promises free doorstep delivery (see Navbar announcement bar).
// Change this constant if a real delivery fee / free-shipping threshold is introduced.
export const SHIPPING_FEE = 0;
export const FREE_SHIPPING_THRESHOLD = 0;
export const ONLINE_PAYMENT_DISCOUNT_PERCENT = 2;

export const ORDER_STATUSES = [
  "PENDING",
  "CONFIRMED",
  "PACKED",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "CANCELLED",
] as const;

export type OrderStatusValue = (typeof ORDER_STATUSES)[number];

export const ORDER_STATUS_LABELS: Record<OrderStatusValue, string> = {
  PENDING: "Order Placed",
  CONFIRMED: "Confirmed",
  PACKED: "Packed",
  OUT_FOR_DELIVERY: "Out for Delivery",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export const TRUST_BADGES = [
  {
    title: "Chemical-Free",
    description: "Grown and processed without synthetic pesticides or chemicals.",
    icon: "leaf",
  },
  {
    title: "100% Ethically Made",
    description: "Made from ingredients grown and managed on our own farm.",
    icon: "handshake",
  },
  {
    title: "Lab Tested",
    description: "Every batch is quality-checked for purity and safety.",
    icon: "flask",
  },
  {
    title: "Doorstep Delivery",
    description: "Fresh produce delivered straight to your home in Jaipur.",
    icon: "truck",
  },
] as const;
