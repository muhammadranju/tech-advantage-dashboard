import type { Metadata } from "next";
import { Inter, Source_Code_Pro } from "next/font/google"; // Importing Inter and Source Code Pro
import "./globals.css";
import StoreProvider from "@/lib/redux/provider";
import { Toaster } from "sonner";

// Importing the Inter font
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

// Importing a monospace font (Source Code Pro as an example)
const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard Overview - TechAdvantage",
  description: "Dashboard Overview",
  openGraph: {
    title: "Dashboard Overview - TechAdvantage",
    description: "Dashboard Overview",
    url: "https://www.techadvantage.com/dashboard/overview",
    images: [
      {
        url: "https://www.techadvantage.com/images/dashboard/overview.png",
        width: 1200,
        height: 630,
        alt: "Dashboard Overview",
      },
    ],
    siteName: "TechAdvantage",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${sourceCodePro.variable} antialiased`}
      >
        <StoreProvider>{children}</StoreProvider>
        <Toaster />
      </body>
    </html>
  );
}
