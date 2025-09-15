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

export const VideoUploads = () => {
  return (
    <div className="mx-auto mt-10 space-y-8 bg-white ">
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
