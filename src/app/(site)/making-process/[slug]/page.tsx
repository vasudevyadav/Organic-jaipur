import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AnimatedSection from "@/components/AnimatedSection";
import { MAKING_PROCESSES } from "@/lib/making-process";
import MakingProcessTimeline from "@/components/MakingProcessTimeline";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return MAKING_PROCESSES.map((process) => ({ slug: process.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const process = MAKING_PROCESSES.find((item) => item.slug === slug);
  return process
    ? {
        title: `${process.label} Making Process`,
        description: `${process.intro} Made on our own farm in Jaipur, Rajasthan.`,
        openGraph: { images: [{ url: process.banner }] },
      }
    : { title: "Making Process" };
}

export default async function MakingProcessPage({ params }: Props) {
  const { slug } = await params;
  const process = MAKING_PROCESSES.find((item) => item.slug === slug);
  if (!process) notFound();

  return (
    <main className="overflow-hidden bg-[#fbf8ef]">
      <section className="relative overflow-hidden bg-forest-900 text-white sm:min-h-[590px]">
        <div className="absolute inset-x-0 top-0 h-[310px] sm:inset-0 sm:h-auto">
          <Image src={process.banner} alt={`${process.label} making process at Organic Jaipur`} fill priority sizes="100vw" className="object-cover object-right sm:object-center" />
          <div className="absolute inset-0 bg-linear-to-t from-forest-900/20 to-transparent sm:bg-[linear-gradient(90deg,rgba(8,29,20,.92)_0%,rgba(8,29,20,.68)_44%,rgba(8,29,20,.05)_78%)]" />
        </div>
        <AnimatedSection className="relative mx-auto flex min-h-[590px] max-w-7xl items-center px-5 pb-16 pt-[350px] sm:px-8 sm:py-24">
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[.24em] text-honey-400"><span className="h-px w-10 bg-honey-400" /> {process.eyebrow}</p>
            <h1 className="mt-5 font-display text-4xl leading-[.96] tracking-[-.04em] sm:mt-6 sm:text-7xl">{process.title}</h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/62 sm:text-base">{process.intro}</p>
            <p className="mt-4 w-fit rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-semibold text-honey-400 backdrop-blur-sm">{process.accent}</p>
            <div className="mt-8 flex flex-wrap gap-3"><a href="#complete-process" className="rounded-full bg-honey-400 px-7 py-3.5 text-sm font-bold text-forest-900">See Complete Process ↓</a><Link href={`/products?category=${process.category}`} className="rounded-full border border-white/25 px-7 py-3.5 text-sm font-bold text-white">Shop {process.label}</Link></div>
          </div>
        </AnimatedSection>
      </section>

      <section className="border-b border-forest-900/10 bg-white px-5 py-5 sm:px-8">
        <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto pb-1">
          {MAKING_PROCESSES.map((item) => <Link key={item.slug} href={`/making-process/${item.slug}`} className={`shrink-0 rounded-full px-5 py-2.5 text-xs font-bold transition ${item.slug === process.slug ? "bg-forest-900 text-white" : "border border-forest-900/12 text-forest-900 hover:bg-[#faf7ee]"}`}>{item.label}</Link>)}
        </div>
      </section>

      <section id="complete-process" className="scroll-mt-28 px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection className="mx-auto max-w-3xl text-center"><p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-terracotta-500">Step-by-Step Production</p><h2 className="mt-4 font-display text-4xl leading-tight text-forest-900 sm:text-6xl">A Process You Can Follow,<br /><em className="font-normal text-brand-700">From Beginning to Pack.</em></h2><p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-forest-900/55">Each stage has a purpose. Follow the timeline to understand what happens and why it matters.</p></AnimatedSection>

          <MakingProcessTimeline steps={process.steps} strip={process.strip} />
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8"><AnimatedSection className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><div><p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-terracotta-500">Beyond the {process.label} Process</p><h2 className="mt-3 font-display text-4xl leading-tight text-forest-900 sm:text-5xl">Har Kadam Par Nazar, <em className="font-normal text-brand-700">Har Batch Mein Bharosa.</em></h2></div><div className="grid gap-px overflow-hidden rounded-[1.5rem] border border-forest-900/10 bg-forest-900/10 sm:grid-cols-3">{process.steps.slice(1).map((step) => <div key={step.title} className="bg-[#faf7ee] p-6"><span className="text-brand-700">✓</span><h3 className="mt-5 font-display text-xl text-forest-900">{step.title}</h3><p className="mt-2 text-xs leading-5 text-forest-900/50">{step.note}</p></div>)}</div></AnimatedSection></section>

      <section className="bg-forest-900 px-5 py-16 text-center text-white sm:px-8 sm:py-20"><AnimatedSection><p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-honey-400">Taste the Result</p><h2 className="mt-3 font-display text-4xl sm:text-5xl">Parampara Waqt Leti Hai, <em className="font-normal text-honey-400">Fark Swaad Mein Dikhta Hai.</em></h2><Link href={`/products?category=${process.category}`} className="mt-7 inline-flex rounded-full bg-honey-400 px-8 py-3.5 text-sm font-bold text-forest-900">Shop {process.label} →</Link></AnimatedSection></section>
    </main>
  );
}
