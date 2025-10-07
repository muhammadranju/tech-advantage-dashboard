"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

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

import { logout } from "@/lib/redux/features/auth/authSlice";
import { useAppDispatch } from "@/lib/redux/hooks";

import {
  BellRing,
  ChartGantt,
  CircleDollarSign,
  Handshake,
  MessagesSquare,
} from "lucide-react";

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

type NavItem = {
  title: string;
  url: string;
  icon: React.ReactNode;
};

const NAV_MAIN: NavItem[] = [
  { title: "Overview", url: "/dashboard/overview", icon: <CircleDollarSign /> },
  { title: "Users", url: "/dashboard/users", icon: <PiUsersThreeBold /> },
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
  { title: "Boot Camp", url: "/dashboard/boot-camp", icon: <PiTentBold /> },
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
    title: "Feedback",
    url: "/dashboard/feedback",
    icon: <MessagesSquare />,
  },
  { title: "Notification", url: "/dashboard/notification", icon: <BellRing /> },
  {
    title: "Terms & Conditions",
    url: "/dashboard/terms-conditions",
    icon: <MdOutlinePolicy />,
  },
];

function SidebarNavItem({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton className="text-base" asChild isActive={active}>
        <Link className="p-6 my-1 flex items-center" href={item.url}>
          <span className="mr-2 text-lg">{item.icon}</span>
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();
  const dispatch = useAppDispatch();

  const handleLogout = React.useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <Sidebar {...props} className="text-white flex flex-col z-50 fixed">
      <div
        className="flex items-center gap-2 cursor-pointer absolute -right-[34px] top-5 w-fit rounded-full"
        onClick={toggleSidebar}
      >
        <FiSidebar className="text-black w-10 hover:text-gray-600 transition-colors rounded-full" />
      </div>

      <SidebarHeader className="text-white relative mt-3 px-3">
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="logo"
            blurDataURL="/logo.svg"
            className="mr-2 rounded-md bg-white w-12 h-12 object-cover"
            width={100}
            height={100}
          />
          <h1 className="font-bold text-lg text-white">TECH ADVANTAGE</h1>
        </div>
      </SidebarHeader>

      <div className="flex-1 overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_MAIN.map((item) => (
                <SidebarNavItem
                  key={item.title}
                  item={item}
                  active={pathname === item.url}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </div>

      <div className="mt-auto p-4 border-t border-gray-600">
        <Button
          onClick={handleLogout}
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
