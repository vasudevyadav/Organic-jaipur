type Faq = { question: string; answer: string };

export default function FaqJsonLd({ items }: { items: readonly Faq[] }) {
  // Google limits FAQ rich results to authoritative government and health sites.
  // Keep the useful, visible accordion content without ineligible FAQPage markup.
  void items;
  return null;
}
