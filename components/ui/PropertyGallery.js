"use client";
import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
export default function PropertyGallery({ name, images }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const items = images.length ? images : [null, null, null, null]; // placeholders until real images exist
  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden bg-clay/25">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            className="absolute inset-0"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {items[i] ? (
              <Image
                src={items[i]}
                alt={`${name}, view ${i + 1}`}
                fill
                priority={i === 0}
                sizes="(min-width:1024px) 60vw,100vw"
                className="object-cover"
              />
            ) : (
              <div className="grid h-full place-items-center text-sm text-clay">
                Image placeholder {i + 1}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <ul className="mt-3 grid grid-cols-4 gap-3">
        {items.map((src, n) => (
          <li key={n}>
            <button
              onClick={() => setI(n)}
              aria-label={`Show view ${n + 1}`}
              aria-current={n === i}
              className={`relative block aspect-[4/3] w-full overflow-hidden bg-clay/20 ring-offset-2 ${n === i ? "ring-2 ring-gold" : "opacity-70 hover:opacity-100"}`}
            >
              {src && (
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="15vw"
                  className="object-cover"
                />
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
