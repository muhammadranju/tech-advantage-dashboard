import TermsConditions from "@/components/pages/Dashboard/TermsConditions/TermsConditions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions - TechAdvantage",
};

const page = () => {
  return <TermsConditions />;
};

export default page;
