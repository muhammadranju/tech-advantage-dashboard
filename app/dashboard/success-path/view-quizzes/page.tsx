import QuizzesPage from "@/components/pages/Dashboard/SuccessPath/ViewQuizzes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - TechAdvantage",
};

const page = () => {
  return <QuizzesPage />;
};

export default page;
