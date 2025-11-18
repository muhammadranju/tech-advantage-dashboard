import MockInterviewViewAnswersPage from "@/components/pages/Dashboard/MockInterview/MockInterviewViewAnswersPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mock Interview View Answers - TechAdvantage",
};

const page = () => {
  return <MockInterviewViewAnswersPage />;
};

export default page;
