/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import BackButton from "@/components/logo/BackButton";
import LogoComponent from "@/components/logo/Logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import { useUpdateUserPhotoProfileMutation } from "@/lib/redux/features/api/profile/profileSliceApi";
import { ImageIcon, Save, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";

export default function ChangePhoto() {
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const { refetch } = useAuthCheck();
  const [updateUserPhotoProfile, { isLoading }] =
    useUpdateUserPhotoProfileMutation();
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
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        setPhoto(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleFileSelect = (file: File | null) => {
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPhoto(null);
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photo) return;

    const formData = new FormData();
    formData.append("image", photo);

    try {
      await updateUserPhotoProfile(formData).unwrap();

      refetch();
      router.back();
      toast.success("Photo profile updated successfully");
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(error?.data?.message || "Failed to update photo profile");
    }
  };

  const handleClear = () => {
    setPhoto(null);
    setPreview(null);
    const input = document.getElementById("photo-input") as HTMLInputElement;
    if (input) {
      input.value = "";
    }
  };

  return (
    <>
      <BackButton />
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
            <div
              className="flex flex-col items-center space-y-4 cursor-pointer hover:text-neutral-700"
              onClick={() => document.getElementById("photo-input")?.click()}
            >
              {preview ? (
                <>
                  <Image
                    width={200}
                    height={200}
                    src={preview}
                    alt="Preview"
                    className="max-w-full max-h-48 object-contain rounded-lg"
                  />
                  <p className="text-neutral-600 font-medium">{photo?.name}</p>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleClear}
                    className=" "
                  >
                    <X /> Remove
                  </Button>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 border-2 border-neutral-400 rounded flex items-center justify-center">
                    <ImageIcon className="w-6 h-6 text-neutral-400" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-neutral-600 font-medium">
                      Drag & drop files here
                    </p>
                    <p className="text-neutral-500">Or</p>
                  </div>
                  <p className="text-neutral-500 font-bold cursor-pointer hover:text-neutral-700">
                    or click to upload a file
                  </p>
                  <input
                    id="photo-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      handleFileSelect(e.target.files?.[0] || null);
                    }}
                  />
                </>
              )}
            </div>
          </div>
        </div>
        <Button
          onClick={handleSubmit}
          className="w-1/2 mx-auto h-12 bg-black hover:bg-neutral-800 text-white"
          disabled={!photo || isLoading}
        >
          {isLoading ? (
            <>
              <Spinner className="size-6" /> Saving...
            </>
          ) : (
            <>
              <Save /> Save
            </>
          )}
        </Button>
      </Card>
    </>
  );
}
