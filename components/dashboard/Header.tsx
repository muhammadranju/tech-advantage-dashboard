import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "lucide-react";

export function Header() {
  return (
    <header className="px-10 py-4 bg-white">
      <div className="flex items-center justify-end space-x-4 ">
        {/* <Button variant="ghost"> */}
        <button className=" bg-transparent hover:bg-neutral-200 rounded-full p-2 cursor-pointer">
          <Bell className="w-6 h-6" />
        </button>
        {/* </Button> */}
        <div className="flex items-center space-x-2">
          <Avatar className="w-8 h-8 object-cover">
            <AvatarImage src="/professional-headshot.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <p className="font-bold">Jhon doe</p>
            <p className="text-neutral-500 text-xs">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
