/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import FilterCoaching from "@/components/coaching/FilterCoaching";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { StatCardSkeleton } from "@/components/skeletons/StatCardSkeleton";
import { UsersTableSkeleton } from "@/components/skeletons/UsersTableSkeleton";
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
import { ChevronLeft, ChevronRight, FileText, Search } from "lucide-react";
import {
  ActionType,
  CoachingUser,
  SortBy,
  Stat,
  StatusFilter,
} from "./coaching.interface";

// Helper functions
const sortUsers = (users: CoachingUser[], sortBy: SortBy) =>
  [...users].sort((a, b) => {
    const diff =
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    return sortBy === "newest" ? -diff : diff;
  });

const filterUsers = (
  users: CoachingUser[],
  status: StatusFilter,
  query: string
) =>
  users.filter((u) => {
    const statusMatch = status === "All" || u.status === status;
    const queryMatch =
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase());
    return statusMatch && queryMatch;
  });

const CoachingPage = () => {
  const [activeTab, setActiveTab] = useState<StatusFilter>("All");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<CoachingUser | null>(null);
  const [actionType, setActionType] = useState<ActionType | null>(null);

  const { data, isLoading, error } = useCoachingUsersQuery(null);
  const [updateCoachingStatus] = useUpdateCoachingStatusMutation();
  const router = useRouter();
  const usersPerPage = 8;

  const coachingUsers = useMemo<CoachingUser[]>(() => data?.data || [], [data]);

  // Stats
  const stats: Stat[] = useMemo(
    () => [
      {
        title: "Total Application",
        value: coachingUsers.length.toString(),
        changeType: "positive",
        icon: FileText,
      },
      {
        title: "Total Approve Application",
        value: coachingUsers
          .filter((u) => u.status === "APPROVED")
          .length.toString(),
        changeType: "positive",
        icon: FileText,
      },
      {
        title: "Total Deny Application",
        value: coachingUsers
          .filter((u) => u.status === "DENIED")
          .length.toString(),
        changeType: "positive",
        icon: FileText,
      },
    ],
    [coachingUsers]
  );

  // Processed users (filter + search + sort)
  const processedUsers = useMemo(
    () =>
      sortUsers(filterUsers(coachingUsers, statusFilter, searchQuery), sortBy),
    [coachingUsers, statusFilter, searchQuery, sortBy]
  );

  const totalPages = Math.ceil(processedUsers.length / usersPerPage);
  const pagedUsers = useMemo(
    () =>
      processedUsers.slice(
        (currentPage - 1) * usersPerPage,
        currentPage * usersPerPage
      ),
    [processedUsers, currentPage]
  );

  // Handlers
  const handleStatusFilter = (status: StatusFilter) => {
    setStatusFilter(status);
    setActiveTab(status);
    setCurrentPage(1);
  };
  const handleSortChange = (newSort: SortBy) => {
    setSortBy(newSort);
    setCurrentPage(1);
  };
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };
  const handleActionClick = (user: CoachingUser, action: ActionType) => {
    setSelectedUser(user);
    setActionType(action);
    setIsModalOpen(true);
  };
  const handleConfirmAction = async () => {
    if (!selectedUser || !actionType) return;

    await updateCoachingStatus({
      userId: selectedUser._id,
      time: selectedUser.time[0].range,
      action: actionType,
    }).unwrap();

    toast.success(
      `User ${actionType === "APPROVED" ? "approved" : "denied"} successfully!`
    );
    setIsModalOpen(false);
    setSelectedUser(null);
    setActionType(null);
  };
  const handleCancelAction = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setActionType(null);
  };

  if (error) return <div className="text-red-500 p-6">Error loading data.</div>;

  return (
    <div className="px-10 mt-5 min-h-screen">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? stats.map((s) => <StatCardSkeleton key={s.title} />)
          : stats.map((s) => <StatsCards stat={s as any} key={s.title} />)}
      </div>

      <div className="w-full mx-auto space-y-6 mt-10">
        {/* Search */}
        <div className="relative max-w-2xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-6 w-6" />
          <Input
            placeholder="Search by name or email..."
            className="pl-10 py-6"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>

        {/* Tabs + Sort + Filter */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-8">
            <button className="pb-2 text-sm font-medium border-b-2 border-black">
              All Applications ({coachingUsers.length})
            </button>
            <button
              onClick={() => router.push("/dashboard/coaching/coach")}
              className="pb-2 text-sm font-medium cursor-pointer hover:border-b-2 border-black"
            >
              Coach Booking
            </button>
          </div>

          <div className="flex gap-2">
            {/* Sort */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 bg-transparent">
                  {sortBy === "newest" ? "Newest" : "Oldest"}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {(["newest", "oldest"] as SortBy[]).map((s) => (
                  <DropdownMenuItem key={s} onClick={() => handleSortChange(s)}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Status Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 bg-transparent">
                  {activeTab}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {(
                  ["All", "PENDING", "APPROVED", "DENIED"] as StatusFilter[]
                ).map((status) => (
                  <DropdownMenuItem
                    key={status}
                    onClick={() => handleStatusFilter(status)}
                  >
                    {status}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Table */}
        <div className="border border-border rounded-lg overflow-hidden bg-card">
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
              filterCoachingByStatus={() => pagedUsers}
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
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Button
                key={p}
                variant={currentPage === p ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentPage(p)}
                className="w-8 h-8 p-0"
              >
                {p}
              </Button>
            ))}

            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* No data */}
        {processedUsers.length === 0 && (
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
                {actionType === "APPROVED" ? "Approve" : "Deny"} Application
              </AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to {actionType?.toLowerCase()}{" "}
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
                  actionType === "APPROVED"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }
              >
                {actionType === "APPROVED" ? "Approve" : "Deny"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default CoachingPage;
