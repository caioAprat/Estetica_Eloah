import SmoothScroll from "@/components/SmoothScroll";
import LiquidFilters from "@/components/LiquidFilters";
import Preloader from "@/components/Preloader";
import ScrollUI from "@/components/ScrollUI";
import BackgroundLayer from "@/components/BackgroundLayer";
import Orbs from "@/components/Orbs";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Marquee from "@/components/Marquee";
import AboutSection from "@/components/AboutSection";
import PillarsSection from "@/components/PillarsSection";
import ServicesShowcase from "@/components/ServicesShowcase";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import BookingCalendar from "@/components/BookingCalendar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <LiquidFilters />
      <Preloader />
      <ScrollUI />
      <BackgroundLayer />
      <Header />
      <main className="relative">
        <Orbs />
        <HeroSection />
        <Marquee />
        <AboutSection />
        <PillarsSection />
        <ServicesShowcase />
        <ProcessSection />
        <TestimonialsSection />
        <FaqSection />
        <BookingCalendar />
      </main>
      <Footer />
    </>
  );
}
