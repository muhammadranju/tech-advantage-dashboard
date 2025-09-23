"use client";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  BellRing,
  ChartGantt,
  CircleDollarSign,
  Handshake,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type * as React from "react";
import { CgLogOut } from "react-icons/cg";
import { FiSidebar } from "react-icons/fi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { MdOutlinePolicy } from "react-icons/md";
import {
  PiGraduationCapBold,
  PiPersonSimpleRunBold,
  PiStudentBold,
  PiTentBold,
  PiUsersThreeBold,
} from "react-icons/pi";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/lib/redux/hooks";
import { logout } from "@/lib/redux/features/auth/authSlice";

// This is sample data.
const data = {
  navMain: [
    {
      items: [
        {
          title: "Dashboard",
          url: "/dashboard/overview",
          icon: <CircleDollarSign />,
        },
        {
          title: "Users",
          url: "/dashboard/users",
          icon: <PiUsersThreeBold />,
        },
        {
          title: "Small Business",
          url: "/dashboard/small-business",
          icon: <Handshake />,
        },
        {
          title: "Business Planning",
          url: "/dashboard/business-planning",
          icon: <ChartGantt />,
        },
        {
          title: "Success Path",
          url: "/dashboard/success-path",
          icon: <PiPersonSimpleRunBold />,
        },
        {
          title: "Coaching",
          url: "/dashboard/coaching",
          icon: <PiGraduationCapBold />,
        },
        {
          title: "Boot Camp",
          url: "/dashboard/boot-camp",
          icon: <PiTentBold />,
        },
        {
          title: "Community",
          url: "/dashboard/community",
          icon: <HiMiniUserGroup />,
        },
        {
          title: "Mock Interview",
          url: "/dashboard/mock-interview",
          icon: <PiStudentBold />,
        },
        {
          title: "Notification",
          url: "/dashboard/notification",
          icon: <BellRing />,
        },
        {
          title: "Terms & Conditions",
          url: "/dashboard/terms-conditions",
          icon: <MdOutlinePolicy />,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();
  const dispatch = useAppDispatch();

  const handelLogout = () => {
    console.log("logout");
    Cookies.remove("token");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logout());
    window.location.href = "/login";
  };

  return (
    <Sidebar {...props} className="text-white flex flex-col z-50 fixed">
      <div
        className="flex items-center gap-2 cursor-pointer absolute  -right-[34px] top-5  w-fit rounded-full"
        onClick={toggleSidebar}
      >
        <FiSidebar className="text-black w-10 hover:text-gray-600 transition-colors  rounded-full" />
      </div>

      <SidebarHeader className="text-white relative ">
        <div className="flex items-center ">
          <Image
            src="/dashboard-logo.png"
            alt="logo"
            className="mr-2"
            width={45}
            height={61}
          />
          <h1 className="font-bold text-lg text-white">TECH ADVANTAGE</h1>
        </div>
      </SidebarHeader>

      {/* Navigation Menu - flex-1 to take available space */}
      <div className="flex-1 overflow-y-auto">
        {data.navMain.map((item, idx) => (
          <SidebarGroup key={idx}>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className="text-base"
                      asChild
                      isActive={pathname === item.url}
                    >
                      <Link className="p-6 my-1" href={item.url}>
                        <span className="mr-2 text-lg"> {item.icon}</span>{" "}
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </div>

      {/* Fixed Bottom Logout Button */}
      <div className="mt-auto p-4 border-t border-gray-600 ">
        <Button
          onClick={handelLogout}
          className="bg-neutral-600 hover:bg-neutral-700 py-6 w-full text-lg text-white"
        >
          <CgLogOut className="rotate-180 h-6 w-6 mr-2" />
          Logout
        </Button>
      </div>

      <SidebarRail />
    </Sidebar>
  );
}
