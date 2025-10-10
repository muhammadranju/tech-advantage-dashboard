import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Header } from "@/components/dashboard/Header";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard Overview - TechAdvantage",
  description: "Dashboard Overview",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable}`}>
      <SidebarProvider className="bg-neutral-100">
        <AppSidebar />
        <SidebarInset>
          <div className="flex-1 flex flex-col overflow-hidden bg-neutral-100">
            <Header />
            <main className="flex-1 overflow-y-auto p-6 ">
              <div className=" mx-auto space-y-6  bg-white p-6 mt-16 rounded-xl shadow-[0_0px_6px_rgba(0,_0,_0,_0.2)]">
                <ProtectedRoute>{children}</ProtectedRoute>
                <Toaster />
              </div>
            </main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
 