/* eslint-disable @typescript-eslint/no-explicit-any */
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { MoreVertical } from "lucide-react";
import { ImBlocked } from "react-icons/im";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

import { IUsersTableProps } from "./users.interface";

const FilterUsers = ({ users }: any) => {
  const handelBlockUser = (user: IUsersTableProps) => {
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
                user.status === "Newest"
                  ? "bg-green-500/20 hover:bg-green-500 text-green-600"
                  : "bg-yellow-500/20 hover:bg-yellow-500 text-yellow-600"
              }`}
            >
              {user.status === "Newest" ? "New" : "Old"}
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
              <DropdownMenuContent align="end" className="p-0">
                <DropdownMenuItem
                  onClick={() => handelBlockUser(user)}
                  className="bg-red-500 text-white focus:text-white  focus:bg-red-600"
                >
                  <ImBlocked className="text-white" />
                  Block User
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
