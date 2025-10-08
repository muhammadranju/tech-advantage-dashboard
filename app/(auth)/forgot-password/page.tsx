import ForgotPassword from "@/components/pages/auth/ForgotPasswordPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password - TechAdvantage",
};

const page = () => {
  return (
    <div>
      <ForgotPassword />
    </div>
  );
};

export default page;
