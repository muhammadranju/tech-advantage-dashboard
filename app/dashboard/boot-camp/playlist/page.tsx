import UploadPlaylist from "@/components/pages/Dashboard/BootCamp/Playlist";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Boot Camp Playlist - TechAdvantage",
};
const page = () => {
  return <UploadPlaylist />;
};

export default page;
