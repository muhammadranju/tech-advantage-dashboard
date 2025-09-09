import DropdownAndLinks from "@/components/discoverStrength/DropdownAndLinks";
import { VideoUploads } from "@/components/discoverStrength/VideoUpload/VideoUploads";

// import { VideoUpload } from "@/components/discoverStrength/VideoUpload";

const UdemyVideo = () => {
  const videoRanges = [
    {
      label: "Range - 1-5",
      videos: 3,
      videosData: [
        {
          thumbnail: "https://i.ytimg.com/vi/AMiX4ybJLDM/hqdefault.jpg",
          title: "How to Build a Website",
          url: "https://www.youtube.com/watch?v=AMiX4ybJLDM",
        },
        {
          thumbnail: "https://i.ytimg.com/vi/AMiX4ybJLDM/hqdefault.jpg",
          title: "Introduction to React",
          url: "https://www.youtube.com/watch?v=6FzGQfS4m3Q",
        },
        {
          thumbnail: "https://i.ytimg.com/vi/AMiX4ybJLDM/hqdefault.jpg",
          title: "Mastering JavaScript Basics",
          url: "https://www.youtube.com/watch?v=V9P5lZhy1I8",
        },
      ],
    },
    {
      label: "Range - 6-10",
      videos: 3,

      videosData: [
        {
          thumbnail: "https://i.ytimg.com/vi/AMiX4ybJLDM/hqdefault.jpg",
          title: "CSS Flexbox Explained",
          url: "https://www.youtube.com/watch?v=tc6HkHXYFgQ",
        },
        {
          thumbnail: "https://i.ytimg.com/vi/AMiX4ybJLDM/hqdefault.jpg",
          title: "Building REST APIs with Node.js",
          url: "https://www.youtube.com/watch?v=sT1ftz89hFs",
        },
        {
          thumbnail: "https://i.ytimg.com/vi/AMiX4ybJLDM/hqdefault.jpg",
          title: "Getting Started with TypeScript",
          url: "https://www.youtube.com/watch?v=5yRZrk3y9gY",
        },
      ],
    },
    {
      label: "Range - 11-15",
      videos: 3,
      videosData: [
        {
          thumbnail: "https://i.ytimg.com/vi/AMiX4ybJLDM/hqdefault.jpg",
          title: "Understanding Git and GitHub",
          url: "https://www.youtube.com/watch?v=hbQs1rYggtM",
        },
        {
          thumbnail: "https://i.ytimg.com/vi/AMiX4ybJLDM/hqdefault.jpg",
          title: "Responsive Web Design with Bootstrap",
          url: "https://www.youtube.com/watch?v=xZ5xZkJ4Jzg",
        },
        {
          thumbnail: "https://i.ytimg.com/vi/AMiX4ybJLDM/hqdefault.jpg",
          title: "Advanced JavaScript Techniques",
          url: "https://www.youtube.com/watch?v=jjQ2H5dPYak",
        },
      ],
    },
  ];
  return (
    <div className="px-10">
      <DropdownAndLinks setActiveTab={"Udemy’s Video"} />
      <VideoUploads title={"Udemy"} videoRanges={videoRanges} />
    </div>
  );
};

export default UdemyVideo;
