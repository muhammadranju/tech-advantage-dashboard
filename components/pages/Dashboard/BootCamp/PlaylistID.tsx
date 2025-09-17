"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const videos = [
  { title: "Success path Coaching" },
  { title: "Small business Coaching" },
  { title: "Small business Coaching" },
  { title: "Success path Coaching" },
  { title: "Small business Coaching" },
  { title: "Small business Coaching" },
  { title: "Small business Coaching" },
  { title: "Small business Coaching" },
];

function SinglePlaylist() {
  const router = useRouter();
  const { playlistID: playlist } = useParams();

  const [selected, setSelected] = useState(new Set<number>());

  const handleAddVideos = () => {
    const selectedVideos = Array.from(selected).map((index) => ({
      title: videos[index].title,
    }));
    console.log(selectedVideos); // Send this array to your backend
    // Example: fetch('/api/add-videos', { method: 'POST', body: JSON.stringify(selectedVideos) });

    toast.success("Videos added successfully!");
    setSelected(new Set()); // Optional: clear selection after adding
  };

  return (
    <div className="mx-auto px-10 ">
      <div className="flex gap-8 mb-5">
        {/* </Link> */}
        <button
          onClick={() => router.push("/dashboard/boot-camp/playlist")}
          className={`pb-2 text-lg font-medium hover:border-b-2 border-black`}
        >
          Playlist&apos;s
        </button>
        <button className={`pb-2 text-lg font-medium  border-b-2 border-black`}>
          Success path Coaching - {playlist}
        </button>
      </div>
      {/* Create Playlist Form */}
      <div className="flex justify-between gap-x-10 items-center mb-1">
        <h1 className="text-3xl font-bold text-neutral-900 ">
          Success path Coaching
        </h1>
      </div>

      {/* Top Image */}
      <div className="flex justify-start mb-14">
        <Image
          src="https://images.unsplash.com/photo-1616356607338-fd87169ecf1a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="AMIN Monitor"
          width={450}
          height={240}
          className="rounded-lg shadow-md"
        />
      </div>

      {/* Video Grid */}
      <div className="flex justify-end gap-x-10 items-center mb-3">
        {selected.size > 0 && (
          <Button
            onClick={handleAddVideos}
            className="bg-black text-white px-6 py-6  rounded-md hover:bg-gray-800"
          >
            <Plus /> Add Videos
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {videos.map((video, index) => (
          <div key={index} className="flex flex-col items-start">
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
                src={`https://images.pexels.com/photos/708392/pexels-photo-708392.jpeg?cs=srgb&dl=pexels-helenalopes-708392.jpg&fm=jpg`}
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
        ))}
      </div>
    </div>
  );
}

export default SinglePlaylist;
