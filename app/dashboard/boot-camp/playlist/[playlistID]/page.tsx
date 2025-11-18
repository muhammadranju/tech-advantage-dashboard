import SinglePlaylist from "@/components/pages/Dashboard/BootCamp/PlaylistID";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Boot Camp Playlist - TechAdvantage",
};
const page = () => {
  return <SinglePlaylist />;
};

export default page;
