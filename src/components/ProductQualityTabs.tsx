"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { BUSINESS } from "@/lib/constants";
import { safeImageUrl } from "@/lib/utils";

type Category = "GHEE" | "MUSTARD_OIL" | "HONEY" | "PICKLES" | "VEGETABLES" | "FRUITS";

type Props = {
  productName: string;
  category: Category;
  imageUrl: string;
};

const PROCESS: Record<Category, { intro: string; steps: Array<{ title: string; text: string }> }> = {
  GHEE: {
    intro: "Traditional bilona preparation, carried out slowly in small batches.",
    steps: [
      { title: "Milk from our cows", text: "Fresh milk from our own Gir cows is checked before processing." },
      { title: "Curd setting", text: "The milk is cultured and allowed to set naturally into curd." },
      { title: "Bilona churning", text: "Curd is slowly churned to separate makkhan using the traditional bilona method." },
      { title: "Slow cooking", text: "The butter is gently heated until clear, aromatic ghee is formed, then filtered and packed." },
    ],
  },
  MUSTARD_OIL: {
    intro: "A slow, low-heat extraction process designed to retain the seed's natural character.",
    steps: [
      { title: "Our farm-grown mustard", text: "Mustard grown on our farm is cleaned and sorted to remove dust and foreign matter." },
      { title: "Wood pressing", text: "Seeds are pressed gradually in a traditional wooden ghani without chemical solvents." },
      { title: "Natural settling", text: "Fresh oil is rested so natural sediment can settle without aggressive refining." },
      { title: "Filtering & packing", text: "The oil is filtered, quality checked and packed in clean, food-safe containers." },
    ],
  },
  HONEY: {
    intro: "Careful sourcing and minimal handling help preserve honey's natural taste and aroma.",
    steps: [
      { title: "Our managed beehives", text: "Honey is collected from beehives installed and managed on our own farm." },
      { title: "Batch inspection", text: "Every incoming lot is visually and sensorially checked for consistency." },
      { title: "Gentle filtration", text: "The honey is filtered to remove physical impurities without unnecessary processing." },
      { title: "Hygienic packing", text: "Approved batches are filled and sealed in sanitised, food-safe jars." },
    ],
  },
  PICKLES: {
    intro: "Traditional recipes, patient maturation and careful small-batch preparation.",
    steps: [
      { title: "Our farm ingredients", text: "Farm-grown mango, lemon, chilli and other seasonal ingredients are cleaned and sorted batch by batch." },
      { title: "Traditional mixing", text: "Ingredients are mixed with measured spices and oil according to the recipe." },
      { title: "Natural maturation", text: "The batch is rested to let flavours develop naturally over time." },
      { title: "Final inspection", text: "Taste, aroma and pack hygiene are checked before jars are sealed." },
    ],
  },
  VEGETABLES: { intro: "Farm-to-home handling with freshness at every step.", steps: [] },
  FRUITS: { intro: "Farm-to-home handling with freshness at every step.", steps: [] },
};

const TESTS = [
  { title: "Farm ingredient check", text: "Ingredients from our farm are inspected for appearance, aroma, cleanliness and batch traceability." },
  { title: "Process control", text: "Batch preparation, handling conditions and hygiene checkpoints are monitored during production." },
  { title: "Finished batch review", text: "The final product is checked for expected colour, aroma, taste, texture and pack integrity." },
  { title: "Batch traceability", text: "Batch details are maintained so quality information can be linked to the packed product." },
];

const PROCESS_STRIPS: Record<Category, string> = {
  GHEE: "/images/process/ghee-traditional-strip-v2.jpg",
  MUSTARD_OIL: "/images/process/oil-traditional-strip-v2.jpg",
  HONEY: "/images/process/honey-traditional-strip-v2.jpg",
  PICKLES: "/images/process/pickle-traditional-strip-v2.jpg",
  VEGETABLES: "/images/products/vegetables.jpg",
  FRUITS: "/images/products/fruits.jpg",
};

const tabs = [
  { id: "process", label: "How it’s made", number: "01" },
  { id: "testing", label: "Quality testing", number: "02" },
  { id: "report", label: "Lab test report", number: "03" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function ProductQualityTabs({ productName, category, imageUrl }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>("process");
  const process = PROCESS[category];
  const reportMessage = encodeURIComponent(`Hi Organic Jaipur, please share the latest batch lab test report for ${productName}.`);

  return (
    <section className="mt-12 overflow-hidden rounded-[2rem] border border-forest-900/10 bg-[#f8f3e7] shadow-[0_24px_70px_rgba(15,40,28,.10)]">
      <div className="grid bg-forest-900 lg:grid-cols-[1.2fr_.8fr]">
        <div className="flex flex-col justify-center px-6 py-9 text-white sm:px-10 sm:py-12">
          <div className="flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[.22em] text-honey-400"><span className="h-px w-10 bg-honey-400" /> Product quality dossier</div>
          <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[.98] sm:text-5xl">Every step documented.<br /><em className="font-normal text-honey-400">Every batch accountable.</em></h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/58">A transparent view of how {productName} is made, what we examine, and where its batch documentation can be accessed.</p>
          <div className="mt-7 flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-wide text-white/70"><span className="rounded-full border border-white/15 px-3 py-2">Small batch</span><span className="rounded-full border border-white/15 px-3 py-2">Traceable</span><span className="rounded-full border border-white/15 px-3 py-2">Quality checked</span></div>
        </div>
        <div className="relative hidden min-h-[340px] overflow-hidden lg:block">
          <Image src={safeImageUrl(imageUrl)} alt="" unoptimized fill sizes="40vw" className="object-cover" />
          <div className="absolute inset-0 bg-linear-to-r from-forest-900 via-forest-900/25 to-transparent" />
          <div className="absolute bottom-6 right-6 rounded-2xl border border-white/20 bg-white/90 p-4 text-forest-900 shadow-xl backdrop-blur">
            <p className="text-[9px] font-extrabold uppercase tracking-[.16em] text-brand-700">Organic Jaipur standard</p>
            <p className="mt-1 font-display text-lg">Process → Check → Proof</p>
          </div>
        </div>
      </div>

      <div className="border-b border-forest-900/10 bg-white px-3 py-3 sm:px-6">
        <div role="tablist" aria-label="Product quality information" className="grid grid-cols-3 gap-2">
          {tabs.map((tab) => (
            <button key={tab.id} type="button" role="tab" aria-selected={activeTab === tab.id} aria-controls={`quality-panel-${tab.id}`} onClick={() => setActiveTab(tab.id)} className={`relative overflow-hidden rounded-xl px-3 py-3.5 text-left transition sm:px-5 ${activeTab === tab.id ? "bg-forest-900 text-white shadow-md" : "bg-[#f8f3e7] text-forest-900/55 hover:text-forest-900"}`}>
              <span className={`block text-[8px] font-extrabold tracking-[.18em] ${activeTab === tab.id ? "text-honey-400" : "text-terracotta-500"}`}>SECTION {tab.number}</span>
              <span className="mt-1 block text-[11px] font-bold sm:text-sm">{tab.label}</span>
              {activeTab === tab.id && <motion.span layoutId="quality-tab" className="absolute inset-x-0 bottom-0 h-1 bg-honey-400" />}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[430px] bg-white p-6 sm:p-9 lg:p-11">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }} id={`quality-panel-${activeTab}`} role="tabpanel">
            {activeTab === "process" && (
              <div>
                <div className="mx-auto max-w-2xl text-center"><p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-terracotta-500">The production journey</p><h3 className="mt-3 font-display text-3xl leading-tight text-forest-900 sm:text-4xl">Made slowly. Handled thoughtfully.</h3><p className="mt-4 text-sm leading-7 text-forest-900/55">{process.intro}</p></div>

                <div className="relative mx-auto mt-10 max-w-4xl before:absolute before:bottom-20 before:left-[59px] before:top-20 before:w-px before:bg-linear-to-b before:from-honey-400 before:via-brand-300 before:to-forest-900/10 sm:before:left-1/2 sm:before:-translate-x-px">
                  {process.steps.map((step, index) => (
                    <div key={step.title} className={`relative mb-10 grid grid-cols-[140px_minmax(0,1fr)] items-center gap-5 last:mb-0 sm:grid-cols-[1fr_72px_1fr] sm:gap-7 ${index % 2 === 0 ? "" : "sm:[&_.process-copy]:col-start-3 sm:[&_.process-copy]:row-start-1 sm:[&_.process-image]:col-start-1 sm:[&_.process-image]:row-start-1"}`}>
                      <div className="process-copy order-2 rounded-2xl border border-forest-900/8 bg-[#faf7ee] p-5 shadow-[0_8px_24px_rgba(15,40,28,.05)] sm:order-none">
                        <p className="text-[9px] font-extrabold uppercase tracking-[.18em] text-terracotta-500">Step {String(index + 1).padStart(2, "0")}</p>
                        <h4 className="mt-2 font-display text-xl text-forest-900 sm:text-2xl">{step.title}</h4>
                        <p className="mt-2 text-xs leading-5 text-forest-900/55 sm:text-sm sm:leading-6">{step.text}</p>
                      </div>

                      <div className="relative z-10 col-start-1 row-start-1 flex justify-center sm:col-start-2">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-honey-400 text-[10px] font-extrabold text-forest-900 shadow-md">{String(index + 1).padStart(2, "0")}</span>
                      </div>

                      <div className="process-image col-start-1 row-start-1 h-[150px] w-[140px] overflow-hidden rounded-2xl border-4 border-white bg-[#eee7d8] shadow-[0_12px_30px_rgba(15,40,28,.14)] sm:col-start-3 sm:h-56 sm:w-full">
                        <div
                          role="img"
                          aria-label={`${step.title} process`}
                          className="h-full w-full bg-no-repeat"
                          style={{
                            backgroundImage: `url(${PROCESS_STRIPS[category]})`,
                            backgroundSize: "400% auto",
                            backgroundPosition: `${(index / Math.max(process.steps.length - 1, 1)) * 100}% center`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "testing" && (
              <div>
                <div className="flex flex-col justify-between gap-4 border-b border-forest-900/10 pb-6 sm:flex-row sm:items-end"><div><p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-terracotta-500">Quality control framework</p><h3 className="mt-2 font-display text-3xl text-forest-900">Four checkpoints. One standard.</h3></div><p className="max-w-sm text-xs leading-5 text-forest-900/45">Checks are linked to production batches for traceability and internal review.</p></div>
                <div className="mt-3 divide-y divide-forest-900/8">
                  {TESTS.map((test, index) => (
                    <div key={test.title} className="grid gap-3 py-5 sm:grid-cols-[70px_210px_1fr_90px] sm:items-center">
                      <span className="font-mono text-xs font-bold text-forest-900/35">QC-{String(index + 1).padStart(2, "0")}</span>
                      <h4 className="font-display text-lg text-forest-900">{test.title}</h4>
                      <p className="text-xs leading-5 text-forest-900/55">{test.text}</p>
                      <span className="w-fit rounded-full bg-brand-50 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-wide text-brand-700">Checked</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "report" && (
              <div className="grid gap-8 lg:grid-cols-[1fr_.8fr] lg:items-center">
                <div className="relative mx-auto w-full max-w-lg rounded-lg border border-forest-900/15 bg-white p-6 shadow-[0_18px_50px_rgba(15,40,28,.12)] sm:p-8">
                  <div className="flex items-start justify-between border-b-2 border-forest-900 pb-5"><div><p className="text-[9px] font-extrabold uppercase tracking-[.2em] text-brand-700">Certificate of analysis</p><p className="mt-2 font-display text-2xl text-forest-900">{productName}</p></div><span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-brand-600 text-lg font-bold text-brand-700">OJ</span></div>
                  <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 text-xs"><div><p className="text-[9px] uppercase tracking-wide text-forest-900/35">Batch number</p><p className="mt-1 font-mono font-bold text-forest-900">From product pack</p></div><div><p className="text-[9px] uppercase tracking-wide text-forest-900/35">Report status</p><p className="mt-1 font-bold text-honey-600">Awaiting upload</p></div><div><p className="text-[9px] uppercase tracking-wide text-forest-900/35">Document type</p><p className="mt-1 font-bold text-forest-900">Batch-specific report</p></div><div><p className="text-[9px] uppercase tracking-wide text-forest-900/35">Verification</p><p className="mt-1 font-bold text-forest-900">Lab issued PDF</p></div></div>
                  <div className="mt-7 h-2 rounded-full bg-forest-900/6"><div className="h-full w-2/3 rounded-full bg-honey-400" /></div>
                  <p className="mt-2 text-[9px] text-forest-900/35">The authenticated report will replace this preview after upload.</p>
                </div>
                <div><p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-terracotta-500">Batch-level transparency</p><h3 className="mt-3 font-display text-3xl leading-tight text-forest-900">Your pack.<br />Its matching report.</h3><p className="mt-4 text-sm leading-7 text-forest-900/55">Reports are batch-specific. Use the number printed on your pack so our team can share the correct document, not a generic certificate.</p><a href={`https://wa.me/${BUSINESS.whatsappNumber}?text=${reportMessage}`} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex rounded-full bg-forest-900 px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-brand-700">Request matching report →</a></div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
