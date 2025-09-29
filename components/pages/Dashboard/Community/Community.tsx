"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { GrGroup } from "react-icons/gr";

import Image from "next/image";
import Link from "next/link";
import { MdOutlineCloudUpload } from "react-icons/md";

const groups = [
  {
    id: 1,
    name: "Aspiring Business Solution",
    image:
      "https://images.pexels.com/photos/708392/pexels-photo-708392.jpeg?cs=srgb&dl=pexels-helenalopes-708392.jpg&fm=jpg",
  },
  {
    id: 2,
    name: "Aspiring Business Solution",
    image:
      "https://images.pexels.com/photos/708392/pexels-photo-708392.jpeg?cs=srgb&dl=pexels-helenalopes-708392.jpg&fm=jpg",
  },
  {
    id: 3,
    name: "Aspiring Business Solution",
    image:
      "https://images.pexels.com/photos/708392/pexels-photo-708392.jpeg?cs=srgb&dl=pexels-helenalopes-708392.jpg&fm=jpg",
  },
  {
    id: 4,
    name: "Aspiring Business Solution",
    image:
      "https://images.pexels.com/photos/708392/pexels-photo-708392.jpeg?cs=srgb&dl=pexels-helenalopes-708392.jpg&fm=jpg",
  },
  {
    id: 5,
    name: "Aspiring Business Solution",
    image:
      "https://images.pexels.com/photos/708392/pexels-photo-708392.jpeg?cs=srgb&dl=pexels-helenalopes-708392.jpg&fm=jpg",
  },
  {
    id: 6,
    name: "Aspiring Business Solution",
    image:
      "https://images.pexels.com/photos/708392/pexels-photo-708392.jpeg?cs=srgb&dl=pexels-helenalopes-708392.jpg&fm=jpg",
  },
];

const GroupCard = ({ group }: { group: (typeof groups)[0] }) => (
  <Link href="/dashboard/community/view-community">
    <div className="flex flex-col items-center min-w-[150px] mb-2 ">
      <Image
        width={150}
        height={150}
        src={group.image}
        alt={group.name}
        className="w-64 h-40 object-cover rounded-lg shadow-md border p-1"
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
  return (
    <div className="min-h-screen">
      <div className="mx-auto p-6">
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
            />
          </div>

          <div>
            <Label
              htmlFor="group-picture"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Group Picture
            </Label>
            <div className="mt-1 flex justify-center px-6 py-10 border-2 border-dashed border-gray-300 rounded-md bg-gray-50">
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
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500">.jpg, .png up to 500KB</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <Button className="w-64 py-6 bg-black text-white">
              <Plus /> Create Group
            </Button>
          </div>
        </div>

        {/* Existing Groups */}
        <h2 className="mt-8 text-3xl font-bold">Existing Groups</h2>
        <div className="grid grid-cols-5 mt-4 space-x-4 overflow-x-auto">
          {groups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
