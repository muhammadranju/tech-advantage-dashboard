/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Play } from "lucide-react";

interface VideoRange {
  label: string;
  videos: number;
  videosData: any;
}

interface VideoUploadsProps {
  videoRanges: VideoRange[];
  title: string;
}

export const VideoUploads = ({ videoRanges, title }: VideoUploadsProps) => {
  console.log(videoRanges);
  return (
    <div className="mx-auto mt-10 space-y-8 bg-white ">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900">{title}&apos;s Video</h1>

      {/* Video Ranges */}
      <div className="space-y-6">
        {videoRanges.map((range, rangeIndex) => (
          <div key={rangeIndex} className="space-y-3">
            <Badge
              variant="secondary"
              className="bg-white shadow border text-sm text-foreground hover:bg-muted"
            >
              {range.label}
            </Badge>

            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: range.videos }).map((_, videoIndex) => {
                return (
                  <div key={videoIndex}>
                    <div className="relative" key={videoIndex}>
                      <div>
                        <img
                          src={range.videosData[videoIndex].thumbnail}
                          alt={range.videosData[videoIndex].title}
                          className="w-full h-64 object-cover rounded-xl"
                        />
                        <p className="font-bold text-xl">
                          {range.videosData[videoIndex].title}
                        </p>
                      </div>
                      <a
                        href={range.videosData[videoIndex].url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Button
                          variant="outline"
                          className="gap-2  absolute top-30 left-55  p-"
                        >
                          <Play className="h-8 w-8 text-2xl" />
                        </Button>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Form Controls */}
      <div className="space-y-4 pt-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Mark Range
          </label>
          <Select>
            <SelectTrigger className="w-full py-6">
              <SelectValue placeholder="Select mark range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-5">Range 1-5</SelectItem>
              <SelectItem value="6-10">Range 6-10</SelectItem>
              <SelectItem value="11-15">Range 11-15</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Video Link
          </label>
          <Input placeholder="Enter your video link" className="w-full py-6" />
        </div>

        <div className="max-w-4xl mx-auto flex  justify-center items-center">
          <Button className="w-full  bg-black hover:bg-gray-800 py-6 text-white">
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
};
