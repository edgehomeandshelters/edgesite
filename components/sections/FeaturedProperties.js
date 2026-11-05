"use client";
import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import TextReveal from "@/components/animations/TextReveal";
import { properties } from "@/data/properties";
import { naira } from "@/lib/utils";
function Card({ p, i }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const tilt = (e) => {
    if (reduce || e.pointerType === "touch") return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5,
      y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: i * 0.12 }}
      className={i === 1 ? "md:mt-20" : ""}
    >
      <div
        ref={ref}
        onPointerMove={tilt}
        onPointerLeave={reset}
        className="transition-transform duration-200 will-change-transform"
      >
        <div className="group relative aspect-[4/5] overflow-hidden bg-clay/30">
          {p.image ? (
            <Image
              src={p.image}
              alt={`${p.name}, ${p.type}`}
              fill
              sizes="(min-width:768px) 33vw,100vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="grid h-full place-items-center text-sm text-clay">
              Image placeholder
            </div>
          )}
          <span className="absolute left-4 top-4 bg-ink px-3 py-1 text-xs text-bone">
            {p.status}
          </span>
        </div>
        <h3 className="mt-5 font-display text-3xl">{p.name}</h3>
        <p className="text-sm text-clay">
          {p.location} · {p.type}
          {p.bedrooms ? ` · ${p.bedrooms} bed` : ""}
        </p>
        <p className="mt-2 font-medium">{naira(p.priceNGN)}</p>
        <a
          href="#inquiry"
          className="mt-3 inline-block border-b border-gold pb-1 text-sm hover:text-gold"
        >
          View Property
        </a>
      </div>
    </motion.article>
  );
}
export default function FeaturedProperties() {
  return (
    <section id="properties" className="px-6 py-28 md:px-16">
      <TextReveal
        text="Featured Properties"
        className="mb-16 font-display text-5xl md:text-7xl"
      />
      <div className="grid gap-10 md:grid-cols-3">
        {properties.map((p, i) => (
          <Card key={p.id} p={p} i={i} />
        ))}
      </div>
    </section>
  );
}
