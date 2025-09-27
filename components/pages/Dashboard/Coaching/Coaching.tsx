/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { FileText } from "lucide-react";

import FilterCoaching from "@/components/coaching/FilterCoaching";
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
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  useCoachingUsersQuery,
  useUpdateCoachingStatusMutation,
} from "@/lib/redux/features/api/coaching/coachingApiSlice";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { StatCardSkeleton } from "@/components/skeletons/StatCardSkeleton";
import { UsersTableSkeleton } from "@/components/skeletons/UsersTableSkeleton";
import { toast } from "sonner";

// Type definitions based on your API data structure
interface User {
  _id: string;
  name: string;
  email: string;
  status: "PENDING" | "APPROVED" | "DENY";
  date: string;
  time: Array<{
    range: string;
    flag: boolean;
  }>;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Stat {
  title: string;
  value: string;
  changeType: "positive" | "negative";
  icon: React.ComponentType<any>;
}

type StatusFilter = "All" | "PENDING" | "APPROVED" | "DENY";
type SortBy = "newest" | "oldest";
type ActionType = "approve" | "deny";

const CoachingPage = () => {
  const [activeTab, setActiveTab] = useState<StatusFilter>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortBy>("newest");

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [actionType, setActionType] = useState<ActionType | null>(null);

  // Fetch coaching users data
  const { data, isLoading, error } = useCoachingUsersQuery(null);
  const coachingUsers: User[] = data?.data || [];
  const [updateCoachingStatus] = useUpdateCoachingStatusMutation();

  const router = useRouter();
  const usersPerPage = 8;

  // Calculate statistics dynamically from API data
  const totalApplications = coachingUsers.length;
  const totalApproved = coachingUsers.filter(
    (user) => user.status === "APPROVED"
  ).length;
  const totalDenied = coachingUsers.filter(
    (user) => user.status === "DENY"
  ).length;

  const stats: Stat[] = [
    {
      title: "Total Application",
      value: totalApplications.toString(),
      changeType: "positive",
      icon: FileText,
    },
    {
      title: "Total Approve Application",
      value: totalApproved.toString(),
      changeType: "positive",
      icon: FileText,
    },
    {
      title: "Total Deny Application",
      value: totalDenied.toString(),
      changeType: "positive",
      icon: FileText,
    },
  ];

  // Convert ISO date string to Date object for proper sorting
  const parseDate = (isoDateString: string): Date => {
    return new Date(isoDateString);
  };

  // Filter, sort and search users
  const getProcessedUsers = (): User[] => {
    let filteredUsers = [...coachingUsers];

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

    // Apply sorting by date (using createdAt)
    filteredUsers.sort((a, b) => {
      const dateA = parseDate(a.createdAt);
      const dateB = parseDate(b.createdAt);

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

  const handleConfirmAction = async () => {
    if (selectedUser && actionType) {
      console.log(`${actionType} user:`, selectedUser);

      // You can add your API call here to update the user status
      const result = await updateCoachingStatus({
        userId: selectedUser._id,
        time: selectedUser.time[0].range,
        action: actionType === "approve" ? "APPROVED" : "DENY",
      }).unwrap();

      if (result.status === 200 && actionType === "approve") {
        toast.success("User approved successfully!");
      } else if (result.status === 200 && actionType === "deny") {
        toast.success("User denied successfully!");
      }
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

  // Error state
  if (error) {
    return (
      <div className="px-10 py-4">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-500">
            Error loading data. Please try again.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-10 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? stats.map((stat) => <StatCardSkeleton key={stat.title} />)
          : stats.map((stat) => (
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
              All Applications ({totalApplications})
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
                  {activeTab === "All" ? "All" : activeTab}
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
                  onClick={() => handleStatusFilter("PENDING", "PENDING")}
                >
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleStatusFilter("APPROVED", "APPROVED")}
                >
                  Approved
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleStatusFilter("DENY", "DENY")}
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
            <div>Application Date</div>
            <div>Action</div>
          </div>

          {isLoading ? (
            <UsersTableSkeleton />
          ) : (
            <FilterCoaching
              filterCoachingByStatus={getPagedUsers}
              onActionClick={handleActionClick}
            />
          )}
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

        {/* No data message */}
        {getProcessedUsers().length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            {searchQuery || statusFilter !== "All"
              ? "No applications found matching your criteria."
              : "No coaching applications available."}
          </div>
        )}

        {/* Confirmation Modal */}
        <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {actionType === "approve" ? "Approve" : "Deny"} Application
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
