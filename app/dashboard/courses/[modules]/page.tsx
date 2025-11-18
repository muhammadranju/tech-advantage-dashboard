import ModulesPage from "@/components/pages/Dashboard/Course/ModulesPage";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Modules - TechAdvantage",
};
const page = () => {
  return <ModulesPage />;
};

export default page;
