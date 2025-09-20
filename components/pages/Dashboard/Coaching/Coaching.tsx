/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { FileText } from "lucide-react";

import FilterCoaching from "@/components/coaching/FilterCoaching";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Type definitions
interface User {
  id: number;
  name: string;
  email: string;
  status: "Pending" | "Approved" | "Deny";
  joiningDate: string;
}

interface Stat {
  title: string;
  value: string;
  changeType: "positive" | "negative";
  icon: React.ComponentType<any>;
}

type StatusFilter = "All" | "Pending" | "Approved" | "Deny";
type SortBy = "newest" | "oldest";
type ActionType = "approve" | "deny";

const users: User[] = [
  {
    id: 1,
    name: "Alice M",
    email: "alice.m@example.com",
    status: "Pending",
    joiningDate: "08/15/25",
  },
  {
    id: 2,
    name: "Brian K",
    email: "brian.k@example.com",
    status: "Approved",
    joiningDate: "09/01/25",
  },
  {
    id: 3,
    name: "Sophia L",
    email: "sophia.l@example.com",
    status: "Deny",
    joiningDate: "09/05/25",
  },
  {
    id: 4,
    name: "David P",
    email: "david.p@example.com",
    status: "Pending",
    joiningDate: "09/10/25",
  },
  {
    id: 5,
    name: "Emma R",
    email: "emma.r@example.com",
    status: "Approved",
    joiningDate: "09/12/25",
  },
  {
    id: 6,
    name: "James T",
    email: "james.t@example.com",
    status: "Deny",
    joiningDate: "07/22/25",
  },
  {
    id: 7,
    name: "Olivia W",
    email: "olivia.w@example.com",
    status: "Approved",
    joiningDate: "08/28/25",
  },
  {
    id: 8,
    name: "Liam S",
    email: "liam.s@example.com",
    status: "Pending",
    joiningDate: "09/07/25",
  },
  {
    id: 9,
    name: "Isabella G",
    email: "isabella.g@example.com",
    status: "Approved",
    joiningDate: "09/03/25",
  },
  {
    id: 10,
    name: "Mason H",
    email: "mason.h@example.com",
    status: "Pending",
    joiningDate: "09/10/25",
  },
  {
    id: 11,
    name: "Ella J",
    email: "ella.j@example.com",
    status: "Deny",
    joiningDate: "08/30/25",
  },
  {
    id: 12,
    name: "Aiden B",
    email: "aiden.b@example.com",
    status: "Approved",
    joiningDate: "07/19/25",
  },
  {
    id: 13,
    name: "Charlotte F",
    email: "charlotte.f@example.com",
    status: "Pending",
    joiningDate: "08/10/25",
  },
  {
    id: 14,
    name: "Lucas C",
    email: "lucas.c@example.com",
    status: "Approved",
    joiningDate: "08/21/25",
  },
  {
    id: 15,
    name: "Amelia E",
    email: "amelia.e@example.com",
    status: "Deny",
    joiningDate: "09/13/25",
  },
];

const stats: Stat[] = [
  {
    title: "Total Application",
    value: "8,642",
    changeType: "positive",
    icon: FileText,
  },
  {
    title: "Total Approve Application",
    value: "8,642",
    changeType: "positive",
    icon: FileText,
  },
  {
    title: "Total Deny Application",
    value: "15,842",
    changeType: "positive",
    icon: FileText,
  },
];

const CoachingPage = () => {
  const [activeTab, setActiveTab] = useState<StatusFilter>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortBy>("newest");
  const [usersList, setUsersList] = useState<User[]>(users);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [actionType, setActionType] = useState<ActionType | null>(null);

  const router = useRouter();

  const usersPerPage = 8;

  // Convert date string to Date object for proper sorting
  // const parseDate = (dateString: string): Date => {
  //   const [month, day, year] = dateString.split("/");
  //   return new Date(`20${year}`, parseInt(month) - 1, parseInt(day));
  // };
  const parseDate = (dateString: string): Date => {
    const [month, day, year] = dateString.split("/");

    // Ensure month, day, and year are properly parsed into numbers
    const monthNumber = parseInt(month, 10);
    const dayNumber = parseInt(day, 10);
    const yearNumber = parseInt(`20${year}`, 10);

    // Validate the parsed numbers
    if (isNaN(monthNumber) || isNaN(dayNumber) || isNaN(yearNumber)) {
      throw new Error("Invalid date format");
    }

    // Return a new Date object with proper numeric values
    return new Date(yearNumber, monthNumber - 1, dayNumber); // month is 0-indexed in Date
  };

  // Filter, sort and search users
  const getProcessedUsers = (): User[] => {
    let filteredUsers = [...users];

    // Apply status filter
    if (statusFilter !== "All") {
      filteredUsers = filteredUsers.filter(
        (user) => user.status === statusFilter
      );
    }

    // Apply search query filter
    if (searchQuery) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting by date
    filteredUsers.sort((a, b) => {
      const dateA = parseDate(a.joiningDate);
      const dateB = parseDate(b.joiningDate);

      if (sortBy === "newest") {
        return dateB.getTime() - dateA.getTime(); // Newest first
      } else {
        return dateA.getTime() - dateB.getTime(); // Oldest first
      }
    });

    return filteredUsers;
  };

  // Get paginated users
  const getPagedUsers = (): User[] => {
    const processedUsers = getProcessedUsers();
    const startIndex = (currentPage - 1) * usersPerPage;
    return processedUsers.slice(startIndex, startIndex + usersPerPage);
  };

  // Total pages based on processed users
  const totalPages = Math.ceil(getProcessedUsers().length / usersPerPage);

  // Reset to first page when filters change
  const handleStatusFilter = (
    status: StatusFilter,
    tab: StatusFilter
  ): void => {
    setStatusFilter(status);
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleSortChange = (newSortBy: SortBy): void => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string): void => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // Handle modal actions
  const handleActionClick = (user: User, action: ActionType): void => {
    setSelectedUser(user);
    setActionType(action);
    setIsModalOpen(true);
  };

  const handleConfirmAction = (): void => {
    if (selectedUser && actionType) {
      const updatedUsers = usersList.map((user) =>
        user.id === selectedUser.id
          ? {
              ...user,
              status:
                actionType === "approve"
                  ? ("Approved" as const)
                  : ("Deny" as const),
            }
          : user
      );
      setUsersList(updatedUsers);
    }
    setIsModalOpen(false);
    setSelectedUser(null);
    setActionType(null);
  };

  const handleCancelAction = (): void => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setActionType(null);
  };

  return (
    <div className="px-10 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <StatsCards stat={stat as any} key={stat.title} />
        ))}
      </div>
      <div className="w-full mx-auto space-y-6 mt-10">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-6 w-6" />
          <Input
            placeholder="Search by name or email..."
            className="pl-10 border-border max-w-2xl py-6"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>

        {/* Tabs and Filter */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-8">
            <button
              className={`pb-2 text-sm font-medium transition-colors border-b-2 border-black`}
            >
              All Applications
            </button>
            <button
              onClick={() => router.push("/dashboard/coaching/coach")}
              className={`pb-2 text-sm font-medium transition-colors cursor-pointer hover:border-b-2 border-black`}
            >
              Create Coach
            </button>
          </div>

          <div className="flex gap-2">
            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 bg-transparent">
                  {sortBy === "newest" ? "Newest" : "Oldest"}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleSortChange("newest")}>
                  Newest
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange("oldest")}>
                  Oldest
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Filter Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 bg-transparent">
                  {activeTab}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => handleStatusFilter("All", "All")}
                >
                  All
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleStatusFilter("Pending", "Pending")}
                >
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleStatusFilter("Approved", "Approved")}
                >
                  Approved
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleStatusFilter("Deny", "Deny")}
                >
                  Denied
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Table */}
        <div className="border border-border rounded-lg overflow-hidden bg-card">
          {/* Table Header */}
          <div className="grid grid-cols-5 gap-4 p-4 bg-muted/50 border-b border-border text-sm font-medium text-muted-foreground">
            <div>User Name</div>
            <div>Email</div>
            <div>Status</div>
            <div>Joining Date</div>
            <div>Action</div>
          </div>

          <FilterCoaching
            filterCoachingByStatus={getPagedUsers}
            onActionClick={handleActionClick}
          />
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-end space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex space-x-1">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-8 h-8 p-0"
                  >
                    {page}
                  </Button>
                )
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="gap-1"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Confirmation Modal */}
        <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {actionType === "approve" ? "Approve" : "Deny"}
              </AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to{" "}
                {actionType === "approve" ? "approve" : "deny"}{" "}
                <strong>{selectedUser?.name}</strong>&apos;s application? This
                action will change their status.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancelAction}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirmAction}
                className={
                  actionType === "approve"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }
              >
                {actionType === "approve" ? "Approve" : "Deny"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default CoachingPage;
