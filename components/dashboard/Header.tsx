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
import { useEffect, useState } from "react";
import { PiPencilFill } from "react-icons/pi";
import { SpinnerCustom } from "../ui/SpinnerCustom";

interface MenuItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  withBorder?: boolean;
}

function UserMenuItem({ href, icon, label, withBorder }: MenuItemProps) {
  return (
    <Link href={href}>
      <DropdownMenuItem
        className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-neutral-50 rounded-none ${
          withBorder ? "border-b" : ""
        }`}
      >
        {icon}
        <span className="text-neutral-700">{label}</span>
      </DropdownMenuItem>
    </Link>
  );
}

export function Header() {
  const { userProfile, isLoading } = useAuthCheck();
  const user = userProfile?.user?.data;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-10 px-10 py-4 bg-neutral/80 backdrop-blur-md border-neutral-200/20 w-full">
      <div className="flex items-center justify-end space-x-4">
        <Link href="/dashboard/notification">
          <button className="bg-transparent hover:bg-neutral-200/80 rounded-full p-2 cursor-pointer transition-colors">
            <Bell className="w-6 h-6" />
          </button>
        </Link>

        <div className="flex items-center space-x-2">
          {isMounted ? (
            <>
              <DropdownMenu>
                {isLoading ? (
                  <>
                    <SpinnerCustom />
                    Loading...
                  </>
                ) : (
                  <DropdownMenuTrigger asChild>
                    <Avatar className="w-10 h-10 rounded-full hover:ring-4 ring-neutral-200 transition-all cursor-pointer">
                      {/* or rounded-lg for more rounded corners */}
                      <AvatarFallback>
                        <SpinnerCustom />
                      </AvatarFallback>
                      <AvatarImage
                        className="w-full h-full object-cover"
                        src={process.env.NEXT_PUBLIC_BASE_URL?.concat(
                          user?.image
                        )}
                        alt={user?.name || "User avatar"}
                      />
                    </Avatar>
                  </DropdownMenuTrigger>
                )}

                <DropdownMenuContent className="w-56 p-0 rounded" align="end">
                  <UserMenuItem
                    href="/profile/change-photo"
                    icon={<Camera className="text-xl text-neutral-900" />}
                    label="Change Photo"
                    withBorder
                  />
                  <UserMenuItem
                    href="/profile/change-name"
                    icon={<PiPencilFill className="w-5 h-5 text-neutral-900" />}
                    label="Change Name"
                    withBorder
                  />
                  <UserMenuItem
                    href="/profile/change-password"
                    icon={<Lock className="w-5 h-5 text-neutral-900" />}
                    label="Change Password"
                  />
                </DropdownMenuContent>
              </DropdownMenu>

              {!isLoading && (
                <div className="text-sm">
                  <p className="font-bold">{user?.name}</p>
                  <p className="text-neutral-500 text-xs capitalize">
                    {/* {user?.role?.toLowerCase()} */}
                    {user?.role === "SUPER_ADMIN" ? "Super Admin" : "Admin"}
                  </p>
                </div>
              )}
            </>
          ) : (
            // Optional: Render a skeleton here if needed to prevent layout shift
            <div className="w-10 h-10 rounded-full bg-neutral-200 animate-pulse" />
          )}
        </div>
      </div>
    </header>
  );
}
