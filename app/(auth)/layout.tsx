import { Metadata } from "next";
import { Toaster } from "sonner";

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
    <div className="min-h-screen grid place-items-center">
      <div className="w-full  bg-white ">
        <Toaster position="bottom-right" />
        {children}
      </div>
    </div>
  );
}
