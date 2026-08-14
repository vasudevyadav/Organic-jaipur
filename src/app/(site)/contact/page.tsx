import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import ContactForm from "@/components/ContactForm";
import { BUSINESS } from "@/lib/constants";

export const metadata = { title: "Contact Organic Jaipur: Order, Track or Ask", description: "Order on WhatsApp, call us, or visit our farm on Mahapura Road, Jaipur. We reply within minutes." };

export default function ContactPage() {
  return <main className="overflow-hidden bg-[#fbf8ef]">
    <section className="relative min-h-[520px] overflow-hidden bg-forest-900 text-white">
      <Image src="/images/generated/banner-shop-farm-v3.jpg" alt="Organic Jaipur products at a Rajasthan farm" fill priority sizes="100vw" className="object-cover object-center" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,29,20,.88)_0%,rgba(8,29,20,.55)_50%,rgba(8,29,20,.06)_82%)]" />
      <div className="relative mx-auto flex min-h-[520px] max-w-7xl items-center px-5 py-16 sm:px-8">
        <AnimatedSection className="max-w-3xl">
          <p className="flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[.24em] text-honey-400"><span className="h-px w-10 bg-honey-400" /> Talk to Organic Jaipur</p>
          <h1 className="mt-6 font-display text-5xl leading-[.94] tracking-[-.04em] sm:text-7xl">Get in<br /><em className="font-normal text-honey-400">Touch.</em></h1>
          <p className="mt-2 font-display text-base italic text-honey-400/70">Aapka Sawaal, Hamara Jawaab</p>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/65">Order, track, or ask a question. We usually reply within minutes on WhatsApp.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`https://wa.me/${BUSINESS.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-bold text-white shadow-lg">Chat on WhatsApp →</a>
            <a href={`tel:+91${BUSINESS.phone}`} className="rounded-full border border-white/25 px-7 py-3.5 text-sm font-bold text-white">Call {BUSINESS.phoneDisplay}</a>
          </div>
        </AnimatedSection>
      </div>
    </section>

    <section className="relative z-10 -mt-10 px-5 pb-20 sm:px-8 sm:pb-24">
      <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[.82fr_1.18fr] lg:items-start">
        <AnimatedSection className="space-y-5">
          <div className="overflow-hidden rounded-[1.7rem] border border-forest-900/8 bg-white shadow-[0_20px_60px_rgba(15,40,28,.1)]">
            <div className="p-7 sm:p-8"><p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-terracotta-500">Visit the Farm</p><h2 className="mt-3 font-display text-3xl text-forest-900">Come Say Hello</h2><p className="mt-4 text-sm leading-7 text-forest-900/58">{BUSINESS.address}</p><a href={BUSINESS.mapLink} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex rounded-full bg-forest-900 px-5 py-2.5 text-xs font-bold text-white">Get directions →</a></div>
            <iframe title="Organic Jaipur location on Google Maps" src={BUSINESS.mapEmbedSrc} width="100%" height="270" style={{border:0}} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <a href={`https://wa.me/${BUSINESS.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="group rounded-2xl bg-[#eafbf0] p-5 transition hover:-translate-y-1 hover:shadow-lg"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] font-bold text-white">W</span><p className="mt-4 text-[9px] font-extrabold uppercase tracking-[.16em] text-[#157c3b]">Fastest Response</p><h3 className="mt-1 font-display text-xl text-forest-900">WhatsApp</h3><p className="mt-1 text-xs text-forest-900/50">Fastest way to order or ask about a product</p></a>
            <a href={`tel:+91${BUSINESS.phone}`} className="group rounded-2xl bg-[#fff4dc] p-5 transition hover:-translate-y-1 hover:shadow-lg"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-honey-400 font-bold text-forest-900">☎</span><p className="mt-4 text-[9px] font-extrabold uppercase tracking-[.16em] text-terracotta-500">Speak Directly</p><h3 className="mt-1 font-display text-xl text-forest-900">Call Us</h3><p className="mt-1 text-xs text-forest-900/50">{BUSINESS.phoneDisplay}, Mon to Sat</p></a>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={.1} className="overflow-hidden rounded-[1.7rem] border border-forest-900/8 bg-white shadow-[0_20px_60px_rgba(15,40,28,.1)]">
          <div className="bg-forest-900 px-7 py-6 text-white sm:px-9"><p className="text-[9px] font-extrabold uppercase tracking-[.2em] text-honey-400">Send an Enquiry</p><h2 className="mt-2 font-display text-3xl">Have a Question Before You Order?</h2><p className="mt-2 text-xs leading-5 text-white/50">Send it here. We reply the same day.</p></div>
          <div className="p-7 sm:p-9"><ContactForm /></div>
          <div className="grid grid-cols-3 divide-x divide-forest-900/10 border-t border-forest-900/10 bg-[#faf7ee] py-4 text-center text-[9px] font-bold uppercase tracking-wide text-forest-900/45"><span>Real support</span><span>Clear answers</span><span>Privacy respected</span></div>
        </AnimatedSection>
      </div>
    </section>

    <section className="bg-white px-5 py-16 sm:px-8"><AnimatedSection className="mx-auto max-w-7xl"><div className="grid gap-px overflow-hidden rounded-[1.7rem] border border-forest-900/10 bg-forest-900/10 md:grid-cols-3"><div className="bg-[#faf7ee] p-7"><span className="font-mono text-xs text-terracotta-500">01</span><h3 className="mt-5 font-display text-2xl text-forest-900">Send Your Order or Question</h3><p className="mt-2 text-sm leading-6 text-forest-900/55">Product, order number or batch number helps us understand your question.</p></div><div className="bg-[#faf7ee] p-7"><span className="font-mono text-xs text-terracotta-500">02</span><h3 className="mt-5 font-display text-2xl text-forest-900">We Confirm on WhatsApp or Call</h3><p className="mt-2 text-sm leading-6 text-forest-900/55">We check the available product or order information instead of sending a generic reply.</p></div><div className="bg-[#faf7ee] p-7"><span className="font-mono text-xs text-terracotta-500">03</span><h3 className="mt-5 font-display text-2xl text-forest-900">We Deliver to Your Door</h3><p className="mt-2 text-sm leading-6 text-forest-900/55">We respond directly using the contact details you provide.</p></div></div></AnimatedSection></section>
  </main>;
}
