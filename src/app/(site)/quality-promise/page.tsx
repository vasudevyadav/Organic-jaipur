import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";

export const metadata = { title: "Quality Promise", description: "Our approach to sourcing, freshness and product quality for the organic A2 ghee, cold-pressed oil, honey and pickles we grow and make on our own farm in Jaipur, Rajasthan." };

const PROMISES = [
  ["Know the source", "We prioritise direct relationships with nearby farms and makers, so the origin of your food is never a mystery."],
  ["Keep it simple", "We favour food made without unnecessary additives, artificial ripening or shortcuts that compromise the final product."],
  ["Check before it leaves", "Every order is reviewed for freshness and condition before it goes out for delivery."],
  ["Be answerable", "If you want to understand an ingredient, a product process or an available quality document, our team is here to help."],
] as const;

export default function QualityPromisePage() {
  return <main className="bg-[#fffdf8]"><section className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:py-28"><AnimatedSection><p className="text-xs font-bold tracking-[.2em] text-terracotta-500 uppercase">Quality, without the noise</p><h1 className="mt-5 font-display text-5xl leading-none text-forest-900 sm:text-6xl">Our promise is simple: food you can feel good about.</h1><p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-foreground/65">Better food begins with better questions. Here is how we hold ourselves accountable at Organic Jaipur — growing and making 100% organic A2 ghee, cold-pressed oil, honey and pickles on our own farm in Jaipur, Rajasthan.</p></AnimatedSection></section><section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6"><div className="grid gap-5 md:grid-cols-2">{PROMISES.map(([title, copy], index) => <AnimatedSection key={title} delay={index * .08}><article className="h-full rounded-[1.6rem] border border-forest-900/10 bg-white p-8"><span className="text-2xl text-honey-500">✦</span><h2 className="mt-8 font-display text-2xl text-forest-900">{title}</h2><p className="mt-3 leading-7 text-foreground/65">{copy}</p></article></AnimatedSection>)}</div><AnimatedSection delay={.2}><div className="mt-10 rounded-[2rem] bg-[#e8f0de] p-8 text-center sm:p-12"><h2 className="font-display text-3xl text-forest-900">Need a detail before you buy?</h2><p className="mx-auto mt-3 max-w-xl text-foreground/65">Talk to us on WhatsApp or contact us directly. We believe an informed customer is the right customer.</p><div className="mt-6 flex flex-wrap items-center justify-center gap-3"><Link href="/contact" className="inline-flex rounded-full bg-forest-900 px-6 py-3 text-sm font-semibold text-cream hover:bg-forest-800">Contact Organic Jaipur →</Link><Link href="/products" className="inline-flex rounded-full border border-forest-900/15 px-6 py-3 text-sm font-semibold text-forest-900 hover:bg-forest-900/5">Shop our organic products →</Link></div></div></AnimatedSection></section></main>;
}
