"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Save, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

function UploadPlaylist() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handelSubmit = () => {
    setOpen(false);
    console.log("Submitted");
  };

  return (
    <div className="mx-auto px-10 ">
      <div className="flex gap-8 mb-5">
        {/* </Link> */}
        <button
          onClick={() => router.push("/dashboard/boot-camp")}
          className={`pb-2 text-lg font-medium hover:border-b-2 border-black`}
        >
          Upload Solo Video
        </button>
        <button className={`pb-2 text-lg font-medium  border-b-2 border-black`}>
          Playlist&apos;s
        </button>
      </div>
      {/* Create Playlist Form */}
      <div className="flex justify-between gap-x-10 items-center mb-5">
        <h1 className="text-3xl font-bold text-neutral-900 ">All Playlists</h1>
        <Button
          onClick={() => setOpen(true)}
          className="bg-black text-white px-6 py-6  rounded-md hover:bg-gray-800"
        >
          <Plus /> Create Playlist
        </Button>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {videos.map((video, index) => (
          <Link key={index} href={`/dashboard/boot-camp/playlist/${index + 1}`}>
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

      <Dialog open={open} onOpenChange={setOpen}>
        <form>
          <DialogContent className="sm:max-w-[425px]">
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="title">Playlist Title</Label>
                <Input id="title" name="title" placeholder="Enter your title" />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">
                  {" "}
                  <X />
                  Close
                </Button>
              </DialogClose>
              <Button onClick={handelSubmit} type="submit">
                <Save /> Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}

export default UploadPlaylist;
