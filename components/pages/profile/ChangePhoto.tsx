"use client";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ChangePhoto() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt:", { firstName, lastName });
  };
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
    <Card className="w-full mt-10 pb-14 max-w-xl mx-auto shadow-[5px_4px_4px_rgba(0,0,0,0.3)] border-0">
      <CardHeader className="text-center pb-8 pt-8">
        <div className="flex justify-center">
          <Image
            src="/T3-logo.svg"
            className=" w-52 h-52"
            alt="logo"
            width={500}
            height={600}
          />
        </div>

        <h2 className="text-xl font-semibold  mt-8">
          Tech Advantage Admin Access
        </h2>
      </CardHeader>

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
    </Card>
  );
}
