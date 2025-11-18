import CourseModulesPage from "@/components/pages/Dashboard/Course/CourseModulesPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Module Video - TechAdvantage",
};
const Module = () => {
  return <CourseModulesPage />;
};

export default Module;
