import { LoginPage } from "@/components/pages/auth/login";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Login - TechAdvantage",
  description: "Login",
  openGraph: {
    title: "Login - TechAdvantage",
    description: "Login",
    url: "https://www.techadvantage.com/auth/login",
    images: [
      {
        url: "https://www.techadvantage.com/images/auth/login.png",
        width: 1200,
        height: 630,
        alt: "Login",
      },
    ],
    siteName: "TechAdvantage",
  },
};
const page = () => {
  return (
    <div>
      <LoginPage />
    </div>
  );
};

export default page;
