import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Eye, MoreVertical, X } from "lucide-react";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { IUsersTableProps } from "../users/users.interface";
import CoachingInformationModel from "./CoachingInformationModel";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FilterCoaching = ({ filterCoachingByStatus }: any) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<IUsersTableProps | null>(null);

  const handleApproveUser = (coaching: IUsersTableProps) => {
    console.log("approve", coaching);
  };

  const handleDenyUser = (coaching: IUsersTableProps) => {
    console.log("deny", coaching);
  };

  const handlePendingUser = (coaching: IUsersTableProps) => {
    console.log("pending", coaching);
  };

  const handleView = (coaching: IUsersTableProps) => {
    setSelected(coaching);
    setOpen(true);
  };

  console.log(selected);

  return (
    <div>
      <div className="mb-4 flex gap-4"></div>

      <div className="divide-y divide-border px-3">
        {filterCoachingByStatus().map((coaching: IUsersTableProps) => (
          <div
            key={coaching.id}
            className="grid grid-cols-5 gap-4 p-4 items-center hover:bg-muted/30 transition-colors"
          >
            <div className="text-sm font-medium text-foreground">
              {coaching.name}
            </div>
            <div className="text-sm text-muted-foreground">
              {coaching.email}
            </div>
            <div>
              <Badge
                variant="secondary"
                className={`${
                  coaching.status === "Approved"
                    ? "bg-green-500/20 hover:bg-green-500 text-green-600"
                    : coaching.status === "Deny"
                    ? "bg-red-500/20 hover:bg-red-500 text-red-600"
                    : "bg-yellow-500/20 hover:bg-yellow-500 text-yellow-600"
                }`}
              >
                {coaching.status}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              {coaching.joiningDate}
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-6 w-6 text-neutral-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-none p-0">
                  <DropdownMenuItem
                    onClick={() => handleApproveUser(coaching)}
                    className="bg-green-500 hover:bg-green-700 text-white rounded-none focus:bg-green-700 focus:text-white"
                  >
                    <FaCheck className="mr-2 text-white" />
                    Approve
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => handleDenyUser(coaching)}
                    className="bg-red-500 hover:bg-red-700 text-white rounded-none focus:bg-red-700 focus:text-white"
                  >
                    <X className="mr-2 font-bold text-white" />
                    Deny
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    onClick={() => handleView(coaching)}
                    className="text-black rounded-none focus:bg-neutral-100"
                  >
                    <Eye className="mr-2" />
                    View
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>


      {/* Dialog for Booking Information */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm w-full bg-white rounded-lg p-16 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-neutral-800">
              Booking Information
            </DialogTitle>
          </DialogHeader>
          <CoachingInformationModel
            date={selected?.joiningDate as string}
            time={selected?.time as string}
            email={selected?.email as string}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FilterCoaching;
