import UserPage from "@/components/pages/Dashboard/Users/Users";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users - TechAdvantage",
};

const page = () => {
  return <UserPage />;
};

export default page;
