type ProductSeoProfile = {
  title: string;
  description: string;
  imageAlt: string;
  searchPhrase: string;
  processHref: string;
  faqs: readonly { question: string; answer: string }[];
};

const profiles: Record<string, ProductSeoProfile> = {
  "A2 Gir Cow Ghee": {
    title: "A2 Gir Cow Ghee in Jaipur | Bilona Ghee",
    description: "Buy A2 Gir Cow Ghee made by the curd-churned Bilona method in Jaipur. See the current price, pack size, ingredients and delivery details.",
    imageAlt: "Jar of Organic Jaipur A2 Gir Cow Ghee",
    searchPhrase: "A2 Gir Cow Ghee in Jaipur",
    processHref: "/making-process/bilona-ghee",
    faqs: [
      { question: "How is Organic Jaipur A2 Gir Cow Ghee made?", answer: "Gir cow milk is set into curd, churned to separate butter and then slow-cooked into ghee using the Bilona process described on this page." },
      { question: "Which pack size should I choose?", answer: "Choose the displayed pack for your current requirement. Other available Gir cow ghee pack sizes are linked in the available-sizes section when they are in the catalogue." },
    ],
  },
  "A2 Desi Cow Ghee": {
    title: "A2 Desi Cow Ghee in Jaipur | Bilona Method",
    description: "Order A2 Desi Cow Ghee made with the traditional Bilona process. Check the current Jaipur price, net quantity, ingredients and delivery options.",
    imageAlt: "Jar of Organic Jaipur A2 Desi Cow Ghee",
    searchPhrase: "A2 Desi Cow Ghee in Jaipur",
    processHref: "/making-process/bilona-ghee",
    faqs: [
      { question: "What milk is used for this A2 Desi Cow Ghee?", answer: "This product uses Desi cow milk. Its current ingredient statement, net quantity and storage instructions are shown in the product specifications." },
      { question: "How is Desi cow ghee different from Gir cow ghee?", answer: "The stated milk source differs: this product uses Desi cow milk, while the Gir cow product uses Gir cow milk. Compare each product page for its current pack size and price." },
    ],
  },
  "Buffalo Bilona Ghee": {
    title: "Buffalo Bilona Ghee in Jaipur | Buy Online",
    description: "Buy Buffalo Bilona Ghee in Jaipur for cooking and sweets. Compare the current price, net quantity, ingredients, Bilona process and delivery details.",
    imageAlt: "Jar of Organic Jaipur Buffalo Bilona Ghee",
    searchPhrase: "Buffalo Bilona Ghee in Jaipur",
    processHref: "/making-process/bilona-ghee",
    faqs: [
      { question: "What is Buffalo Bilona Ghee made from?", answer: "It is made from buffalo milk using the curd-to-butter Bilona method. Refer to the ingredient statement on this page for the selected pack." },
      { question: "What cooking is Buffalo Bilona Ghee suited to?", answer: "Its richer character suits frying and traditional sweets as well as everyday cooking. Choose according to your taste and recipe." },
    ],
  },
  "Bilona Ghee": {
    title: "Traditional Bilona Ghee in Jaipur | Buy Online",
    description: "Shop traditional Bilona Ghee in Jaipur. View the current price, pack size, ingredient statement, curd-churned process and Rajasthan shipping details.",
    imageAlt: "Jar of traditional Bilona Ghee from Organic Jaipur",
    searchPhrase: "Traditional Bilona Ghee in Jaipur",
    processHref: "/making-process/bilona-ghee",
    faqs: [
      { question: "What does Bilona mean on this ghee?", answer: "Bilona describes the process in which curd is churned to separate butter before the butter is slowly cooked into ghee." },
      { question: "Can I use this Bilona Ghee for everyday cooking?", answer: "Yes. It can be used for rotis, dal, tadka and other cooking according to your preference." },
    ],
  },
  "Kachi Ghani Black Mustard Oil": {
    title: "Cold-Pressed Mustard Oil in Jaipur | 1 L",
    description: "Buy Kachi Ghani black mustard oil in Jaipur. Check the current 1 L price, ingredient, wooden-press process and delivery across Rajasthan.",
    imageAlt: "Bottle of Organic Jaipur Kachi Ghani black mustard oil",
    searchPhrase: "Cold-Pressed Mustard Oil in Jaipur",
    processHref: "/making-process/cold-pressed-oil",
    faqs: [
      { question: "Is this mustard oil cold-pressed?", answer: "Yes. The product is pressed from black mustard seed using the Kachi Ghani method without chemical solvents." },
      { question: "How does black mustard oil taste?", answer: "Black mustard oil has a stronger, sharper mustard character than the milder yellow mustard oil listed in the shop." },
    ],
  },
  "Raw Wild Forest Honey": {
    title: "Raw Honey in Jaipur | Wild Forest Honey 500 g",
    description: "Buy Raw Wild Forest Honey in Jaipur. See the current 500 g price, ingredient, storage guidance and Rajasthan delivery information.",
    imageAlt: "Jar of Organic Jaipur Raw Wild Forest Honey",
    searchPhrase: "Raw Honey in Jaipur",
    processHref: "/making-process/raw-honey",
    faqs: [
      { question: "Why can raw honey crystallise?", answer: "Honey can naturally crystallise during storage. Crystallisation alone does not prove purity or indicate spoilage; follow the storage guidance shown on this page." },
      { question: "Is sugar or syrup listed as an ingredient?", answer: "No. The current ingredient statement lists raw honey and no added sugar or syrup. Ask the team about documentation for the specific batch if needed." },
    ],
  },
  "Wood-Pressed Groundnut Oil": {
    title: "Wood-Pressed Groundnut Oil in Jaipur | 1 L",
    description: "Order wood-pressed Groundnut Oil in Jaipur. Check the current 1 L price, ingredient, storage information and doorstep delivery options.",
    imageAlt: "Bottle of Organic Jaipur wood-pressed groundnut oil",
    searchPhrase: "Wood-Pressed Groundnut Oil in Jaipur",
    processHref: "/making-process/cold-pressed-oil",
    faqs: [
      { question: "What is this Groundnut Oil made from?", answer: "The ingredient statement lists groundnut oil. It is wood-pressed and unrefined." },
      { question: "Where can I see the current pack and price?", answer: "The selected net quantity and live price appear beside the product image and in the product offer data on this page." },
    ],
  },
  "Cold-Pressed Coconut Oil": {
    title: "Cold-Pressed Coconut Oil in Jaipur | 1 L",
    description: "Buy Cold-Pressed Coconut Oil in Jaipur. View the current 1 L price, ingredient, storage guidance and local delivery information.",
    imageAlt: "Bottle of Organic Jaipur cold-pressed coconut oil",
    searchPhrase: "Cold-Pressed Coconut Oil in Jaipur",
    processHref: "/making-process/cold-pressed-oil",
    faqs: [
      { question: "Is it normal for coconut oil to solidify?", answer: "Yes. Coconut oil may solidify in cooler weather. The product storage guidance explains that this natural change does not affect quality." },
      { question: "Is this coconut oil refined?", answer: "The current product specification describes it as cold-pressed and unrefined. Review the pack label before use." },
    ],
  },
  "Green Chilli Pickle": {
    title: "Green Chilli Pickle in Jaipur | 500 g",
    description: "Order Green Chilli Pickle in Jaipur. See the current 500 g price, complete ingredient statement, storage guidance and delivery details.",
    imageAlt: "Jar of Organic Jaipur Green Chilli Pickle",
    searchPhrase: "Green Chilli Pickle in Jaipur",
    processHref: "/making-process/traditional-pickles",
    faqs: [
      { question: "What ingredients are in the Green Chilli Pickle?", answer: "The current recipe lists green chilli, mustard oil, traditional spices and salt. Check the product specification and pack label before ordering." },
      { question: "How should I store the pickle after opening?", answer: "Follow the storage instructions shown on this page, refrigerate after opening and use a clean, dry spoon." },
    ],
  },
  "Rajasthani Laal Mirch Chutney": {
    title: "Rajasthani Laal Mirch Chutney in Jaipur",
    description: "Order Rajasthani Laal Mirch Chutney in Jaipur. Check the current price, ingredients including milk allergens, pack size and delivery details.",
    imageAlt: "Jar of Organic Jaipur Rajasthani Laal Mirch Chutney",
    searchPhrase: "Rajasthani Laal Mirch Chutney in Jaipur",
    processHref: "/making-process/laal-mirch-chutney",
    faqs: [
      { question: "Does the Laal Mirch Chutney contain milk?", answer: "Yes. The recipe includes curd and a little ghee, so it contains milk. Review the complete ingredient statement before ordering." },
      { question: "How is the chutney prepared?", answer: "The current product process describes sun-dried red chillies ground on a silbatta with the listed recipe ingredients after an order is placed." },
    ],
  },
};

export function productSeo(name: string, unit: string): ProductSeoProfile {
  return profiles[name] ?? {
    title: `Buy ${name} Online in Jaipur`,
    description: `Buy ${name} (${unit}) from Organic Jaipur. See the current price, ingredients, storage information and delivery details.`,
    imageAlt: `${name} ${unit} pack from Organic Jaipur`,
    searchPhrase: `${name} in Jaipur`,
    processHref: "/farm-to-home",
    faqs: [
      { question: `What should I check before ordering ${name}?`, answer: "Review the ingredient statement, net quantity, current price, stock status and storage information displayed on this page." },
      { question: "Can I ask about the current batch before ordering?", answer: "Yes. Send the product name and pack size to the Organic Jaipur team on WhatsApp and ask what batch information is currently available." },
    ],
  };
}
