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
            Image placeholder
          </div>
        </motion.div>
        <div className="md:col-span-6 md:col-start-7 md:pt-24">
          <TextReveal
            text="Built with intent, designed to last."
            className="font-display text-5xl leading-tight md:text-6xl"
          />
          <p className="mt-8 max-w-lg text-lg text-ink/80">{about.intro}</p>
          {full ? (
            <dl className="mt-12 space-y-8">
              {about.pillars.map((p) => (
                <div key={p.title} className="border-t border-ink/20 pt-4">
                  <dt className="font-display text-2xl">{p.title}</dt>
                  <dd className="mt-2 max-w-lg text-ink/75">{p.text}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <Link
              href="/about"
              className="mt-8 inline-block border-b border-gold pb-1 text-sm hover:text-gold"
            >
              Read our story
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
