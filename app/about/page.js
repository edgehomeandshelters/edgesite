import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TextReveal from "@/components/animations/TextReveal";
import AboutSection from "@/components/sections/AboutSection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import FinalCTA from "@/components/sections/FinalCTA";
export const metadata = {
  title: "About Us",
  description: "Our vision, expertise and approach to property development.",
};
export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <header className="bg-ink px-6 pb-20 pt-40 text-bone md:px-16">
          <TextReveal
            as="h1"
            text="About Us"
            className="font-display text-6xl md:text-9xl"
          />
        </header>
        <AboutSection full />
        <WhyChooseUs />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
