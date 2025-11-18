import BusinessPlanning from "@/components/pages/Dashboard/BusinessPlanning/BusinessPlanning";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Planning - TechAdvantage",
};
const page = () => {
  return <BusinessPlanning />;
};

export default page;
