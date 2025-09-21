import type { Metadata } from "next";
import { Inter, Source_Code_Pro } from "next/font/google"; // Importing Inter and Source Code Pro
import "./globals.css";

// Importing the Inter font
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

// Importing a monospace font (Source Code Pro as an example)
const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TechAdvantage - Dashboard Overview",
  description: "Dashboard Overview",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${sourceCodePro.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
