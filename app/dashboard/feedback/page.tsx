import FeedbackPage from "@/components/pages/Dashboard/Feedback/FeedbackPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feedback - TechAdvantage",
};

const page = () => {
  return <FeedbackPage />;
};

export default page;
