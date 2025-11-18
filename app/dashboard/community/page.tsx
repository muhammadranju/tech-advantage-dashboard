import CommunityPage from "@/components/pages/Dashboard/Community/Community";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Community - TechAdvantage",
};
const page = () => {
  return <CommunityPage />;
};

export default page;
