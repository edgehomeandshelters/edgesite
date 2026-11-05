"use client";
import { motion, useReducedMotion } from "motion/react";
import {
  Hammer,
  MapPin,
  ShieldCheck,
  PenTool,
  TrendingUp,
  Handshake,
} from "lucide-react";
import TextReveal from "@/components/animations/TextReveal";
const features = [
  [Hammer, "Quality construction", "Description to be supplied."],
  [MapPin, "Strategic locations", "Description to be supplied."],
  [ShieldCheck, "Transparent transactions", "Description to be supplied."],
  [PenTool, "Modern architectural design", "Description to be supplied."],
  [TrendingUp, "Long-term property value", "Description to be supplied."],
  [Handshake, "Client-focused service", "Description to be supplied."],
];
export default function WhyChooseUs() {
  const reduce = useReducedMotion();
  return (
    <section className="px-6 py-28 md:px-16">
      <TextReveal
        text="Why Choose Us"
        className="mb-16 font-display text-5xl md:text-7xl"
      />
      <ul className="grid border-l border-t border-ink/20 md:grid-cols-3">
        {features.map(([Icon, t, d], i) => (
          <motion.li
            key={t}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.1 }}
            className="group border-b border-r border-ink/20 p-8"
          >
            <Icon
              className="h-8 w-8 text-green-500 transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-6"
              strokeWidth={1.25}
              aria-hidden="true"
            />
            <h3 className="mt-6 font-display text-2xl">{t}</h3>
            <p className="mt-2 text-sm text-ink/70">{d}</p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
