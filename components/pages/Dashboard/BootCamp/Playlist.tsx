/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import VideoCardSkeleton from "@/components/skeletons/VideoCardSkeleton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreatePlaylistMutation,
  useGetPlaylistsQuery,
} from "@/lib/redux/features/api/bootCamp/bootCampSliceApi";
import { Plus, Save, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import BackButtons from "./BackButtons";

interface Playlist {
  _id: any;
  title: string;
}

function UploadPlaylist() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [createPlaylist, { isLoading: isCreatingPlaylist }] =
    useCreatePlaylistMutation();
  const { data: playlistsData, isLoading } = useGetPlaylistsQuery(null);

  const handleSubmit = async () => {
    try {
      const result = await createPlaylist({
        body: {
          title: title,
        },
      }).unwrap();

      if (result.success) {
        toast.success("Playlist created successfully");
        setTitle("");
        setOpen(false);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message || "Failed to create playlist");
    }
  };

  useEffect(() => {
    if (playlistsData?.data) {
      setPlaylists(playlistsData.data);
    }
  }, [playlistsData]);

  return (
    <div className="mx-auto px-10">
      <BackButtons backTitle="Bootcamp" title={"Playlists"} />
      {/* Create Playlist Form */}
      <div className="flex justify-between gap-x-10 items-center mb-5">
        <h1 className="text-3xl font-bold text-neutral-900">All Playlists</h1>
        <Button
          onClick={() => setOpen(true)}
          className="bg-black text-white px-6 py-6 rounded-md hover:bg-gray-800"
        >
          <Plus /> Create Playlist
        </Button>
      </div>

      {/* Video Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <VideoCardSkeleton range={8} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {playlists.map((video, index) => (
            <Link
              key={index}
              href={`/dashboard/boot-camp/playlist/${video?._id}`}
            >
              <div className="flex flex-col items-start">
                <Image
                  src={`https://images.unsplash.com/photo-1616356607338-fd87169ecf1a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                  alt={video.title}
                  width={400}
                  height={250}
                  className="rounded-lg shadow-md mb-2"
                />
                <p className="text-base font-bold text-neutral-800">
                  {video.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Playlist Title</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="title"
                placeholder="Enter your title"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                <X />
                Close
              </Button>
            </DialogClose>
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={isCreatingPlaylist}
            >
              {isCreatingPlaylist ? (
                <>
                  <ClipLoader color="#fff" size={20} />
                </>
              ) : (
                <>
                  <Save className="" />
                  Save
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UploadPlaylist;
