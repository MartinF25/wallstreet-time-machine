import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./sprint.css";
import "./campaign.css";
import "./feel.css";
import "./intelligence.css";
import "./agents.css";
import "./identity.css";
import "./identity-overrides.css";
import "./era-identity.css";
import "./era-preview.css";
import "./trading.css";
import "./game-hud.css";
import "./character-foundation.css";
import "./information-rumor.css";
import "./rivals.css";
import "./round-experience.css";
import "./office.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wall Street: Time Machine",
  description: "Survive 125 years of markets.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
