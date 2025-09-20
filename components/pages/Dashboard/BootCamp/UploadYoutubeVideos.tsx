"use client";
import HeaderTitle from "@/components/bootcamp/HeaderTitle";
import DropdownAndLinks from "@/components/discoverStrength/DropdownAndLinks";
import { ShowVideos } from "@/components/discoverStrength/VideoUpload/ShowVideos";
import { VideoUploads } from "@/components/discoverStrength/VideoUpload/VideoUploads";

const YoutubeVideo = () => {
  const videoRanges = [
    {
      label: "Range - 1-5",
      videos: 3,
      videosData: [
        {
          thumbnail: "https://i.ibb.co.com/w5V5NNG/youtube-video.png",
          title: "How to Build a Website",
          url: "https://www.youtube.com/watch?v=AMiX4ybJLDM",
        },
        {
          thumbnail: "https://i.ibb.co.com/w5V5NNG/youtube-video.png",
          title: "Introduction to React",
          url: "https://www.youtube.com/watch?v=ZLxOUw2ougo",
        },
        {
          thumbnail: "https://i.ibb.co.com/w5V5NNG/youtube-video.png",
          title: "Mastering JavaScript Basics",
          url: "https://www.youtube.com/watch?v=MG9tI5QCbtM",
        },
      ],
    },
    {
      label: "Range - 6-10",
      videos: 3,

      videosData: [
        {
          thumbnail: "https://i.ibb.co.com/w5V5NNG/youtube-video.png",
          title: "Mastering JavaScript Basics",
          url: "https://www.youtube.com/watch?v=iWuEpnTTD3k",
        },
        {
          thumbnail: "https://i.ibb.co.com/w5V5NNG/youtube-video.png",
          title: "How to Build a Website",
          url: "https://www.youtube.com/watch?v=AMiX4ybJLDM",
        },
        {
          thumbnail: "https://i.ibb.co.com/w5V5NNG/youtube-video.png",
          title: "Introduction to React",
          url: "https://www.youtube.com/watch?v=fqySz1Me2pI",
        },
      ],
    },
    {
      label: "Range - 11-15",
      videos: 3,
      videosData: [
        {
          thumbnail: "https://i.ibb.co.com/w5V5NNG/youtube-video.png",
          title: "How to Build a Website",
          url: "https://www.youtube.com/watch?v=WhIN4umuWpg",
        },
        {
          thumbnail: "https://i.ibb.co.com/w5V5NNG/youtube-video.png",
          title: "Mastering JavaScript Basics",
          url: "https://www.youtube.com/watch?v=K2hHOAtkwwk",
        },
        {
          thumbnail: "https://i.ibb.co.com/w5V5NNG/youtube-video.png",
          title: "Introduction to React",
          url: "https://www.youtube.com/watch?v=ZLxOUw2ougo",
        },
      ],
    },
  ];
  return (
    <div className="px-10">
      <div className="flex justify-between gap-8 ">
        <HeaderTitle />
        <DropdownAndLinks
          initialOption="Youtube's Video" // The starting selected option in the dropdown
          options={[
            { label: "Admin’s Video", route: "/dashboard/boot-camp" },
            {
              label: "Udemy’s Video",
              route: "/dashboard/boot-camp/upload-udemy-videos",
            },
            {
              label: "Youtube’s Video",
              route: "/dashboard/boot-camp/upload-youtube-videos",
            },
          ]}
          staticLabel="Upload Solo Video" // Optional: Customizes the static button/label on the left
          staticLabel2="Upload Playlist Video"
        />
      </div>
      <ShowVideos title={"Youtube"} videoRanges={videoRanges} />
      <VideoUploads />
    </div>
  );
};

export default YoutubeVideo;
