"use client";
import { useState, useEffect } from "react";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import FilterUsers from "@/components/users/FilterUsers";
import { useGetAllUsersQuery } from "@/lib/redux/features/api/users/userApiSlice";
import { IUsersTableProps } from "@/utils/usersData/usersData";
import { ChevronDown, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { PiUsersThreeBold } from "react-icons/pi";

const UserPage = () => {
  const [selectedFilter, setSelectedFilter] = useState("All"); // Active filter
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<IUsersTableProps[]>([]);
  const [activeTab, setActiveTab] = useState("All");

  const { data, isLoading } = useGetAllUsersQuery({
    page: 1,
    limit: 100, // fetch all users for client-side filtering
  });

  const stats = [
    {
      title: "Total Users",
      value: users.length,

      icon: PiUsersThreeBold,
    },
  ];

  useEffect(() => {
    if (data?.data?.data) {
      setUsers(data.data.data);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
    <div className="px-10 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <StatsCards stat={stat} key={stat.title} />
        ))}
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

          <FilterUsers users={() => pagedUsers} />
        </div>

        {/* Pagination */}
        {pagedUsers.length > 0 && (
          <div className="flex items-center justify-end space-x-2 mt-4">
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
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
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
              className="gap-1"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;
