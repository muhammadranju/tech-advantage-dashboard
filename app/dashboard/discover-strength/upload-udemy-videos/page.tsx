import DropdownAndLinks from "@/components/discoverStrength/DropdownAndLinks";
import { VideoUploads } from "@/components/discoverStrength/VideoUpload/VideoUploads";

// import { VideoUpload } from "@/components/discoverStrength/VideoUpload";

const UdemyVideo = () => {
  const videoRanges = [
    { label: "Range - 1-5", videos: 3 },
    { label: "Range - 6-10", videos: 3 },
    { label: "Range - 11-15", videos: 3 },
  ];
  return (
    <div className="px-10">
      <DropdownAndLinks setActiveTab={"Udemy’s Video"} />
      <VideoUploads title={"Udemy"} videoRanges={videoRanges} />
    </div>
  );
};

export default UdemyVideo;
