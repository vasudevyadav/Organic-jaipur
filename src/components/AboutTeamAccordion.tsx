"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

const responsibilities = [
  {
    number: "01",
    title: "Farm & crop management",
    eyebrow: "From our soil",
    copy: "Mustard, mango, lemon, chilli and other seasonal produce are grown and looked after on our own farm by our team.",
    image: "/images/founder/founder-mustard-field.png",
    imagePosition: "center",
  },
  {
    number: "02",
    title: "Gir cow care & dairy",
    eyebrow: "From our cows",
    copy: "We manage the daily care of our own Gir cows and the milk journey that leads to curd, hand churning and traditional bilona ghee.",
    image: "/images/founder/founder-feeding-gir-cows.png",
    imagePosition: "center",
  },
  {
    number: "03",
    title: "Pickle making & maturation",
    eyebrow: "From our harvest",
    copy: "Our farm-grown mango, lemon and chilli are sorted, prepared, mixed with spices and patiently matured in small, carefully watched batches.",
    image: "/images/generated/banner-pickle-courtyard-v4.png",
    imagePosition: "right center",
  },
  {
    number: "04",
    title: "Beehives, packing & dispatch",
    eyebrow: "From hive to home",
    copy: "We maintain our beehives, handle the honey gently, and personally oversee packing and dispatch before an order leaves for your home.",
    image: "/images/founder/founder-apiary-honeycomb.png",
    imagePosition: "center",
  },
] as const;

export default function AboutTeamAccordion() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 72%", "end 45%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.35,
  });

  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[.22em] text-terracotta-500">
              The People Behind Every Batch
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl leading-[1.03] text-forest-900 sm:text-6xl">
              Our farm. Our hands. <em className="font-normal text-brand-700">Our responsibility.</em>
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-forest-900/60 lg:justify-self-end">
            From caring for the farm to packing your order, every stage is managed by our own family and team.
          </p>
        </div>

        <div ref={timelineRef} className="relative mt-16 sm:mt-20">
          <div className="absolute bottom-20 left-5 top-20 w-[3px] rounded-full bg-forest-900/10 lg:left-1/2 lg:-translate-x-1/2">
            <motion.div
              style={{ scaleY: progress, transformOrigin: "top" }}
              className="h-full w-full rounded-full bg-linear-to-b from-honey-400 via-terracotta-500 to-brand-700"
            />
          </div>

          <div className="space-y-16 lg:space-y-24">
            {responsibilities.map((item, index) => {
              const image = (
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.65, ease: "easeOut" }}
                  className={`relative h-[280px] overflow-hidden rounded-[1.8rem] border-4 border-white bg-forest-900 shadow-[0_22px_60px_rgba(15,40,28,.16)] sm:h-[390px] ${index % 2 === 0 ? "lg:col-start-1" : "lg:col-start-3"}`}
                >
                  <div
                    role="img"
                    aria-label={item.title}
                    className="absolute inset-0 bg-cover bg-no-repeat transition duration-700 hover:scale-[1.03]"
                    style={{ backgroundImage: `url('${item.image}')`, backgroundPosition: item.imagePosition }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-forest-950/70 via-transparent to-transparent" />
                  <p className="absolute bottom-5 left-6 text-[10px] font-extrabold uppercase tracking-[.2em] text-honey-400">
                    {item.eyebrow}
                  </p>
                </motion.div>
              );

              const copy = (
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.65, delay: 0.08, ease: "easeOut" }}
                  className={`self-center rounded-[1.6rem] border border-forest-900/10 bg-white p-7 shadow-[0_14px_40px_rgba(15,40,28,.07)] sm:p-9 ${index % 2 === 0 ? "lg:col-start-3" : "lg:col-start-1 lg:row-start-1"}`}
                >
                  <p className="text-[9px] font-extrabold uppercase tracking-[.2em] text-terracotta-500">
                    Our process · Stage {item.number}
                  </p>
                  <h3 className="mt-3 font-display text-3xl leading-tight text-forest-900 sm:text-4xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-forest-900/60">{item.copy}</p>
                  <div className="mt-6 flex items-center gap-3 border-t border-forest-900/10 pt-5 text-[10px] font-extrabold uppercase tracking-[.15em] text-brand-700">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-700 text-white">✓</span>
                    Managed by our own team
                  </div>
                </motion.div>
              );

              return (
                <div
                  key={item.number}
                  className="relative grid grid-cols-[42px_minmax(0,1fr)] gap-5 lg:grid-cols-[minmax(0,1fr)_80px_minmax(0,1fr)] lg:items-center lg:gap-8"
                >
                  <motion.span
                    initial={{ scale: 0.65, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    className="relative z-10 col-start-1 row-span-2 mt-10 flex h-11 w-11 items-center justify-center rounded-full border-4 border-[#fbf8ef] bg-honey-400 font-mono text-[10px] font-extrabold text-forest-900 shadow-lg lg:col-start-2 lg:row-start-1 lg:mt-0 lg:h-14 lg:w-14 lg:justify-self-center"
                  >
                    {item.number}
                  </motion.span>
                  <div className="col-start-2 space-y-5 lg:contents">
                    {index % 2 === 0 ? <>{image}{copy}</> : <>{copy}{image}</>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
