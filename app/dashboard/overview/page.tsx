import OverviewPage from "@/components/pages/Dashboard/Overview/Overview";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Overview - TechAdvantage",
};

const page = () => {
  return <OverviewPage />;
};

export default page;
