import ChangeName from "@/components/pages/profile/ChangeName";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Change Name - TechAdvantage",
};

const page = () => {
  return (
    <div className="min-h-screen bg-neutral-50 ">
      <ChangeName />
    </div>
  );
};

export default page;
