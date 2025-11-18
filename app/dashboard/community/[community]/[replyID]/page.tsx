import GroupThread from "@/components/pages/Dashboard/Community/ReplyThread";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Replies - TechAdvantage",
};
const page = () => {
  return <GroupThread />;
};

export default page;
