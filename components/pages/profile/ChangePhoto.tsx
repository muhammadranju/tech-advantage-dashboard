"use client";
import LogoComponent from "@/components/logo/Logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ImageIcon, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";

export default function ChangePhoto() {
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Handle login logic here
  //   // console.log("Login attempt:", { firstName, lastName });
  // };
  const [isDragOver, setIsDragOver] = useState(false);
  const router = useRouter();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("submit attempt:");
    toast.success("Photo saved successfully!");
  };

  return (
    <>
      <Button
        className="m-5 py-5 px-4 hover:pl-5"
        onClick={() => router.back()}
      >
        <ArrowLeft /> Back
      </Button>
      <Card className="w-full pb-12 max-w-xl mx-auto shadow-[2px_4px_4px_rgba(0,0,0,0.1)] border-0">
        <LogoComponent
          title="Change Photo"
          paragraph="Tech Advantage Admin Access"
        />

        <div className="w-full max-w-md mx-auto">
          <h2 className="text-lg font-medium text-center mb-2">
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
                // onChange={(e) => {
                //   // Handle file selection logic here
                // }}
              />
            </div>
          </div>
        </div>
        <Button
          onClick={handleSubmit}
          className="w-1/2 mx-auto h-12 bg-black hover:bg-neutral-800 text-white"
        >
          <Save /> Save
        </Button>
      </Card>
    </>
  );
}
