"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MdOutlineCloudUpload } from "react-icons/md";

import { ImageIcon } from "lucide-react";

export function VideoUploadComponent() {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    // Handle file drop logic here
  };

  return (
    <div className="w-full  mx-auto">
      <h2 className="text-lg font-medium  mb-3">Upload Video</h2>

      <div
        className={`relative border-2 border-dashed  rounded-lg p-8 text-center transition-colors ${
          isDragOver
            ? "border-blue-400 bg-blue-50"
            : "border-neutral-300 bg-white"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="w-20 h-20 bg-blue-500/30  rounded-full flex items-center justify-center">
            {/* <ImageIcon className="w-6 h-6 text-neutral-400" /> */}
            <MdOutlineCloudUpload className="text-blue-500  text-6xl" />
          </div>
          <div className="space-y-2">
            <p className="text-neutral-600 font-bold">
              Drag & drop files here or click to browse
            </p>
            <p className="text-neutral-600 font-light">MP4, MOV up to 500MB</p>
          </div>

          <input
            id="photo-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              // Handle file selection logic here
            }}
          />
        </div>
      </div>
    </div>
  );
}
