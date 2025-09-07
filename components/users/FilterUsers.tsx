/* eslint-disable @typescript-eslint/no-explicit-any */
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreVertical } from "lucide-react";
import { PiCrownLight } from "react-icons/pi";
import { FaCheck } from "react-icons/fa6";
import { IUsersTableProps } from "./users.interface";

const FilterUsers = ({ users }: any) => {
  console.log(users);

  const handelSwitchPremiumUser = (user: IUsersTableProps) => {
    console.log(user);
  };

  const handelSwitchFreeUser = (user: IUsersTableProps) => {
    console.log(user);
  };

  return (
    <div className="divide-y divide-border px-3">
      {users()?.map((user: IUsersTableProps) => (
        <div
          key={user.id}
          className="grid grid-cols-5 gap-4 p-4 items-center hover:bg-muted/30 transition-colors"
        >
          <div className="text-sm font-medium text-foreground">{user.name}</div>
          <div className="text-sm text-muted-foreground">{user.email}</div>
          <div>
            <Badge
              variant="secondary"
              className={`${
                user.status === "Premium"
                  ? "bg-green-500/20 hover:bg-green-500 text-green-600"
                  : "bg-gray-500/20 hover:bg-gray-500 text-gray-600"
              }`}
            >
              {user.status}
            </Badge>
          </div>
          <div className="text-sm text-muted-foreground">
            {user.joiningDate}
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-none p-0">
                <DropdownMenuItem
                  onClick={() => handelSwitchPremiumUser(user)}
                  className="bg-green-500 hover:bg-green-700 text-white rounded-none focus:bg-green-700 focus:text-white"
                >
                  <PiCrownLight className="h-4 w-4 mr-2 text-white" />
                  Switch to Premium
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => handelSwitchFreeUser(user)}
                  className="bg-neutral-200 text-black rounded-none focus:bg-neutral-300"
                >
                  <FaCheck className="mr-2" />
                  Switch to Free
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterUsers;
