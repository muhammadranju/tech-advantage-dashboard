"use client";
import { CgLogOut } from "react-icons/cg";
import type * as React from "react";
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
import { CircleDollarSign } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuSettings } from "react-icons/lu";
import {
  PiGraduationCapBold,
  PiPersonSimpleRunBold,
  PiStudentBold,
  PiTentBold,
  PiUsersThreeBold,
} from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { FiSidebar } from "react-icons/fi";

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
          title: "Discover Strength",
          url: "/dashboard/discover-strength",
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
          title: "Mock Interview",
          url: "/dashboard/mock-interview",
          icon: <PiStudentBold />,
        },
        {
          title: "Notification",
          url: "/dashboard/notification",
          icon: <LuSettings />,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();

  return (
    <Sidebar {...props} className="text-white">
      <div
        className="flex items-center gap-2 cursor-pointer absolute  -right-10 top-5  w-fit rounded-full"
        onClick={toggleSidebar}
      >
        <FiSidebar className="text-black w-10 hover:text-gray-600 transition-colors  rounded-full" />
      </div>
      <SidebarHeader className="text-white relative">
        <div className="flex items-center ">
          <Image src="/logo.png" alt="logo" width={45} height={61} />
          <h1 className="font-bold text-lg text-white">TECH ADVANTAGE</h1>
        </div>
      </SidebarHeader>

      {/* We create a SidebarGroup for each parent. */}
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
                    <Link className="p-6" href={item.url}>
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

      <div className="flex justify-center items-center gap-4 mb-4 px-4 ">
        <Button className="bg-neutral-600 hover:bg-neutral-700 py-6 w-full text-lg text-white">
          <CgLogOut className="rotate-180 h-24 w-24" />{" "}
          {/* Increased icon size to h-24 w-24 */}
          Logout
        </Button>
      </div>
      <SidebarRail />
    </Sidebar>
  );
}
