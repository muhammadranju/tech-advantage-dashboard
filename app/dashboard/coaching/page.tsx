import CoachingPage from "@/components/pages/Dashboard/Coaching/Coaching";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Coaching - TechAdvantage",
};
const page = () => {
  return <CoachingPage />;
};

export default page;
