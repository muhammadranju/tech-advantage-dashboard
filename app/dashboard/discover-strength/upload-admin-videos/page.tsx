import DropdownAndLinks from "@/components/discoverStrength/DropdownAndLinks";
import { VideoUploadComponent } from "@/components/discoverStrength/VideoUpload/VideoUploadComponent";
import { VideoUploads } from "@/components/discoverStrength/VideoUpload/VideoUploads";

const AdminVideo = () => {
  const videoRanges = [
    { label: "Range - 1-5", videos: 3 },
    { label: "Range - 6-10", videos: 3 },
    { label: "Range - 11-15", videos: 3 },
  ];
  return (
    <div className="px-10">
      <DropdownAndLinks setActiveTab={"Udemy’s Video"} />
      <VideoUploads title={"Admin"} videoRanges={videoRanges} />
      <VideoUploadComponent />
    </div>
  );
};

export default AdminVideo;
