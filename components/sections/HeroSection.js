"use client";
import dynamic from "next/dynamic";
import { Component, useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import TextReveal from "@/components/animations/TextReveal";
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
});
class Boundary extends Component {
  state = { e: false };
  static getDerivedStateFromError() {
    return { e: true };
  }
  render() {
    return this.state.e ? null : this.props.children;
  }
}
export default function HeroSection() {
  const reduce = useReducedMotion();
  const [use3D, setUse3D] = useState(false);
  useEffect(() => {
    const weak =
      (navigator.hardwareConcurrency || 4) < 4 ||
      navigator.connection?.saveData;
    setUse3D(!reduce && !weak);
  }, [reduce]);
  return (
    <section
      id="home"
      className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink text-bone"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,#4a4033,#1c1b19_70%)]"
        aria-hidden="true"
      />
      {use3D && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8 }}
          aria-hidden="true"
        >
          <Boundary>
            <HeroScene />
          </Boundary>
        </motion.div>
      )}
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent"
        aria-hidden="true"
      />
      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-24 md:px-16">
        <TextReveal
          as="h1"
          delay={0.4}
          text="Spaces That Inspire. Homes That Endure."
          className="max-w-4xl font-display text-5xl leading-[1.02] md:text-8xl"
        />
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-6 max-w-xl text-base text-bone/75 md:text-lg"
        >
          We create exceptional spaces where thoughtful architecture, lasting
          value, and modern living come together.
        </motion.p>
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <a
            href="#properties"
            className="bg-blue-500 px-7 py-4 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Explore Our Properties
          </a>
          <a
            href="#inquiry"
            className="border border-bone/40 px-7 py-4 text-sm transition hover:border-gold hover:text-gold"
          >
            Schedule a Consultation
          </a>
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-6 right-6 z-10 md:right-16"
        animate={reduce ? {} : { y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.4 }}
        aria-hidden="true"
      >
        <ChevronDown className="text-gold" />
      </motion.div>
    </section>
  );
}
