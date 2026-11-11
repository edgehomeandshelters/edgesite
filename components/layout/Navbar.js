"use client";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { company } from "@/data/company";
const links = [
  ["Home", "/"],
  ["About Us", "/about"],
  ["Properties", "/#properties"],
  ["Our Projects", "/#projects"],
  ["Contact", "/#inquiry"],
];
export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setSolid(scrollY > 40);
    f();
    addEventListener("scroll", f, { passive: true });
    return () => removeEventListener("scroll", f);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${solid || open ? "bg-ink/80 backdrop-blur-md" : ""} text-bone`}
    >
      <nav
        aria-label="Primary"
        className="flex items-center justify-between px-6 py-4 md:px-16"
      >
        <a href="/" className="font-display text-2xl">
          {company.name}investment Nig.Ltd.
        </a>
        <ul className="hidden items-center gap-8 text-sm md:flex">
          {links.map(([l, h]) => (
            <li key={h}>
              <a href={h} className="hover:text-green-500">
                {l}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/#inquiry"
              className="bg-blue-500 px-5 py-3 font-medium text-white hover:bg-blue-700"
            >
              Book a Consultation
            </a>
          </li>
        </ul>
        <button
          className="p-3 md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      <div
        className={`grid transition-all duration-500 md:hidden ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <ul className="overflow-hidden px-6">
          {links.map(([l, h]) => (
            <li key={h}>
              <a
                onClick={() => setOpen(false)}
                href={h}
                className="block py-4 font-display text-2xl"
                tabIndex={open ? 0 : -1}
              >
                {l}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
