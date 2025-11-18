import CoursePage from "@/components/pages/Dashboard/Course/CoursePage";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Courses - TechAdvantage",
};
const page = () => {
  return <CoursePage />;
};

export default page;
