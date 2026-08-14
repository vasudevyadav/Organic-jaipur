"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const responsibilities = [
  {
    number: "01",
    title: "Farm & crop management",
    eyebrow: "From our soil",
    copy: "Mustard, mango, lemon, chilli and other seasonal produce are grown and looked after on our own farm by our team.",
    image: "/images/process/oil-traditional-strip-v2.jpg",
    imagePosition: "0% center",
  },
  {
    number: "02",
    title: "Gir cow care & dairy",
    eyebrow: "From our cows",
    copy: "We manage the daily care of our own Gir cows and the milk journey that leads to curd, hand churning and traditional bilona ghee.",
    image: "/images/process/ghee-traditional-strip-v2.jpg",
    imagePosition: "66.666% center",
  },
  {
    number: "03",
    title: "Pickle making & maturation",
    eyebrow: "From our harvest",
    copy: "Our farm-grown mango, lemon and chilli are sorted, prepared, mixed with spices and patiently matured in small, carefully watched batches.",
    image: "/images/process/pickle-traditional-strip-v2.jpg",
    imagePosition: "66.666% center",
  },
  {
    number: "04",
    title: "Beehives, packing & dispatch",
    eyebrow: "From hive to home",
    copy: "We maintain our beehives, handle the honey gently, and personally oversee packing and dispatch before an order leaves for your home.",
    image: "/images/process/honey-traditional-strip-v2.jpg",
    imagePosition: "100% center",
  },
];

export default function AboutTeamAccordion() {
  const [active, setActive] = useState(0);
  const selected = responsibilities[active];

  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-11 grid gap-5 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[.22em] text-terracotta-500">The People Behind Every Batch</p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl leading-[1.03] text-forest-900 sm:text-6xl">
              Our farm. Our hands. <em className="font-normal text-brand-700">Our responsibility.</em>
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-forest-900/60 lg:justify-self-end">
            We are the people who manage Organic Jaipur day to day. The work is shared across our family and team, from caring for the farm to packing your order.
          </p>
        </div>

        <div className="grid overflow-hidden rounded-[2rem] border border-forest-900/10 bg-white shadow-[0_24px_70px_rgba(15,40,28,.10)] lg:grid-cols-[.86fr_1.14fr]">
          <div className="relative min-h-[520px] overflow-hidden bg-forest-900 sm:min-h-[620px] lg:min-h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.025 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('${selected.image}')`,
                  backgroundSize: "400% auto",
                  backgroundPosition: selected.imagePosition,
                }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-linear-to-t from-forest-950/85 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9">
              <p className="text-[9px] font-extrabold uppercase tracking-[.2em] text-honey-400">{selected.eyebrow}</p>
              <p className="mt-2 max-w-sm font-display text-3xl leading-tight">Managed by our own team, every day.</p>
            </div>
          </div>

          <div className="p-6 sm:p-9 lg:p-11">
            <div className="mb-7 flex items-center justify-between border-b border-forest-900/10 pb-6">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-brand-700">What We Manage Ourselves</p>
                <p className="mt-2 text-sm text-forest-900/50">Choose a stage to see our team and responsibility.</p>
              </div>
              <span className="hidden rounded-full bg-[#f4efe0] px-4 py-2 font-mono text-xs font-bold text-forest-900/55 sm:block">{active + 1} / 4</span>
            </div>

            <div className="divide-y divide-forest-900/10">
              {responsibilities.map((item, index) => {
                const isOpen = active === index;
                return (
                  <div key={item.number}>
                    <button
                      type="button"
                      onClick={() => setActive(index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center gap-4 py-5 text-left"
                    >
                      <span className={`font-mono text-[11px] font-bold transition ${isOpen ? "text-terracotta-500" : "text-forest-900/30"}`}>{item.number}</span>
                      <span className={`flex-1 font-display text-xl transition sm:text-2xl ${isOpen ? "text-forest-900" : "text-forest-900/60"}`}>{item.title}</span>
                      <span className={`grid h-9 w-9 place-items-center rounded-full border text-xl leading-none transition ${isOpen ? "rotate-45 border-forest-900 bg-forest-900 text-white" : "border-forest-900/15 text-forest-900"}`} aria-hidden="true">+</span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-xl pb-6 pl-9 pr-10 text-sm leading-7 text-forest-900/60">{item.copy}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 grid grid-cols-3 gap-2 border-t border-forest-900/10 pt-6 text-center text-[9px] font-extrabold uppercase tracking-[.12em] text-forest-900/45">
              <span>Own Farm</span>
              <span>Shared Hands</span>
              <span>Direct Control</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
