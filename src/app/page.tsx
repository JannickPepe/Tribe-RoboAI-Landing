import { Hero } from "@/sections/Hero";
import { Companies } from "@/sections/Companies";
import { Features } from "@/sections/Features";
import { Pricing } from "@/sections/Pricing";
import { Testimonials } from "@/sections/Testimonials";
import { CallToAction } from "@/sections/CallToAction";

export const metadata = {
  title: 'AI Landing Page | By NighteCoding',
  description:
    'Welcome to AI Landing Page. Discover amazing AI tools and resources to elevate your projects.',
  robots: 'index, follow',
  openGraph: {
    title: 'AI Landing Page | Your Site Name',
    description:
      'Welcome to AI Landing Page. Discover amazing AI tools and resources to elevate your projects.',
    url: 'https://jptribe-ai-landing.vercel.app',
    siteName: 'AI Landing Page',
    images: [
      {
        url: '/assets/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Landing Page preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Companies />
      <Features />
      <Pricing />
      <Testimonials />
      <CallToAction />
    </>
  );
}
