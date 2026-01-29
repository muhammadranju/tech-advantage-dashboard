import { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Auth - TechAdvantage",
  description: "Auth",
  openGraph: {
    title: "Auth - TechAdvantage",
    description: "Auth",
    url: "https://www.techadvantage.com/auth",
    images: [
      {
        url: "https://www.techadvantage.com/images/auth/auth.png",
        width: 1200,
        height: 630,
        alt: "Auth",
      },
    ],
    siteName: "TechAdvantage",
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen grid place-items-center bg-black">
        <div className="w-full">
          <Toaster />
          {children}
        </div>
      </div>
    </ThemeProvider>
  );
}
