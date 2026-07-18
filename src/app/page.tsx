import type { Metadata } from "next";
import Hero from "@/components/sections/home/Hero";
import FeaturedWorks from "@/components/sections/home/FeaturedWorks";
import ServicesSection from "@/components/sections/home/ServicesSection";
import BehindTheLens from "@/components/sections/home/BehindTheLens";
import Testimonials from "@/components/sections/home/Testimonials";
import CallToAction from "@/components/sections/home/CallToAction";

export const metadata: Metadata = {
  title: "Shodiq Visual — Every Frame Tells a Story",
  description:
    "Studio videografi dan fotografi premium di Jakarta. Kami mengabadikan setiap cerita dalam frame-frame yang penuh makna.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedWorks />
      <ServicesSection />
      <BehindTheLens />
      <Testimonials />
      <CallToAction />
    </>
  );
}
