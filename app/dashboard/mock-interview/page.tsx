import MockInterview from "@/components/pages/Dashboard/MockInterview/MockInterview";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mock Interview - TechAdvantage",
};

const page = () => {
  return <MockInterview />;
};

export default page;
