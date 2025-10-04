"use client";
import HeaderTitle from "@/components/bootcamp/HeaderTitle";
import { ShowVideos } from "@/components/discoverStrength/VideoUpload/ShowVideos";
import { VideoUploads } from "@/components/discoverStrength/VideoUpload/VideoUploads";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const BootCamp = () => {
  const [category, setCategory] = useState("udemy");
  return (
    <div className="px-10">
      <div className="flex justify-between gap-8 ">
        <HeaderTitle />

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="bg-transparent p-5">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="udemy">Udemy Video</SelectItem>
            <SelectItem value="youtube">Youtube Video</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ShowVideos title={category} />
      <VideoUploads inputTitle="Video Title" category={category} />
    </div>
  );
};

export default BootCamp;
