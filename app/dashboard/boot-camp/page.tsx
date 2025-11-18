import BootCamp from "@/components/pages/Dashboard/BootCamp/BootCamp";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Boot Camp - TechAdvantage",
};
const page = () => {
  return <BootCamp />;
};

export default page;
