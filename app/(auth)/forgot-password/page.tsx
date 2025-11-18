import ForgotPassword from "@/components/pages/auth/ForgotPasswordPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password - TechAdvantage",
  description: "Forgot Password",
  openGraph: {
    title: "Forgot Password - TechAdvantage",
    description: "Forgot Password",
    url: "https://www.techadvantage.com/auth/forgot-password",
    images: [
      {
        url: "https://www.techadvantage.com/images/auth/forgot-password.png",
        width: 1200,
        height: 630,
        alt: "Forgot Password",
      },
    ],
    siteName: "TechAdvantage",
  },
};

const page = () => {
  return (
    <div>
      <ForgotPassword />
    </div>
  );
};

export default page;
