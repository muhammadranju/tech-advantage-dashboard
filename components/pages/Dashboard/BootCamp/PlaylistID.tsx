"use client";

import VideoCardSkeleton from "@/components/skeletons/VideoCardSkeleton";
import { Button } from "@/components/ui/button";
import {
  useAddVideosToPlaylistMutation,
  useGetBootCampQuery,
  useGetSinglePlaylistQuery,
} from "@/lib/redux/features/api/bootCamp/bootCampSliceApi";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import BackButtons from "./BackButtons";
import { ClipLoader } from "react-spinners";

interface Video {
  _id: string;
  title: string;
  filename: string;
  filepath: string;
  url: string;
  category: string;
  mark: number;
  duration: number;
  views: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Playlist {
  _id: string;
  title: string;
  videos: Video[];
}

function SinglePlaylist() {
  const params = useParams<{ playlistID: string }>();
  const playlistID = params.playlistID as string;
  const [selected, setSelected] = useState<Set<number>>(new Set<number>());
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);

  const { data: playlistData, isLoading } = useGetSinglePlaylistQuery({
    playlistID,
  });
  const { data: videosData } = useGetBootCampQuery({
    playlistID,
  });

  const [addVideosToPlaylist, { isLoading: isAddingVideos }] =
    useAddVideosToPlaylistMutation();

  const handleAddVideos = async () => {
    const selectedVideos = Array.from(selected).map(
      (index) => videos[index]._id
    );
    try {
      const result = await addVideosToPlaylist({
        playlistID,
        body: {
          videos: selectedVideos,
        },
      }).unwrap();
      if (result.success) {
        toast.success("Videos added successfully!");
        setSelected(new Set<number>()); // Optional: clear selection after adding
      }
    } catch (error) {
      console.log("Failed to add videos to playlist:", error);
      toast.error("Failed to add videos to playlist");
    }
  };

  useEffect(() => {
    if (playlistData?.data && videosData?.data) {
      setVideos(videosData.data);
      setPlaylist(playlistData.data);
    }
  }, [playlistData, videosData]);

  return (
    <div className="mx-auto px-10 ">
      <BackButtons backTitle="Playlists" title={playlist?.title || ""} />

      {/* Create Playlist Form */}
      <div className="flex justify-between gap-x-10 items-center mb-1">
        <h1 className="text-3xl font-bold text-neutral-900 ">
          {playlist?.title || ""}
        </h1>
      </div>

      {/* Top Image */}
      <div className="flex justify-start mb-8">
        <Image
          src="https://images.unsplash.com/photo-1616356607338-fd87169ecf1a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt={playlist?.title || ""}
          width={450}
          height={240}
          className="rounded-lg shadow-md"
        />
      </div>

      {/* Video Grid */}
      <div className="flex justify-end gap-x-10 items-center ">
        {selected.size > 0 && (
          <Button
            onClick={handleAddVideos}
            className="bg-black text-white px-6 py-6  rounded-md hover:bg-gray-800 mb-3"
            disabled={isAddingVideos}
          >
            <Plus /> Add Videos{" "}
            {isAddingVideos && <ClipLoader color="#fff" size={20} />}
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {isLoading ? (
          <VideoCardSkeleton range={8} />
        ) : (
          videos.map((video, index) => (
            <div key={video._id} className="flex flex-col items-start">
              <div
                className={`relative w-full cursor-pointer rounded-lg shadow-md mb-2 border-4 ${
                  selected.has(index) ? "border-blue-500" : "border-transparent"
                }`}
                onClick={() => {
                  const newSelected = new Set(selected);
                  if (selected.has(index)) {
                    newSelected.delete(index);
                  } else {
                    newSelected.add(index);
                  }
                  setSelected(newSelected);
                }}
              >
                <Image
                  src={
                    video.category === "youtube"
                      ? "https://i.ibb.co.com/w5V5NNG/youtube-video.png"
                      : "https://i.ibb.co.com/PGvv15RY/udemy-video.png"
                  }
                  alt={video.title}
                  width={400}
                  height={250}
                  className={`rounded-lg object-cover ${
                    selected.has(index) ? "blur-sm" : ""
                  }`}
                />
              </div>
              <p className="text-base font-bold text-neutral-800">
                {video.title}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SinglePlaylist;
