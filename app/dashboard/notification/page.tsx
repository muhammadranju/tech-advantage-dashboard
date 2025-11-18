import NotificationsPage from "@/components/pages/Dashboard/Notification/Notification";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Notifications - TechAdvantage",
};

const page = () => {
  return <NotificationsPage />;
};

export default page;
