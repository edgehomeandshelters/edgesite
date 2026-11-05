"use client";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import TextReveal from "@/components/animations/TextReveal";
export default function FinalCTA() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : ["-12%", "12%"],
  );
  return (
    <section
      ref={ref}
      className="relative grid min-h-[80svh] place-items-center overflow-hidden bg-ink px-6 text-center text-bone"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-[-15%] bg-[radial-gradient(ellipse_at_50%_60%,#5a4a36,#1c1b19_65%)]"
        aria-hidden="true"
      />
      <div className="relative">
        <TextReveal
          text="Your Next Chapter Begins Here."
          className="mx-auto max-w-4xl font-display text-5xl leading-tight md:text-8xl"
        />
        <a
          href="/#inquiry"
          className="mt-10 inline-block bg-blue-500 px-8 py-4 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Book a Consultation
        </a>
      </div>
    </section>
  );
}
