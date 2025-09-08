import DropdownAndLinks from "@/components/discoverStrength/DropdownAndLinks";
import { VideoUploads } from "@/components/discoverStrength/VideoUpload/VideoUploads";

const YoutubeVideo = () => {
  const videoRanges = [
    { label: "Range - 1-5", videos: 3 },
    { label: "Range - 6-10", videos: 3 },
    { label: "Range - 11-15", videos: 3 },
  ];
  return (
    <div className="px-10">
      <DropdownAndLinks setActiveTab={"Youtube’s Video"} />
      <VideoUploads title={"Youtube"} videoRanges={videoRanges} />
    </div>
  );
};

export default YoutubeVideo;
