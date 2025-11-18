import VerifyOTP from "@/components/pages/auth/VerifyOTP";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify OTP - TechAdvantage",
};

const page = () => {
  return (
    <div>
      <VerifyOTP />
    </div>
  );
};

export default page;
