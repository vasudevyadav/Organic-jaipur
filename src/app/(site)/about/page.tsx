import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import AboutTeamAccordion from "@/components/AboutTeamAccordion";
import { FlaskIcon, HandshakeIcon, LeafIcon, TruckIcon } from "@/components/icons";

export const metadata = { title: "Our Story", description: "Why Organic Jaipur exists and the principles behind our organic A2 ghee, cold-pressed oils, raw honey and pickles, grown and made on our own farm in Jaipur, Rajasthan." };

const principles = [
  { number: "01", title: "Own the source", copy: "Our cows, mustard fields, beehives and seasonal pickle produce are managed on our own farm.", icon: HandshakeIcon },
  { number: "02", title: "Respect the process", copy: "Traditional methods are kept where they protect taste, character and integrity.", icon: LeafIcon },
  { number: "03", title: "Check the batch", copy: "Quality control and batch traceability turn promises into accountable practice.", icon: FlaskIcon },
  { number: "04", title: "Stay reachable", copy: "Real support matters. You can ask questions before and after your order.", icon: TruckIcon },
];

export default function AboutPage() {
  return <main className="overflow-hidden bg-[#fbf8ef]">
    <section className="relative min-h-[610px] bg-forest-900 text-white"><Image src="/images/gir-cow-story-v2.png" alt="Our Gir cows at the Organic Jaipur farm" fill priority sizes="100vw" className="object-cover" /><div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,29,20,.96)_0%,rgba(8,29,20,.76)_46%,rgba(8,29,20,.2)_100%)]" /><div className="relative mx-auto flex min-h-[610px] max-w-7xl items-center px-5 py-20 sm:px-8"><AnimatedSection className="max-w-3xl"><p className="flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[.24em] text-honey-400"><span className="h-px w-10 bg-honey-400" /> Our story</p><h1 className="mt-6 font-display text-5xl leading-[.92] tracking-[-.04em] sm:text-7xl">Raised, grown and made<br /><em className="font-normal text-honey-400">on our own farm.</em></h1><p className="mt-7 max-w-xl text-base leading-7 text-white/68">Our Gir cows, mustard crop, managed beehives and seasonal pickle produce belong to one accountable farm journey we manage ourselves.</p></AnimatedSection></div></section>

    <AboutTeamAccordion />

    <section className="bg-white px-5 py-20 sm:px-8 sm:py-24"><div className="mx-auto max-w-7xl"><AnimatedSection className="grid gap-6 border-b border-forest-900/10 pb-9 lg:grid-cols-2"><div><p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-terracotta-500">How we operate</p><h2 className="mt-3 font-display text-4xl text-forest-900 sm:text-5xl">Four principles we can be held to.</h2></div><p className="max-w-xl self-end text-sm leading-7 text-forest-900/55">Trust is not a decorative badge. These principles shape which products we choose, what we document and how we answer customers.</p></AnimatedSection><div className="mt-10 grid gap-px overflow-hidden rounded-[1.7rem] border border-forest-900/10 bg-forest-900/10 md:grid-cols-2 lg:grid-cols-4">{principles.map(({number,title,copy,icon:Icon},index)=><AnimatedSection key={number} delay={index*.05} className="group bg-[#faf7ee] p-7 transition hover:bg-forest-900 hover:text-white"><div className="flex items-center justify-between"><Icon className="h-8 w-8 text-brand-700 group-hover:text-honey-400"/><span className="font-mono text-xs text-forest-900/30 group-hover:text-white/30">{number}</span></div><h3 className="mt-10 font-display text-2xl text-forest-900 group-hover:text-white">{title}</h3><p className="mt-3 text-sm leading-6 text-forest-900/55 group-hover:text-white/55">{copy}</p></AnimatedSection>)}</div></div></section>

    <section className="px-5 py-16 sm:px-8 sm:py-20"><AnimatedSection className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] min-h-[430px]"><Image src="/images/organic-jaipur-farmer-community-v1.png" alt="The Organic Jaipur farm" fill sizes="90vw" className="object-cover"/><div className="absolute inset-0 bg-linear-to-r from-forest-900/95 via-forest-900/65 to-transparent"/><div className="relative flex min-h-[430px] max-w-2xl flex-col justify-center p-8 text-white sm:p-12"><p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-honey-400">One accountable farm</p><h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">We do not just sell the product. We own its beginning.</h2><p className="mt-5 text-sm leading-7 text-white/62">From caring for our cows and beehives to growing mustard and pickle produce, direct ownership lets us explain the journey with confidence. Every A2 ghee, cold-pressed oil, honey and pickle jar we sell is 100% organic and pure, grown and made right here on our own farm in Jaipur, Rajasthan.</p><Link href="/products" className="mt-7 w-fit rounded-full bg-honey-400 px-7 py-3.5 text-sm font-bold text-forest-900">Explore the collection →</Link></div></AnimatedSection></section>
  </main>;
}
