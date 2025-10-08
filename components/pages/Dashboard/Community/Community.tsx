/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import { GrGroup } from "react-icons/gr";

import {
  useCreateCommunityGroupMutation,
  useGetCommunityGroupsQuery,
} from "@/lib/redux/features/api/community/communitySliceApi";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";
import GroupCardSkeleton from "@/components/skeletons/GroupCardSkeleton";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import Pagination from "@/components/pagination/Pagination";

const GroupCard = ({ group }: { group: any }) => (
  <Link href={`/dashboard/community/${group._id}`} key={group._id}>
    <div className="flex flex-col items-center min-w-[150px] mb-2">
      <img
        src={
          group?.image
            ? process.env.NEXT_PUBLIC_BASE_URL + group.image
            : "/placeholder-image.png"
        }
        alt={group.name}
        className="w-full h-40 object-cover rounded-lg shadow-md border p-1"
      />
      <div className="mt-2 flex items-center">
        <span className="text-xl mr-1">
          <GrGroup />
        </span>
        <span className="text-base font-semibold">{group.name}</span>
      </div>
    </div>
  </Link>
);

const CommunityPage = () => {
  const [groupName, setGroupName] = useState("");
  const [groupImage, setGroupImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [groups, setGroups] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [createCommunityGroup] = useCreateCommunityGroupMutation();
  const {
    data: groupsData,
    isLoading,
    refetch,
  } = useGetCommunityGroupsQuery(null);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(groups.length / itemsPerPage);
  const paginatedGroups = groups.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    if (groupsData?.data) {
      setGroups(groupsData.data);
      setCurrentPage(1);
    }
  }, [groupsData]);

  const handleFileSelect = (file: File | null) => {
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }

      // Validate file size (500KB = 512000 bytes)
      if (file.size > 512000) {
        toast.error("Image size must be less than 500KB");
        return;
      }

      setGroupImage(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
      handleFileSelect(files[0]);
    }
  };

  const handleRemoveImage = () => {
    setGroupImage(null);
    setImagePreview(null);
    const input = document.getElementById("file-upload") as HTMLInputElement;
    if (input) {
      input.value = "";
    }
  };

  const handleCreateGroup = async () => {
    // Validation
    if (!groupName.trim()) {
      toast.error("Please enter a group name");
      return;
    }

    if (!groupImage) {
      toast.error("Please select a group image");
      return;
    }

    setIsCreating(true);

    try {
      // Create FormData
      const formData = new FormData();
      formData.append("name", groupName.trim());
      formData.append("image", groupImage);

      const result = await createCommunityGroup(formData).unwrap();

      if (result?.success) {
        toast.success("Group created successfully!");

        // Reset form
        setGroupName("");
        setGroupImage(null);
        setImagePreview(null);
        const input = document.getElementById(
          "file-upload"
        ) as HTMLInputElement;
        if (input) {
          input.value = "";
        }
        // Refetch groups to update the list
        refetch();
      }
    } catch (error: any) {
      console.error("Create group error:", error);
      toast.error(error?.data?.message || "Failed to create group");
    } finally {
      setIsCreating(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="px-10 mt-5 min-h-screen">
      <h1 className="text-3xl font-bold text-black">Community Groups</h1>
      <div className="mx-auto my-4">
        {/* Create Group Form */}
        <div className="space-y-4">
          <div>
            <Label
              htmlFor="group-name"
              className="block text-sm font-medium text-gray-700"
            >
              Group Name
            </Label>
            <Input
              id="group-name"
              placeholder="Enter your group name"
              className="mt-1 py-6"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>

          <div>
            <Label
              htmlFor="group-picture"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Group Picture
            </Label>
            <div
              className={`mt-1 flex justify-center px-6 py-10 border-2 border-dashed rounded-md transition-colors ${
                isDragOver
                  ? "border-blue-400 bg-blue-50"
                  : "border-gray-300 bg-gray-50"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {imagePreview ? (
                <div className="space-y-3 text-center flex items-center justify-center flex-col">
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-w-full max-h-48 object-contain rounded-lg"
                    />
                    <button
                      onClick={handleRemoveImage}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 transition-colors"
                      type="button"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">
                    {groupImage?.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Size: {((groupImage?.size || 0) / 1024).toFixed(2)} KB
                  </p>
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer rounded-md bg-white px-3 py-2 font-medium text-blue-600 hover:text-blue-500"
                  >
                    <span>Change Image</span>
                  </label>
                </div>
              ) : (
                <div className="space-y-1 text-center flex items-center justify-center flex-col">
                  <div className="w-20 h-20 bg-blue-500/30 rounded-full flex items-center justify-center">
                    <MdOutlineCloudUpload className="text-blue-500 text-6xl" />
                  </div>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500"
                    >
                      <span>Drag & drop files here or click to browse</span>
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">
                    .jpg, .png up to 500KB
                  </p>
                </div>
              )}
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
              />
            </div>
          </div>

          <div className="flex justify-center items-center">
            <Button
              className="w-64 py-6 bg-black text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleCreateGroup}
              disabled={isCreating || !groupName.trim() || !groupImage}
            >
              {isCreating ? (
                <>
                  <Spinner className="size-5" /> Creating...
                </>
              ) : (
                <>
                  <Plus /> Create Group
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Existing Groups */}
        <h2 className="mt-8 text-3xl font-bold">Existing Groups</h2>

        <div className="grid grid-cols-5 gap-4 mt-4">
          {isLoading && <GroupCardSkeleton range={10} />}
          {!isLoading && groups.length === 0 && (
            <p className="col-span-5 text-center text-gray-500 py-8">
              No groups found. Create your first group!
            </p>
          )}
          {!isLoading &&
            paginatedGroups.map((group) => (
              <GroupCard key={group._id} group={group} />
            ))}
        </div>

        {!isLoading && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default CommunityPage;
