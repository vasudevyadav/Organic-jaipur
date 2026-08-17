import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import AboutTeamAccordion from "@/components/AboutTeamAccordion";
import {
  FlaskIcon,
  HandshakeIcon,
  LeafIcon,
  TruckIcon,
} from "@/components/icons";

export const metadata = {
  title: "Our Own Farm in Jaipur, Rajasthan | Organic Jaipur",
  description:
    "We grow, churn, press and pack everything we sell on one farm in Jaipur. No traders, no anonymous sourcing.",
};

const principles = [
  {
    number: "01",
    title: "Ek Khet, Poori Zimmedari",
    copy: "Gir cows, sarson ke khet aur beehives ek hi jagah—source wahi, jiska jawaab hum de sakein.",
    icon: HandshakeIcon,
  },
  {
    number: "02",
    title: "Jar Mein Wahi, Jo Label Par",
    copy: "Har ingredient saaf likha hai. Na filler, na chhupa hua flavour.",
    icon: LeafIcon,
  },
  {
    number: "03",
    title: "Sawaal Seedha, Jawaab Apna",
    copy: "Batch, ingredient ya delivery—hamari team se poochhiye, scripted reply se nahi.",
    icon: FlaskIcon,
  },
  {
    number: "04",
    title: "Daam Saaf, Koi Surprise Nahi",
    copy: "Jo price dikhe, wahi aap dein. Delivery par koi chhupa charge nahi.",
    icon: TruckIcon,
  },
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-[#fbf8ef]">
      <section className="relative min-h-[610px] bg-forest-900 text-white">
        <Image
          src="/images/generated/about-farm-banner-v3.png"
          alt="Organic Jaipur farm in Jaipur, Rajasthan"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,29,20,.78)_0%,rgba(8,29,20,.38)_48%,rgba(8,29,20,.02)_80%)]" />
        <div className="relative mx-auto flex min-h-[610px] max-w-7xl items-center px-5 py-20 sm:px-8">
          <AnimatedSection className="max-w-3xl">
            <p className="flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[.24em] text-honey-400">
              <span className="h-px w-10 bg-honey-400" /> Hamari Kahaani
            </p>
            <h1 className="mt-6 font-display text-5xl leading-[.92] tracking-[-.04em] sm:text-7xl">
              Sirf Farm Nahi,
              <br />
              <em className="font-normal text-honey-400">
                Hamari Zimmedari Hai.
              </em>
            </h1>
            <p className="mt-3 font-display text-base italic text-honey-400/70">
              अपनी मिट्टी, अपनी ज़िम्मेदारी
            </p>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/68">
              Hum jo bechte hain, use Jaipur ke apne farm par ugate, mathte,
              press aur pack karte hain. Beech mein na trader, na anjaan source.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <AboutTeamAccordion />

      <section className="bg-white px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection className="grid gap-6 border-b border-forest-900/10 pb-9 lg:grid-cols-2">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-terracotta-500">
                How We Operate
              </p>
              <h2 className="mt-3 font-display text-4xl text-forest-900 sm:text-5xl">
                Four Principles We Can Be Held To
              </h2>
            </div>
            <p className="max-w-xl self-end text-sm leading-7 text-forest-900/55">
              Trust is not a decorative badge. These principles shape which
              products we choose, what we document and how we answer customers.
            </p>
          </AnimatedSection>
          <div className="mt-10 grid gap-px overflow-hidden rounded-[1.7rem] border border-forest-900/10 bg-forest-900/10 md:grid-cols-2 lg:grid-cols-4">
            {principles.map(({ number, title, copy, icon: Icon }, index) => (
              <AnimatedSection
                key={number}
                delay={index * 0.05}
                className="group bg-[#faf7ee] p-7 transition hover:bg-forest-900 hover:text-white"
              >
                <div className="flex items-center justify-between">
                  <Icon className="h-8 w-8 text-brand-700 group-hover:text-honey-400" />
                  <span className="font-mono text-xs text-forest-900/30 group-hover:text-white/30">
                    {number}
                  </span>
                </div>
                <h3 className="mt-10 font-display text-2xl text-forest-900 group-hover:text-white">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-forest-900/55 group-hover:text-white/55">
                  {copy}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-8 sm:px-8 sm:py-16">
        <AnimatedSection className="relative mx-auto min-h-[430px] max-w-7xl overflow-hidden rounded-[2rem]">
          <Image
            src="/images/founder/founder-product-lineup.png"
            alt="Organic Jaipur founder with farm-made ghee, honey, mustard oil and grains"
            fill
            sizes="90vw"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-linear-to-r from-forest-900/78 via-forest-900/35 to-transparent" />
          <div className="relative flex min-h-[430px] max-w-2xl flex-col justify-center p-8 text-white sm:p-12">
            <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-honey-400">
              One Accountable Farm
            </p>
            <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
              We Do Not Just Sell the Product. We Own Its Beginning.
            </h2>
            <p className="mt-5 text-sm leading-7 text-white/62">
              Ask us how a batch was made, why a price is what it is, or when
              your order will arrive. You will get a straight answer from
              someone who actually knows, not a call centre script.
            </p>
            <Link
              href="/products"
              className="mt-7 w-fit rounded-full bg-honey-400 px-7 py-3.5 text-sm font-bold text-forest-900"
            >
              Shop With Confidence →
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </main>
  );
}
