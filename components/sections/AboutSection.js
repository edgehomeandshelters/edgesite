"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import TextReveal from "@/components/animations/TextReveal";
import { about } from "@/data/about";
export default function AboutSection({ full = false }) {
  const reduce = useReducedMotion();
  return (
    <section id="about" className="px-6 py-28 md:px-16">
      <div className="grid items-start gap-12 md:grid-cols-12">
        <motion.div
          className="md:col-span-5 md:-mt-8"
          initial={reduce ? false : { clipPath: "inset(0 0 100% 0)" }}
          whileInView={{ clipPath: "inset(0 0 0% 0)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid aspect-[3/4] place-items-center bg-clay/30 text-sm text-clay">
            <img src="/images/2.png" />
          </div>
        </motion.div>
        <div className="md:col-span-6 md:col-start-7 md:pt-24">
          <TextReveal
            text="Built with intent, designed to last."
            className="text-5xl leading-tight font-display md:text-6xl"
          />
          <p className="max-w-lg mt-8 text-lg text-ink/80">{about.intro}</p>
          {full ? (
            <dl className="mt-12 space-y-8">
              {about.pillars.map((p) => (
                <div key={p.title} className="pt-4 border-t border-ink/20">
                  <dt className="text-2xl font-display">{p.title}</dt>
                  <dd className="max-w-lg mt-2 text-ink/75">{p.text}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <Link
              href="/about"
              className="inline-block pb-1 mt-8 text-sm border-b border-gold hover:text-gold"
            >
              Read our story
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
