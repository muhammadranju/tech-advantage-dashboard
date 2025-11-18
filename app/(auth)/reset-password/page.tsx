import ResetPassword from "@/components/pages/auth/ResetPasswordPage";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Reset Password - TechAdvantage",
  description: "Reset Password",
  openGraph: {
    title: "Reset Password - TechAdvantage",
    description: "Reset Password",
    url: "https://www.techadvantage.com/auth/reset-password",
    images: [
      {
        url: "https://www.techadvantage.com/images/auth/reset-password.png",
        width: 1200,
        height: 630,
        alt: "Reset Password",
      },
    ],
    siteName: "TechAdvantage",
  },
};

const page = () => {
  return (
    <div>
      <ResetPassword />
    </div>
  );
};

export default page;
