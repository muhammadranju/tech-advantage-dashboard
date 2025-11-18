import SmallBusinessPage from "@/components/pages/Dashboard/SmallBusiness/SmallBusiness";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Small Business - TechAdvantage",
};

const page = () => {
  return <SmallBusinessPage />;
};

export default page;
