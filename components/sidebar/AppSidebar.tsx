"use client";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleDollarSign } from "lucide-react";
import {
  PiGraduationCapBold,
  PiPersonSimpleRunBold,
  PiStudentBold,
  PiTentBold,
  PiUsersThree,
} from "react-icons/pi";

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: <CircleDollarSign />,
        },
        {
          title: "Users",
          url: "/users",
          icon: <PiUsersThree />,
        },
        {
          title: "Discover Strength",
          url: "/discover-strength",
          icon: <PiPersonSimpleRunBold />,
        },
        {
          title: "Coaching",
          url: "/coaching",
          icon: <PiGraduationCapBold />,
        },
        {
          title: "Boot Camp",
          url: "/boot-camp",
          icon: <PiTentBold />,
        },
        {
          title: "Mock Interview",
          url: "/mock-interview",
          icon: <PiStudentBold />,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  return (
    <Sidebar {...props} className="text-white">
      <SidebarHeader className="text-white">
        <div className="flex items-center ">
          <Image src="/logo.png" alt="logo" width={45} height={61} />
          <h1 className="font-bold text-lg text-white">TECH ADVANTAGE</h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="text-white">
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
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
