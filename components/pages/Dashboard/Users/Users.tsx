/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { StatsCards } from "@/components/dashboard/StatsCards";
import Pagination from "@/components/pagination/Pagination";
import { StatCardSkeleton } from "@/components/skeletons/StatCardSkeleton";
import { UsersTableSkeleton } from "@/components/skeletons/UsersTableSkeleton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import FilterUsers from "@/components/users/FilterUsers";
import {
  useGetAllUsersQuery,
  useGetBlockedUsersQuery,
} from "@/lib/redux/features/api/users/userApiSlice";
import { ChevronDown, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { PiUsersThreeBold } from "react-icons/pi";

const UserPage = () => {
  const [selectedFilter, setSelectedFilter] = useState("All"); // Active filter
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const { data: blockedUsersData } = useGetBlockedUsersQuery(null);
  const { data, isLoading } = useGetAllUsersQuery({
    page: 1,
    limit: 100, // fetch all users for client-side filtering
  });

  const stats = [
    {
      title: "Total Users",
      value: users?.length,
      icon: PiUsersThreeBold,
    },
    {
      title: "Total Blocked Users",
      value: blockedUsersData?.data?.length,
      icon: PiUsersThreeBold,
    },
  ];

  useEffect(() => {
    if (data?.data?.data) {
      setUsers(data.data.data);
    }
  }, [data]);

  const usersPerPage = 8;

  // Apply filtering based on dropdown selection
  const getFilteredUsers = () => {
    let filtered = [...users];

    // Search filtering
    if (searchQuery) {
      filtered = filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          u.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by selected filter (All, Newest, Oldest, Blocked)
    if (selectedFilter === "Blocked") {
      filtered = filtered.filter((u) => u.userStatus === "blocked");
    }
    if (activeTab === "Blocked") {
      filtered = filtered.filter((u) => u.userStatus === "blocked");
    }

    // Sorting by Newest or Oldest
    if (selectedFilter === "Newest") {
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (selectedFilter === "Oldest") {
      filtered.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }

    return filtered;
  };

  const filteredUsers = getFilteredUsers();

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const pagedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <div className="px-10 mt-5 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? stats.map((stat) => <StatCardSkeleton key={stat.title} />)
          : stats.map((stat) => <StatsCards stat={stat} key={stat.title} />)}
      </div>

      <div className="w-full mx-auto space-y-6 mt-10">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-6 w-6" />
          <Input
            placeholder="Search here..."
            className="pl-10 border-border max-w-2xl py-6"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter Dropdown */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-8">
            <button
              onClick={() => [setActiveTab("All")]}
              className={`pb-2 text-sm font-medium transition-colors ${
                activeTab === "All"
                  ? "text-foreground border-b-2 border-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All User
            </button>
            <button
              onClick={() => [setActiveTab("Blocked")]}
              className={`pb-2 text-sm font-medium transition-colors ${
                activeTab === "Blocked"
                  ? "text-foreground border-b-2 border-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Blocked Users
            </button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 w-36 h-10">
                {selectedFilter}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {["All", "Newest", "Oldest", "Blocked"].map((filter) => (
                <DropdownMenuItem
                  key={filter}
                  onClick={() => {
                    setSelectedFilter(filter);
                    setCurrentPage(1); // reset pagination on filter change
                  }}
                >
                  {filter}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Users Table */}
        <div className="border border-border rounded-lg overflow-hidden bg-card">
          <div className="grid grid-cols-5 gap-4 p-4 bg-muted/50 border-b border-border text-sm font-medium text-muted-foreground">
            <div>User Name</div>
            <div>Email</div>
            <div>Status</div>
            <div>Joining Date</div>
            <div>Action</div>
          </div>
          {isLoading ? (
            <UsersTableSkeleton />
          ) : (
            <FilterUsers users={() => pagedUsers} />
          )}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default UserPage;
