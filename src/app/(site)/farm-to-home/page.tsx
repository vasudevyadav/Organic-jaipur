import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import { BUSINESS } from "@/lib/constants";

export const metadata = {
  title: "From Our Farm to Your Home | Organic Jaipur",
  description:
    "See how your order reaches you: grown on our farm, made in small batches, checked, then delivered to your door in Jaipur.",
};

const STEPS = [
  {
    number: "01",
    title: "Apne Farm Se Shuruwat",
    eyebrow: "Ugana",
    copy: "Gir cows, sarson ke khet aur managed beehives hamare apne farm par hain. Achar ke liye aam, nimbu aur mirch bhi mausam ke saath yahin ugte hain.",
    image: "/images/organic-jaipur-farmer-community-v1.png",
    note: "Apna farm, apni dekhbhaal",
  },
  {
    number: "02",
    title: "Chhote Batch, Poora Dhyaan",
    eyebrow: "Banana",
    copy: "Bilona churning, wooden-ghani pressing aur honey filtering waqt lete hain. Hum raftaar se pehle asli character ko chunte hain.",
    image: "/images/founder/founder-bilona-churning.png",
    note: "Har batch par nazar",
  },
  {
    number: "03",
    title: "Jaanch Ke Baad Hi Pack",
    eyebrow: "Shuddhta",
    copy: "Ingredients, process, final taste aur pack—har cheez dekhi jaati hai. Har batch ki jaankari traceability ke liye sambhali jaati hai.",
    image: "/images/founder-with-a2-ghee-v1.png",
    note: "Batch se judi jaanch",
  },
  {
    number: "04",
    title: "Sambhaal Se Aapke Ghar Tak",
    eyebrow: "Delivery",
    copy: "Jaipur mein free delivery aur Rajasthan bhar courier. Delivery se pehle aur baad, WhatsApp par apni team ka seedha support.",
    image: "/images/organic-jaipur-hero-v2.png",
    note: "WhatsApp par apni team",
  },
] as const;

export default function FarmToHomePage() {
  return (
    <main className="overflow-hidden bg-[#fbf8ef]">
      <section className="relative min-h-[560px] overflow-hidden bg-forest-900 text-white">
        <Image
          src="/images/generated/banner-shop-farm-v3.jpg"
          alt="Organic Jaipur products at a Rajasthan farm"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,29,20,.96)_0%,rgba(8,29,20,.78)_48%,rgba(8,29,20,.28)_100%)]" />
        <div className="relative mx-auto flex min-h-[560px] max-w-7xl items-center px-5 py-20 sm:px-8">
          <AnimatedSection className="max-w-3xl">
            <p className="flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[.24em] text-honey-400">
              <span className="h-px w-10 bg-honey-400" /> The Organic Jaipur Way
            </p>
            <h1 className="mt-6 font-display text-5xl leading-[.94] tracking-[-.04em] sm:text-7xl">
              Apne Farm Se Shuruwat,
              <br />
              <em className="font-normal text-honey-400">
                Aapke Ghar Tak Bharosa.
              </em>
            </h1>
            <p className="mt-2 font-display text-base italic text-honey-400/70">
              Khet Se Bharosa Tak
            </p>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/68">
              How your order actually reaches you. Every step below happens
              before it ships, not after.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#journey"
                className="rounded-full bg-honey-400 px-7 py-3.5 text-sm font-bold text-forest-900"
              >
                Follow the journey ↓
              </Link>
              <a
                href={`https://wa.me/${BUSINESS.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/25 px-7 py-3.5 text-sm font-bold text-white"
              >
                Ask about sourcing
              </a>
            </div>
          </AnimatedSection>
        </div>
        <div className="absolute bottom-0 right-0 hidden w-[44%] grid-cols-3 border-l border-t border-white/10 bg-forest-900/85 backdrop-blur lg:grid">
          <div className="p-5">
            <strong className="block font-display text-xl text-honey-400">
              Ours
            </strong>
            <span className="text-[10px] uppercase tracking-wide text-white/50">
              Farm & Gir Cows
            </span>
          </div>
          <div className="border-x border-white/10 p-5">
            <strong className="block font-display text-xl text-honey-400">
              Small
            </strong>
            <span className="text-[10px] uppercase tracking-wide text-white/50">
              Monitored Batches
            </span>
          </div>
          <div className="p-5">
            <strong className="block font-display text-xl text-honey-400">
              Clear
            </strong>
            <span className="text-[10px] uppercase tracking-wide text-white/50">
              Product Answers
            </span>
          </div>
        </div>
      </section>

      <section id="journey" className="px-5 py-8 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection className="grid gap-6 border-b border-forest-900/10 pb-10 ">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-terracotta-500">
                Khet Se Ghar Tak
              </p>
              <h2 className="mt-3 font-display text-4xl leading-tight text-forest-900 sm:text-5xl">
                Chaar Seedhe Kadam,
                <br />
                <em className="font-normal text-brand-700">
                  Koi Chhupi Baat Nahi.
                </em>
              </h2>
              <p className="w-full self-end text-base leading-7 text-forest-900/58">
                Har Organic Jaipur product apne source se aapki rasoi tak in
                saaf aur zimmedar kadmon se pahunchta hai.
              </p>
            </div>
          </AnimatedSection>
          <div className="relative mt-8 space-y-10 before:absolute before:bottom-20 before:left-6 before:top-20 before:w-px before:bg-brand-200 lg:before:left-1/2">
            {STEPS.map((step, index) => (
              <AnimatedSection
                key={step.number}
                delay={index * 0.06}
                className={`relative grid items-center gap-7 pl-14 lg:grid-cols-2 lg:gap-20 lg:pl-0 ${index % 2 ? "lg:[&_.journey-copy]:order-2" : ""}`}
              >
                <span className="absolute left-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border-4 border-[#fbf8ef] bg-forest-900 text-[10px] font-extrabold text-honey-400 shadow-md lg:left-1/2 lg:-translate-x-1/2">
                  {step.number}
                </span>
                <div className="journey-copy lg:px-8">
                  <p className="text-[9px] font-extrabold uppercase tracking-[.2em] text-terracotta-500">
                    {step.eyebrow}
                  </p>
                  <h3 className="mt-2 font-display text-3xl text-forest-900 sm:text-4xl">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-forest-900/58">
                    {step.copy}
                  </p>
                  <span className="mt-5 inline-flex rounded-full bg-brand-50 px-3 py-2 text-[10px] font-extrabold uppercase tracking-wide text-brand-700">
                    ✓ {step.note}
                  </span>
                </div>
                <div className="relative min-h-[300px] overflow-hidden rounded-[1.7rem] border-4 border-white shadow-[0_18px_45px_rgba(15,40,28,.12)] sm:min-h-[380px]">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    sizes="(max-width:1023px) 90vw, 45vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-forest-900/25 to-transparent" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest-900 px-5 py-16 text-white sm:px-8 sm:py-20">
        <AnimatedSection className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-honey-400">
              Bharose Ka Jawaab
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-5xl">
              Sawaal Aapka,{" "}
              <em className="font-normal text-honey-400">
                Seedha Jawaab Hamara.
              </em>
            </h2>
          </div>
          <Link
            href="/products"
            className="rounded-full bg-honey-400 px-7 py-3.5 text-center text-sm font-bold text-forest-900"
          >
            Explore products →
          </Link>
        </AnimatedSection>
      </section>
    </main>
  );
}
