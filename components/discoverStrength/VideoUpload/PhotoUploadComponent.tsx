"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";

export function PhotoUpload() {
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
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-lg font-medium text-center mb-6">
        Upload Your Photo
      </h2>

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
          <div className="w-12 h-12 border-2 border-neutral-400 rounded flex items-center justify-center">
            <ImageIcon className="w-6 h-6 text-neutral-400" />
          </div>

          <div className="space-y-2">
            <p className="text-neutral-600 font-medium">
              Drag & drop files here
            </p>
            <p className="text-neutral-500">Or</p>
          </div>

          <Button
            className="w-full bg-black hover:bg-neutral-800 text-white"
            onClick={() => document.getElementById("photo-input")?.click()}
          >
            Upload Photo
          </Button>

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
