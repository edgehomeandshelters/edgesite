"use client";
import { useEffect, useRef } from "react";
import { projects } from "@/data/projects";
export default function ProjectsSection() {
  const section = useRef(null),
    track = useRef(null),
    title = useRef(null);
  useEffect(() => {
    let mm,
      dead = false;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (dead) return;
      gsap.registerPlugin(ScrollTrigger);
      mm = gsap.matchMedia();
      // Desktop only; mobile and reduced-motion users get a normal vertical list.
      mm.add(
        "(min-width:768px) and (prefers-reduced-motion:no-preference)",
        () => {
          const dist = () =>
            Math.max(0, track.current.scrollWidth - window.innerWidth);
          gsap
            .timeline({
              scrollTrigger: {
                trigger: section.current,
                pin: true,
                scrub: 0.6,
                end: () => "+=" + dist(),
                invalidateOnRefresh: true,
              },
            })
            .to(track.current, { x: () => -dist(), ease: "none" }, 0)
            .to(title.current, { xPercent: -18, ease: "none" }, 0);
        },
      );
    })();
    return () => {
      dead = true;
      mm?.revert();
    };
  }, []);
  return (
    <section
      id="projects"
      ref={section}
      className="overflow-hidden bg-ink py-24 text-bone md:flex md:h-screen md:flex-col md:justify-center md:py-0"
    >
      <h2
        ref={title}
        className="whitespace-nowrap px-6 font-display text-6xl md:px-16 md:text-9xl"
      >
        Signature Projects
      </h2>
      <ul
        ref={track}
        className="mt-12 flex flex-col gap-10 px-6 md:w-max md:flex-row md:gap-8 md:px-16"
      >
        {projects.map((p) => (
          <li key={p.id} className="md:w-[min(46vw,640px)] md:shrink-0">
            <div className="relative grid aspect-[16/10] place-items-center bg-clay/25 text-sm text-bone/60">
              Image placeholder
              <span className="absolute left-4 top-4 bg-green-500 px-3 py-1 text-xs text-white">
                {p.status}
              </span>
            </div>
            <h3 className="mt-4 font-display text-3xl">{p.title}</h3>
            <p className="text-sm text-bone/65">{p.location}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
