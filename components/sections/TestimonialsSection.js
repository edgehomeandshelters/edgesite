"use client";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/data/testimonials";
export default function TestimonialsSection() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const t = testimonials[i];
  const n = testimonials.length;
  return (
    <section
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      className="bg-ink px-6 py-28 text-bone md:px-16"
    >
      <p className="mb-10 text-sm text-green-500">
        Testimonials and reviews from satisfied Clients.
      </p>
      <div className="min-h-[14rem] max-w-4xl" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.figure
            key={t.id}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -16 }}
            transition={{ duration: 0.45 }}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${n}`}
          >
            <blockquote className="font-display text-3xl leading-snug md:text-5xl">
              {t.quote}
            </blockquote>
            <figcaption className="mt-6 text-sm text-bone/70">
              {t.name}, {t.role}
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
      <div className="mt-10 flex gap-3">
        <button
          onClick={() => setI((i + n - 1) % n)}
          aria-label="Previous testimonial"
          className="border border-bone/30 p-3 hover:border-gold hover:text-gold"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => setI((i + 1) % n)}
          aria-label="Next testimonial"
          className="border border-bone/30 p-3 hover:border-gold hover:text-gold"
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  );
}
