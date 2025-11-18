import ChangePhoto from "@/components/pages/profile/ChangePhoto";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Change Photo - TechAdvantage",
};
const page = () => {
  return (
    <div className="min-h-screen bg-neutral-50 ">
      <ChangePhoto />
    </div>
  );
};

export default page;
