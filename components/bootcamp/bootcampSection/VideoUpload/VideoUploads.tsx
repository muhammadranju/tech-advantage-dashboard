"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateBootCampMutation } from "@/lib/redux/features/api/bootCamp/bootCampSliceApi";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";

interface VideoUploadsProps {
  inputTitle?: string;
  category?: string;
}

export const VideoUploads = ({ category }: VideoUploadsProps) => {
  const [selectedRange, setSelectedRange] = useState("5");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [createBootCamp, { isLoading }] = useCreateBootCampMutation();

  const handleSubmit = async () => {
    if (videoTitle.length === 0 || videoUrl.length === 0) {
      return;
    }

    try {
      const result = await createBootCamp({
        body: {
          mark: selectedRange,
          title: videoTitle,
          url: videoUrl,
          category: category,
        },
      }).unwrap();

      if (result.success) {
        toast.success("Video uploaded successfully");
        setVideoTitle("");
        setVideoUrl("");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to upload video");
    }
  };

  return (
    <div className="mx-auto mt-10 space-y-8 bg-white ">
      {/* Form Controls */}
      <div className="space-y-4 pt-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Mark Range
          </label>
          <Select value={selectedRange} onValueChange={setSelectedRange}>
            <SelectTrigger className="w-full py-6 bg-neutral-50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">Range 1-5</SelectItem>
              <SelectItem value="10">Range 6-10</SelectItem>
              <SelectItem value="15">Range 11-15</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Video Title
          </label>
          <Input
            placeholder={`Enter your video title`}
            className="w-full py-6"
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Video URL</label>
          <Input
            placeholder={`Enter your video URL`}
            className="w-full py-6"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </div>

        <div className="max-w-4xl mx-auto flex  justify-center items-center">
          <Button
            className="w-full  bg-black hover:bg-gray-800 py-6 text-white"
            disabled={videoTitle.length === 0 || videoUrl.length === 0}
            onClick={handleSubmit}
          >
            {isLoading ? (
              <ClipLoader color="#ffffff" size={16} />
            ) : (
              <>
                <FaCloudUploadAlt />
                Upload
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
