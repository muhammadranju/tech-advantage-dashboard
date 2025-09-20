// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Bell, Camera, Lock } from "lucide-react";
// import Link from "next/link";
// import { PiPencilFill } from "react-icons/pi";

// export function Header() {
//   return (
//     <header className="px-10 py-4 bg-white top-0 w-full">
//       <div className="flex items-center justify-end space-x-4 ">
//         <Link href={"/dashboard/notification"}>
//           <button className="bg-transparent hover:bg-neutral-200 rounded-full p-2 cursor-pointer">
//             <Bell className="w-6 h-6" />
//           </button>
//         </Link>
//         <div className="flex items-center space-x-2">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Avatar className="w-8 h-8 object-cover cursor-pointer hover:ring-2 hover:ring-neutral-300 transition-all">
//                 <AvatarImage src="/professional-headshot.jpg" />
//                 <AvatarFallback>JD</AvatarFallback>
//               </Avatar>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-56 p-0 rounded" align="end">
//               <Link href={"/profile/change-photo"}>
//                 <DropdownMenuItem className="flex items-center rounded-none gap-3 border-b px-4 py-3 cursor-pointer hover:bg-neutral-50">
//                   <Camera className="text-xl text-neutral-900" />
//                   <span className="text-neutral-700">Change Photo</span>
//                 </DropdownMenuItem>
//               </Link>
//               <Link href={"/profile/change-name"}>
//                 <DropdownMenuItem className="flex items-center rounded-none gap-3 border-b px-4 py-3 cursor-pointer hover:bg-neutral-50">
//                   <PiPencilFill className="w-5 h-5 text-neutral-900" />
//                   <span className="text-neutral-700">Change Name</span>
//                 </DropdownMenuItem>
//               </Link>
//               <Link href={"/profile/change-password"}>
//                 <DropdownMenuItem className="flex items-center rounded-none gap-3 px-4 py-3 cursor-pointer hover:bg-neutral-50">
//                   <Lock className="w-5 h-5 text-neutral-900" />
//                   <span className="text-neutral-700">Change Password</span>
//                 </DropdownMenuItem>
//               </Link>
//             </DropdownMenuContent>
//           </DropdownMenu>
//           <div className="text-sm">
//             <p className="font-bold">Jhon doe</p>
//             <p className="text-neutral-500 text-xs">Admin</p>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Camera, Lock } from "lucide-react";
import Link from "next/link";
import { PiPencilFill } from "react-icons/pi";

export function Header() {
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
            <DropdownMenuTrigger asChild>
              <Avatar className="w-8 h-8 object-cover cursor-pointer hover:ring-2 hover:ring-neutral-300 transition-all">
                <AvatarImage src="/professional-headshot.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
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
            <p className="font-bold">Jhon doe</p>
            <p className="text-neutral-500 text-xs">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
