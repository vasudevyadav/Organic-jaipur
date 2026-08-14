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
  { value: "Jaipur", label: "Local Delivery" },
  { value: "Own", label: "Farm & Cows" },
  { value: "COD", label: "Pay on Delivery" },
  { value: "4", label: "Pantry Categories" },
] as const;

export const FAQS_PRICE = [
  {
    question: "What Am I Paying for Compared With a Regular Market Product?",
    answer:
      "The price reflects the ingredient, small-batch method, pack size and direct handling by our Jaipur team. Compare the ingredients, net quantity and process shown on each product page before choosing.",
  },
] as const;

export const FAQS_HOME = [
  {
    question: "Do your ingredients come from your own farm?",
    answer:
      "Yes. Our Gir cows, mustard crop and managed beehives are all on our own farm in Jaipur, Rajasthan. Seasonal produce for our pickles, mango, lemon and chilli, is grown there too, so every product is 100% traceable.",
  },
  {
    question: "Is your mustard oil really cold-pressed?",
    answer:
      "Yes. It's extracted using the traditional kachi ghani method on wooden presses, with no heat or chemical solvents, which keeps its natural pungency and nutrients intact.",
  },
  {
    question: "How is your A2 ghee made?",
    answer:
      "Our A2 ghee is hand-churned using the traditional bilona method: curd is churned to butter by hand, then slow-cooked into ghee. No cream-separator shortcuts, no additives.",
  },
  {
    question: "Do you deliver across Jaipur and Rajasthan?",
    answer:
      "Yes. Free doorstep delivery in Jaipur, and courier shipping across Rajasthan. Message us on WhatsApp with your location and we confirm delivery timing the same day.",
  },
  {
    question: "How do I place an order?",
    answer:
      "Add products to your cart and check out on the website, or tap \"Order on WhatsApp\" on any product for a pre-filled message to confirm quantity and delivery directly with us.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "Cash on Delivery (COD) only. You pay when your order arrives at your door.",
  },
  {
    question: "Can I Ask for a Batch Test Report?",
    answer:
      "Yes. Message us on WhatsApp with the product name and we will share the latest available report or batch information.",
  },
  ...FAQS_PRICE,
] as const;

export const FAQS_GHEE = [
  {
    question: "What makes your A2 ghee different from regular ghee?",
    answer:
      "Our A2 ghee starts with milk from Gir cows on our farm. We set the milk into curd, churn it to butter and slow-cook it into ghee. This process creates its grainy texture and deep aroma.",
  },
  {
    question: "What's the difference between A2 Gir Cow Ghee, A2 Desi Cow Ghee and Buffalo Ghee?",
    answer:
      "A2 Gir Cow Ghee comes from Gir cow milk and has the most refined aroma. A2 Desi Cow Ghee is a more accessible everyday option. Buffalo Bilona Ghee is richer and creamier, suited to halwai-style cooking.",
  },
  {
    question: "Is bilona ghee worth the extra time and price?",
    answer:
      "Choose bilona ghee if you value a curd-churned process, grainy texture and deep aroma. For a lower upfront cost, start with the 500 g jar.",
  },
  ...FAQS_PRICE,
] as const;

export const FAQS_OILS = [
  {
    question: "What is kachi ghani cold-pressed mustard oil?",
    answer:
      "It's mustard oil extracted on a traditional wooden press without heat or chemical solvents, keeping its natural pungency and nutrients intact. Our mustard and other oilseeds are grown on our own farm in Jaipur, Rajasthan.",
  },
  {
    question: "Is cold-pressed oil better than refined oil?",
    answer:
      "Cold-pressed oil retains more natural flavour and nutrients because it's extracted at low temperature with no chemical processing, unlike refined oils, which are typically processed with heat and solvents.",
  },
  {
    question: "Which mustard oil should I choose, black or yellow?",
    answer:
      "Kachi Ghani Black Mustard Oil has a stronger, sharper pungency, traditional for Rajasthani cooking. Pressed Yellow Mustard Oil is milder, suited to those who find black mustard oil too strong.",
  },
  ...FAQS_PRICE,
] as const;

export const FAQS_HONEY = [
  {
    question: "Is your honey raw and unprocessed?",
    answer:
      "Yes. Collected from beehives managed on our own farm in Jaipur and only lightly filtered to remove physical impurities. No heating, no added sugar, no artificial processing.",
  },
  {
    question: "How can I tell raw honey from adulterated honey?",
    answer:
      "Raw honey from a known, traceable source, like our own managed farm in Rajasthan, is the most reliable way to avoid the sugar-syrup adulteration common in mass-market honey brands.",
  },
  {
    question: "Why has my honey turned solid or grainy?",
    answer:
      "Crystallisation is a natural sign of raw, unheated honey, not spoilage. Place the jar in warm water to loosen it if you prefer it liquid.",
  },
  ...FAQS_PRICE,
] as const;

export const FAQS_PICKLES = [
  {
    question: "Are your pickles made the traditional Rajasthani way?",
    answer:
      "Yes. Farm-grown mango, lemon and chilli, mixed with traditional spices and oil, then matured naturally in small batches, the same way they've always been made in Rajasthani households.",
  },
  {
    question: "Do your pickles contain preservatives?",
    answer:
      "No artificial preservatives are added. Traditional oil-and-spice curing, done patiently in small batches, is what keeps our pickles shelf-stable.",
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

export function faqsForJaipurLocality(localityName: string) {
  return [
    {
      question: `Do you deliver organic products to ${localityName}?`,
      answer: `Yes. We deliver A2 Bilona ghee, cold-pressed mustard oil, raw honey and traditional Rajasthani pickles to homes in ${localityName}. Share your complete address on WhatsApp and our Jaipur team will confirm the available delivery slot.`,
    },
    {
      question: `Is delivery free in ${localityName}?`,
      answer: `Yes, doorstep delivery is free within our Jaipur service area, including ${localityName}. The order total shown at checkout is the amount you pay on delivery.`,
    },
    {
      question: `How soon can an order reach ${localityName}?`,
      answer: `Orders within Jaipur usually arrive the same day or the next day, depending on the time of order and the delivery route. We confirm the exact slot with you before dispatch.`,
    },
    FAQS_GHEE[0],
    FAQS_OILS[0],
    FAQS_HONEY[0],
    FAQS_PICKLES[0],
  ] as const;
}

export const FAQS_ABOUT = [
  {
    question: "Where is the Organic Jaipur farm?",
    answer: "Our farm and team are based in Jaipur, Rajasthan. You can find our address, map and direct phone and WhatsApp details on the Contact page.",
  },
  {
    question: "Do you make the products yourselves?",
    answer: "We directly handle the source and traditional process behind our core range: Gir cow milk for Bilona ghee, farm-grown mustard for wooden-ghani oil, managed beehives for raw honey and small-batch preparation for pickles.",
  },
  {
    question: "Can I ask about the source of a specific batch?",
    answer: "Yes. Send the product name and pack size to our Jaipur team on WhatsApp and ask for the latest available batch or source information before ordering.",
  },
] as const;

export const FAQS_FARM_TO_HOME = [
  {
    question: "What does farm-to-home mean at Organic Jaipur?",
    answer: "It means we stay responsible from the ingredient source and traditional preparation through packing and doorstep delivery, instead of buying anonymous finished goods from a market trader.",
  },
  {
    question: "How are products packed before delivery?",
    answer: "Each finished batch is cooled or settled as required, filled into clean food-grade packs, sealed, labelled and checked before it leaves our Jaipur facility.",
  },
  {
    question: "How fresh will my order be?",
    answer: "We prepare in controlled batches and dispatch available stock promptly. The product page shows the pack size, and the label on the delivered pack carries the applicable batch and date details.",
  },
] as const;

export const FAQS_QUALITY = [
  {
    question: "What do you check before a batch is sold?",
    answer: "We check the incoming ingredient, the method used during preparation, the finished product and the pack before dispatch. You can also ask our team for the latest available batch information.",
  },
  {
    question: "Do you add artificial colours or flavours?",
    answer: "Our products are built around the natural ingredient and its traditional process. Check the ingredient list on the individual product page and delivered label for the exact product you choose.",
  },
  {
    question: "What should I do if a seal is damaged?",
    answer: "Do not consume a leaking or unsealed product. Photograph the parcel and contact us within one day of delivery so our team can review it under the return and replacement policy.",
  },
] as const;

export const FAQS_CONTACT = [
  {
    question: "What is the fastest way to contact Organic Jaipur?",
    answer: "WhatsApp is the quickest option for product, delivery and order questions. You can also call us during business hours or send the form on the Contact page.",
  },
  {
    question: "What details should I send for a delivery enquiry?",
    answer: "Send your name, locality or city, PIN code and the products and pack sizes you need. We will confirm availability and the expected delivery window.",
  },
  {
    question: "Can I place my order directly on WhatsApp?",
    answer: "Yes. Tell us the product, pack size, quantity and complete delivery address. Our team will confirm the order before dispatch.",
  },
] as const;

export const FAQS_TRACK_ORDER = [
  {
    question: "Where can I find my order number?",
    answer: "Your order number appears on the order confirmation screen and in the confirmation message sent after checkout.",
  },
  {
    question: "Why is my order status not changing?",
    answer: "A newly placed order may remain pending until our team confirms stock and the delivery route. If it has not updated as expected, share the order number with us on WhatsApp.",
  },
  {
    question: "Can I change the delivery address after ordering?",
    answer: "Contact us immediately with your order number. We can update the address only before the parcel is packed or dispatched.",
  },
] as const;

export const FAQS_SHIPPING = [
  {
    question: "Which areas do you deliver to?",
    answer: "Free doorstep delivery within Jaipur, Rajasthan, and courier shipping across Rajasthan, including Jodhpur, Udaipur, Kota, Ajmer and Bikaner. Message us on WhatsApp with your address and we'll confirm delivery timing and any shipping charges.",
  },
  {
    question: "Is delivery free?",
    answer: "Yes, delivery is free on all orders within our Jaipur service area. For orders shipped to other cities in Rajasthan via courier, any shipping charge is shown clearly before you confirm your order.",
  },
  {
    question: "How long does delivery take?",
    answer: "Ghee, cold-pressed oil, honey and pickles are shelf-stable and are typically dispatched within a day or two of order confirmation. Orders within Jaipur usually arrive the same or next day. Orders shipped elsewhere in Rajasthan via courier typically take a few extra days depending on the city. We'll confirm the exact delivery window with you on WhatsApp or by phone.",
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
    answer: "No. We do not sell your personal information. We only share it where necessary: with our own delivery staff, our website/database hosting providers, or if required by law.",
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
    title: "Clear Ingredients",
    description: "See the ingredients, pack size and storage guidance before buying.",
    icon: "leaf",
  },
  {
    title: "Farm-Managed Source",
    description: "Key ingredients are grown or managed by our Jaipur farm team.",
    icon: "handshake",
  },
  {
    title: "Batch Information",
    description: "Request the latest available batch details on WhatsApp.",
    icon: "flask",
  },
  {
    title: "Free Jaipur Delivery",
    description: "Cash on Delivery in Jaipur and courier shipping across Rajasthan.",
    icon: "truck",
  },
] as const;
