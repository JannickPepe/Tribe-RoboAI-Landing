import { Header } from "@/sections/Header";
import { Hero } from "@/sections/Hero";
import { Companies } from "@/sections/Companies";
import { Features } from "@/sections/Features";
import { Pricing } from "@/sections/Pricing";
import { Testimonials } from "@/sections/Testimonials";
import { CallToAction } from "@/sections/CallToAction";
import { Footer } from "@/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Companies />
      <Features />
      <Pricing />
      <Testimonials />
      <CallToAction />
      <Footer />
    </>
  );
}
