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
      className="py-24 overflow-hidden bg-ink text-bone md:flex md:h-screen md:flex-col md:justify-center md:py-0"
    >
      <h2
        ref={title}
        className="px-6 text-6xl whitespace-nowrap font-display md:px-16 md:text-9xl"
      >
        Signature Projects
      </h2>
      <ul
        ref={track}
        className="flex flex-col gap-10 px-6 mt-12 md:w-max md:flex-row md:gap-8 md:px-16"
      >
        {projects.map((p) => (
          <li key={p.id} className="md:w-[min(46vw,640px)] md:shrink-0">
            <div className="relative grid aspect-[16/10] place-items-center bg-clay/25 text-sm text-bone/60">
              {p.image ? (
                <img
                  src={p.image}
                  alt={p.title}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-clay/50">
                  <span className="text-sm text-bone/60">Image not available</span>
                </div>
              )}
              <span className="absolute px-3 py-1 text-xs left-4 top-4 bg-gold text-ink">
                {p.status}
              </span>
            </div>
            <h3 className="mt-4 text-3xl font-display">{p.title}</h3>
            <p className="text-sm text-bone/65">{p.location}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
