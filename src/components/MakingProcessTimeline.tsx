"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

type Step = { title: string; detail: string; note: string };

export default function MakingProcessTimeline({ steps, images }: { steps: readonly Step[]; images: readonly string[] }) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 70%", "end 45%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.35 });

  return (
    <div ref={timelineRef} className="relative mt-16">
      <div className="absolute bottom-24 left-5 top-24 w-[3px] rounded-full bg-forest-900/10 lg:left-1/2 lg:-translate-x-1/2">
        <motion.div style={{ scaleY: progress, transformOrigin: "top" }} className="h-full w-full rounded-full bg-linear-to-b from-honey-400 via-brand-500 to-forest-900" />
      </div>

      <div className="space-y-20 lg:space-y-28">
        {steps.map((step, index) => {
          const image = (
            <motion.div
              initial={{ opacity: 0, x: index % 2 === 0 ? -45 : 45 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className={`h-[320px] overflow-hidden rounded-[1.8rem] border-4 border-white bg-white shadow-[0_24px_65px_rgba(15,40,28,.16)] sm:h-[430px] ${index % 2 === 0 ? "lg:col-start-1" : "lg:col-start-3"}`}
            >
              <div role="img" aria-label={step.title} className="h-full w-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${images[index]})` }} />
            </motion.div>
          );

          const copy = (
            <motion.div
              initial={{ opacity: 0, x: index % 2 === 0 ? 45 : -45 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
              className={`self-center rounded-[1.5rem] border border-forest-900/8 bg-white p-6 shadow-[0_14px_40px_rgba(15,40,28,.07)] sm:p-8 ${index % 2 === 0 ? "lg:col-start-3" : "lg:col-start-1 lg:row-start-1"}`}
            >
              <p className="text-[9px] font-extrabold uppercase tracking-[.2em] text-terracotta-500">Stage {String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 font-display text-3xl leading-tight text-forest-900 sm:text-4xl">{step.title}</h3>
              <p className="mt-4 text-sm leading-7 text-forest-900/58">{step.detail}</p>
              <div className="mt-6 rounded-xl bg-[#faf7ee] p-4"><p className="text-[9px] font-extrabold uppercase tracking-[.16em] text-brand-700">Why this stage matters</p><p className="mt-1.5 text-xs leading-5 text-forest-900/55">{step.note}</p></div>
            </motion.div>
          );

          return (
            <div key={step.title} className="relative grid grid-cols-[42px_minmax(0,1fr)] gap-5 pl-0 lg:grid-cols-[minmax(0,1fr)_80px_minmax(0,1fr)] lg:items-center lg:gap-8">
              <motion.span
                initial={{ scale: 0.65, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                className="relative z-10 col-start-1 row-span-2 mt-10 flex h-11 w-11 items-center justify-center rounded-full border-4 border-[#fbf8ef] bg-honey-400 font-mono text-[10px] font-extrabold text-forest-900 shadow-lg lg:col-start-2 lg:row-start-1 lg:mt-0 lg:h-14 lg:w-14 lg:justify-self-center"
              >
                {String(index + 1).padStart(2, "0")}
              </motion.span>
              <div className="col-start-2 space-y-5 lg:contents">
                {index % 2 === 0 ? <>{image}{copy}</> : <>{copy}{image}</>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
