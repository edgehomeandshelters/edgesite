import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import FeaturedProperties from "@/components/sections/FeaturedProperties";
import ProjectsSection from "@/components/sections/ProjectsSection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import StatsSection from "@/components/sections/StatsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import InquirySection from "@/components/sections/InquirySection";
import FinalCTA from "@/components/sections/FinalCTA";
export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <FeaturedProperties />
        <ProjectsSection />
        <WhyChooseUs />
        <StatsSection />
        <TestimonialsSection />
        <InquirySection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
