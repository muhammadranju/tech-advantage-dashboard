"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import { Bell, Camera, Lock } from "lucide-react";
import Link from "next/link";
import { PiPencilFill } from "react-icons/pi";
import { ClipLoader } from "react-spinners";

export function Header() {
  const { userProfile, isLoading } = useAuthCheck();

  const user = userProfile?.user?.data;

  return (
    <header className="fixed top-0 left-0 right-0 z-10 px-10 py-4  bg-neutral/80 backdrop-blur-md border-b border-neutral-200/20 w-full">
      <div className="flex items-center justify-end space-x-4 ">
        <Link href={"/dashboard/notification"}>
          <button className="bg-transparent hover:bg-neutral-200/80 rounded-full p-2 cursor-pointer transition-colors">
            <Bell className="w-6 h-6" />
          </button>
        </Link>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            {isLoading ? (
              <ClipLoader color="#9CA3AF" size={20} />
            ) : (
              <DropdownMenuTrigger asChild>
                <Avatar className="w-8 h-8 object-cover cursor-pointer hover:ring-2 hover:ring-neutral-300 transition-all">
                  <AvatarImage
                    src={process.env.NEXT_PUBLIC_BASE_URL + user?.image}
                  />
                  <AvatarFallback>{user?.name}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
            )}
            <DropdownMenuContent className="w-56 p-0 rounded" align="end">
              <Link href={"/profile/change-photo"}>
                <DropdownMenuItem className="flex items-center rounded-none gap-3 border-b px-4 py-3 cursor-pointer hover:bg-neutral-50">
                  <Camera className="text-xl text-neutral-900" />
                  <span className="text-neutral-700">Change Photo</span>
                </DropdownMenuItem>
              </Link>
              <Link href={"/profile/change-name"}>
                <DropdownMenuItem className="flex items-center rounded-none gap-3 border-b px-4 py-3 cursor-pointer hover:bg-neutral-50">
                  <PiPencilFill className="w-5 h-5 text-neutral-900" />
                  <span className="text-neutral-700">Change Name</span>
                </DropdownMenuItem>
              </Link>
              <Link href={"/profile/change-password"}>
                <DropdownMenuItem className="flex items-center rounded-none gap-3 px-4 py-3 cursor-pointer hover:bg-neutral-50">
                  <Lock className="w-5 h-5 text-neutral-900" />
                  <span className="text-neutral-700">Change Password</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="text-sm">
            <p className="font-bold">{user?.name}</p>
            <p className="text-neutral-500 text-xs capitalize">
              {user?.role.toLowerCase()}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
