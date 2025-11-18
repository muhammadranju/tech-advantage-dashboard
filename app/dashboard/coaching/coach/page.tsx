import CoachBooking from "@/components/pages/Dashboard/Coaching/CoachBooking";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Coaching Coach - TechAdvantage",
};
const page = () => {
  return <CoachBooking />;
};

export default page;
