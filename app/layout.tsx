import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RaceFuelPlan - Personalized Race Fueling Plans for Runners",
  description: "Generate science-backed fueling plans for your race day. Optimize your nutrition strategy for half marathons, marathons, and ultras.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
