/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import VideoCardSkeleton from "@/components/skeletons/VideoCardSkeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGetBootCampQuery } from "@/lib/redux/features/api/bootCamp/bootCampSliceApi";
import { Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface VideoRange {
  category: string;
  mark: number;
  title: string;
  url: string;
  _id: string;
  filename?: string;
  filepath?: string;
}

interface VideoUploadsProps {
  title: string;
}

export const ShowVideos = ({ title }: VideoUploadsProps) => {
  const { data, isLoading } = useGetBootCampQuery({});
  const [videos, setVideos] = useState<any>([]);

  useEffect(() => {
    if (data) {
      setVideos(data?.data || []);
    }
  }, [data]);

  // Filter by category first
  const filteredVideos = videos.filter(
    (video: VideoRange) => video.category === title
  );

  console.log("All videos:", videos);
  console.log("Filtered by category:", filteredVideos);

  // Separate videos by specific marks/ranges
  const range5Videos = filteredVideos.filter(
    (video: VideoRange) => video.mark == 5
  );
  const range10Videos = filteredVideos.filter(
    (video: VideoRange) => video.mark == 10
  );
  const range15Videos = filteredVideos.filter(
    (video: VideoRange) => video.mark == 15
  );

  const RenderVideoCard = ({ video }: { video: VideoRange }) => (
    <div key={video._id} className="space-y-2">
      <div className="relative group">
        <Image
          width={640}
          height={360}
          src={
            title === "youtube"
              ? "https://i.ibb.co.com/w5V5NNG/youtube-video.png"
              : "https://i.ibb.co.com/PGvv15RY/udemy-video.png"
          }
          alt={`${video.title || "Video"} - ${video._id || ""}`}
          className="w-full h-52 object-cover rounded-xl shadow-md"
        />
        <a href={video.url} target="_blank" rel="noreferrer">
          <Button
            variant="outline"
            size="lg"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white"
          >
            <Play className="h-6 w-6 fill-current" />
          </Button>
        </a>
      </div>
      <p className="font-semibold text-lg text-gray-800 line-clamp-2">
        {video.title}
      </p>
    </div>
  );

  return (
    <div className="mx-auto  space-y-8 bg-white p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900 capitalize">
        {title} Videos
      </h1>

      {/* Video Ranges */}
      <div className="space-y-8">
        {/* Range 5 Videos */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <VideoCardSkeleton />
          </div>
        ) : (
          ""
        )}
        {range5Videos.length > 0 && (
          <div className="space-y-4">
            <Badge
              variant="secondary"
              className="bg-white shadow border text-sm text-foreground hover:bg-muted "
            >
              Range: 1-5 Videos ({range5Videos.length})
            </Badge>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {range5Videos.map((video: VideoRange) => (
                <RenderVideoCard key={video._id} video={video} />
              ))}
            </div>
          </div>
        )}

        {/* Range 10 Videos */}
        {range10Videos.length > 0 && (
          <div className="space-y-4">
            <Badge
              variant="secondary"
              className="bg-white shadow border text-sm text-foreground hover:bg-muted "
            >
              Range: 6-10 Videos ({range10Videos.length})
            </Badge>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {range10Videos.map((video: VideoRange) => (
                <RenderVideoCard key={video._id} video={video} />
              ))}
            </div>
          </div>
        )}
        {/* Range 15 Videos */}
        {range15Videos.length > 0 && (
          <div className="space-y-4">
            <Badge
              variant="secondary"
              className="bg-white shadow border text-sm text-foreground hover:bg-muted "
            >
              Range: 11-15 Videos ({range15Videos.length})
            </Badge>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {range15Videos.map((video: VideoRange) => (
                <RenderVideoCard key={video._id} video={video} />
              ))}
            </div>
          </div>
        )}

        {/* No videos found message */}
        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No videos found for this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
