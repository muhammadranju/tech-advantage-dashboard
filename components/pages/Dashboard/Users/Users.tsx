"use client";
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
import getUsers, { IUsersTableProps } from "@/utils/usersData/usersData";
import { ChevronDown, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { PiUsersThreeBold } from "react-icons/pi";
const stats = [
  {
    title: "Total Users",
    value: "8,642",
    change: "+6.3%",
    changeType: "positive" as const,
    icon: PiUsersThreeBold,
  },
];
const UserPage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<string | null>("All");
  const [users, setUsers] = useState<IUsersTableProps[]>([]);

  let filteredUsers = users || [];
  const selected = ["All", "Newest", "Oldest", "Blocked"];

  const usersPerPage = 8; // Define how many users you want per page

  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users as IUsersTableProps[]);
    });
  }, []); // Adding empty dependency to run only once on mount

  // Filter users by status and search query
  const filterUsersByStatusAndSearch = () => {
    let filteredUsers = users;

    // Apply status filter
    if (statusFilter !== "All") {
      filteredUsers = filteredUsers.filter(
        (user: IUsersTableProps) => user.status === statusFilter
      );
    }

    // Apply search query filter
    if (searchQuery) {
      filteredUsers = filteredUsers.filter(
        (user: IUsersTableProps) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filteredUsers;
  };

  // Paginate the filtered users
  const getPagedUsers = () => {
    filteredUsers = filterUsersByStatusAndSearch(); // Re-filter users on every pagination
    const startIndex = (currentPage - 1) * usersPerPage;
    return filteredUsers.slice(startIndex, startIndex + usersPerPage);
  };

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage); // Total number of pages

  // Handle status filter update from dropdown
  const handleDropdownChange = (filter: string) => {
    setStatusFilter(filter);
    setSelectedUser(filter);
  };

  return (
    <div className="px-10 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <StatsCards stat={stat} key={stat.title} />
        ))}
      </div>
      <div className="w-full mx-auto space-y-6 mt-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-6 w-6" />
          <Input
            placeholder="Search here......"
            className="pl-10 bg-background border-border max-w-2xl py-6"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Tabs and Filter */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-8">
            <button
              onClick={() => [setActiveTab("All"), setStatusFilter("All")]}
              className={`pb-2 text-sm font-medium transition-colors ${
                activeTab === "All"
                  ? "text-foreground border-b-2 border-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All User
            </button>
            <button
              onClick={() => [
                setActiveTab("Blocked"),
                setStatusFilter("Blocked"),
              ]}
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
              <Button variant="outline" className="gap-2 w-36 h-10 ">
                {selectedUser || "Filter by"}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {selected.map((select) => (
                <DropdownMenuItem
                  key={select}
                  onClick={() => handleDropdownChange(select)}
                >
                  {select}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
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

          <FilterUsers users={getPagedUsers} />
        </div>

        {/* Pagination */}
        {getPagedUsers().length > 0 && (
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
