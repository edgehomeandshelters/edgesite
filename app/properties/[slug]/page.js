import Link from "next/link";
import { notFound } from "next/navigation";
import { Bed, Bath, Building2, Check } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PropertyGallery from "@/components/ui/PropertyGallery";
import InquirySection from "@/components/sections/InquirySection";
import { properties, getProperty } from "@/data/properties";
import { naira } from "@/lib/utils";

export const generateStaticParams = () =>
  properties.map((p) => ({ slug: p.slug }));
export async function generateMetadata({ params }) {
  const p = getProperty((await params).slug);
  return p
    ? {
        title: p.name,
        description: `${p.type} in ${p.location}. ${p.description}`,
      }
    : {};
}
export default async function PropertyPage({ params }) {
  const p = getProperty((await params).slug);
  if (!p) notFound();
  const others = properties.filter((o) => o.slug !== p.slug);
  const specs = [
    [Building2, p.type],
    p.bedrooms && [Bed, `${p.bedrooms} bedrooms`],
    p.bathrooms && [Bath, `${p.bathrooms} bathrooms`],
  ].filter(Boolean);
  return (
    <>
      <Navbar />
      <main>
        <header className="px-6 bg-ink pb-14 pt-36 text-bone md:px-16">
          <Link
            href="/#properties"
            className="text-sm text-green-500 hover:underline"
          >
            ← All properties
          </Link>
          <h1 className="mt-4 text-5xl font-display md:text-8xl">{p.name}</h1>
          <p className="mt-3 text-bone/70">{p.location}</p>
        </header>
        <section className="grid gap-12 px-6 py-16 md:px-16 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <PropertyGallery name={p.name} images={p.images} />
            <h2 className="text-4xl mt-14 font-display">About this property</h2>
            <p className="max-w-2xl mt-4 text-ink/80">{p.description}</p>
            <h2 className="mt-12 text-4xl font-display">Features</h2>
            <ul className="grid gap-3 mt-4 sm:grid-cols-2">
              {p.features.map((f, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 pb-3 border-b border-ink/15"
                >
                  <Check
                    className="w-4 h-4 text-green-500 shrink-0"
                    aria-hidden="true"
                  />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <aside className="p-8 border h-fit border-ink/20 lg:sticky lg:top-24">
            <span
              className={`inline-block px-3 py-1 text-xs ${p.status === "Available" ? "bg-green-500 text-white" : "bg-ink text-bone"}`}
            >
              {p.status}
            </span>
            <p className="mt-4 text-4xl font-display">{naira(p.priceNGN)}</p>
            <ul className="mt-6 space-y-3 text-sm">
              {specs.map(([Icon, t]) => (
                <li key={t} className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-green-500" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
            <a
              href="#inquiry"
              className="block py-4 mt-8 text-sm text-center transition bg-blue-500 text-bone hover:bg-gold hover:text-ink"
            >
              Enquire about this property
            </a>
          </aside>
        </section>
        <InquirySection defaultProperty={p.name} />
        {others.length > 0 && (
          <section className="px-6 pb-24 md:px-16">
            <h2 className="text-4xl font-display">More properties</h2>
            <ul className="grid gap-4 mt-6 md:grid-cols-2">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/properties/${o.slug}`}
                    className="block p-6 transition border border-ink/20 hover:border-gold"
                  >
                    <span className="text-2xl font-display">{o.name}</span>
                    <span className="block mt-1 text-sm text-clay">
                      {o.location} · {naira(o.priceNGN)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
