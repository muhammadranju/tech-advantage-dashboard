import AssessmentPage from "@/components/pages/Dashboard/SmallBusiness/Assessment";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Small Business Assessment - TechAdvantage",
};

const page = () => {
  return <AssessmentPage />;
};

export default page;
