import { CoachingUser } from "@/interface/dashboard.interface";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { format, parseISO } from "date-fns";
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
import CoachingInformationModel from "./CoachingInformationModel";

// Interface based on your API data structure
interface FilterCoachingProps {
  filterCoachingByStatus: () => CoachingUser[];
  onActionClick: (user: CoachingUser, action: "APPROVED" | "DENIED") => void;
}

const FilterCoaching = ({
  filterCoachingByStatus,
  onActionClick,
}: FilterCoachingProps) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<CoachingUser | null>(null);

  const handleApproveUser = async (coaching: CoachingUser) => {
    console.log(coaching);
    onActionClick(coaching, "APPROVED");
  };

  const handleDenyUser = (coaching: CoachingUser) => {
    onActionClick(coaching, "DENIED");
  };

  const handleView = (coaching: CoachingUser) => {
    setSelected(coaching);
    setOpen(true);
  };

  const formatDate = (isoDate: string) => {
    try {
      const date = parseISO(isoDate);
      return format(date, "MM/dd/yyyy");
    } catch (error) {
      return "Invalid Date";
    }
  };

  const formatApplicationDate = (dateString: string) => {
    try {
      // Handle both ISO format and simple date format
      if (dateString.includes("T")) {
        return formatDate(dateString);
      } else {
        // For simple date format like "2025-09-10"
        const date = new Date(dateString);
        return format(date, "MM/dd/yyyy");
      }
    } catch (error) {
      return "Invalid Date";
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-500/20 hover:bg-green-500 text-green-600 hover:text-green-50";
      case "DENIED":
        return "bg-red-500/20 hover:bg-red-500 text-red-600 hover:text-red-50";
      case "PENDING":
        return "bg-yellow-500/20 hover:bg-yellow-500 text-yellow-600 hover:text-yellow-50";
      default:
        return "bg-gray-500/20 hover:bg-gray-500 text-gray-600 hover:text-gray-50";
    }
  };

  const getStatusDisplayText = (status: string) => {
    switch (status) {
      case "PENDING":
        return "Pending";
      case "APPROVED":
        return "Approved";
      case "DENIED":
        return "Denied";
      default:
        return status;
    }
  };

  const coachingUsers = filterCoachingByStatus();

  return (
    <div>
      <div className="divide-y divide-border px-3">
        {coachingUsers.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No applications found.
          </div>
        ) : (
          coachingUsers.map((coaching: CoachingUser) => (
            <div
              key={coaching._id}
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
                  className={getStatusBadgeClass(coaching.status)}
                >
                  {getStatusDisplayText(coaching.status)}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                {formatApplicationDate(coaching.createdAt)}
              </div>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-6 w-6 text-neutral-500" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-none p-0">
                    {/* Show approve/deny options for PENDING and DENY status users */}
                    {(coaching.status === "PENDING" ||
                      coaching.status === "DENIED") && (
                      <>
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
                      </>
                    )}

                    {/* Always show View option for all users */}
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
          ))
        )}
      </div>

      {/* Dialog for Coaching Information */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm w-full bg-white rounded-lg p-16 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-neutral-800">
              Coaching Application Information
            </DialogTitle>
          </DialogHeader>
          <CoachingInformationModel
            date={selected?.date as string}
            time={selected?.time?.[0]?.range as string}
            email={selected?.email as string}
            name={selected?.name as string}
            status={selected?.status as string}
            createdAt={selected?.createdAt as string}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FilterCoaching;
