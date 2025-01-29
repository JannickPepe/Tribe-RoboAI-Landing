import type { Metadata } from "next";
import { Sora, Space_Grotesk } from "next/font/google";
import "./globals.css";

const soraFont = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: "variable",
});
const spaceGroteskFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: "variable",
});

export const metadata: Metadata = {
  title: 'JPTribe-AI-Landing | By NighteCoding',
  description:
    'Welcome to AI Landing Page. Discover amazing AI tools and resources to elevate your projects.',
  viewport: 'width=device-width, initial-scale=1',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${soraFont.variable} ${spaceGroteskFont.variable} antialiased bg-gray-950 text-gray-300 font-body`}
      >
        {children}
      </body>
    </html>
  );
}
