import ChangePassword from "@/components/pages/profile/ChangePassword";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Change Password - TechAdvantage",
};

const ChangePasswordPage = () => {
  return (
    <div className="min-h-screen bg-neutral-50 ">
      <ChangePassword />
    </div>
  );
};

export default ChangePasswordPage;
