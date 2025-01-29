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
  title: 'AI Landing Sass',
  description: 'Created by NighteCoding',
  openGraph: {
      type: 'website',
      url: 'https://jptribe-ai-landing.vercel.app/',
      title: 'AI Landing - by NighteCoding',
      description: 'NighteCoding provides stable and highend solutions',
      images: [
          {
          url: 'https://jptribe-ai-landing.vercel.app/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'AI Landing by NighteCoding',
          },
      ],
  },
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
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
