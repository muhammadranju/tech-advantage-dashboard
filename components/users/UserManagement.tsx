"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FilterUsers from "@/components/users/FilterUsers";

const users = [
  {
    id: 1,
    name: "John b",
    email: "xyzhpc@gmail.com",
    status: "Free",
    joiningDate: "10/09/25",
  },
  {
    id: 2,
    name: "John b",
    email: "xyzhpc@gmail.com",
    status: "Premium",
    joiningDate: "10/09/25",
  },
  {
    id: 3,
    name: "John b",
    email: "xyzhpc@gmail.com",
    status: "Free",
    joiningDate: "10/09/25",
  },
  {
    id: 4,
    name: "John b",
    email: "xyzhpc@gmail.com",
    status: "Premium",
    joiningDate: "10/09/25",
  },
  {
    id: 5,
    name: "John b",
    email: "xyzhpc@gmail.com",
    status: "Free",
    joiningDate: "10/09/25",
  },
  {
    id: 6,
    name: "John b",
    email: "xyzhpc@gmail.com",
    status: "Premium",
    joiningDate: "10/09/25",
  },
  {
    id: 7,
    name: "John b",
    email: "xyzhpc@gmail.com",
    status: "Free",
    joiningDate: "10/09/25",
  },
  {
    id: 8,
    name: "Alice W",
    email: "alice@gmail.com",
    status: "Premium",
    joiningDate: "10/09/25",
  },
  {
    id: 9,
    name: "Bob K",
    email: "bob@gmail.com",
    status: "Free",
    joiningDate: "10/09/25",
  },
  {
    id: 10,
    name: "Charlie P",
    email: "charlie@gmail.com",
    status: "Premium",
    joiningDate: "10/09/25",
  },
  {
    id: 11,
    name: "David L",
    email: "david@gmail.com",
    status: "Free",
    joiningDate: "10/09/25",
  },
  {
    id: 12,
    name: "Eva S",
    email: "eva@gmail.com",
    status: "Premium",
    joiningDate: "10/09/25",
  },
  {
    id: 13,
    name: "Frank T",
    email: "frank@gmail.com",
    status: "Free",
    joiningDate: "10/09/25",
  },
  {
    id: 14,
    name: "Grace H",
    email: "grace@gmail.com",
    status: "Premium",
    joiningDate: "10/09/25",
  },
  {
    id: 15,
    name: "Hannah R",
    email: "hannah@gmail.com",
    status: "Free",
    joiningDate: "10/09/25",
  },
  {
    id: 16,
    name: "Ivy D",
    email: "ivy@gmail.com",
    status: "Premium",
    joiningDate: "10/09/25",
  },
  {
    id: 17,
    name: "Jack Q",
    email: "jack@gmail.com",
    status: "Free",
    joiningDate: "10/09/25",
  },
  {
    id: 18,
    name: "Kim W",
    email: "kim@gmail.com",
    status: "Premium",
    joiningDate: "10/09/25",
  },
  {
    id: 19,
    name: "Leo F",
    email: "leo@gmail.com",
    status: "Free",
    joiningDate: "10/09/25",
  },
  {
    id: 20,
    name: "Mia J",
    email: "mia@gmail.com",
    status: "Premium",
    joiningDate: "10/09/25",
  },
  {
    id: 21,
    name: "Nina M",
    email: "nina@gmail.com",
    status: "Free",
    joiningDate: "10/09/25",
  },
  {
    id: 22,
    name: "Oscar G",
    email: "oscar@gmail.com",
    status: "Premium",
    joiningDate: "10/09/25",
  },
  {
    id: 23,
    name: "Paul V",
    email: "paul@gmail.com",
    status: "Free",
    joiningDate: "10/09/25",
  },
  {
    id: 24,
    name: "Quincy Y",
    email: "quincy@gmail.com",
    status: "Premium",
    joiningDate: "10/09/25",
  },
];

export function UserManagement() {
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const usersPerPage = 5; // Define how many users you want per page

  // Filter users by status and search query
  const filterUsersByStatusAndSearch = () => {
    let filteredUsers = users;

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

    return filteredUsers;
  };

  // Paginate the filtered users
  const getPagedUsers = () => {
    const filteredUsers = filterUsersByStatusAndSearch();
    const startIndex = (currentPage - 1) * usersPerPage;
    return filteredUsers.slice(startIndex, startIndex + usersPerPage);
  };

  const totalPages = Math.ceil(
    filterUsersByStatusAndSearch().length / usersPerPage
  ); // Total number of pages

  return (
    <div className="w-full mx-auto space-y-6 mt-10">
      {/* Search Bar */}
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
            All
          </button>
          <button
            onClick={() => [setActiveTab("Free"), setStatusFilter("Free")]}
            className={`pb-2 text-sm font-medium transition-colors ${
              activeTab === "Free"
                ? "text-foreground border-b-2 border-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Free
          </button>
          <button
            onClick={() => [
              setActiveTab("Premium"),
              setStatusFilter("Premium"),
            ]}
            className={`pb-2 text-sm font-medium transition-colors ${
              activeTab === "Premium"
                ? "text-foreground border-b-2 border-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Premium
          </button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 bg-transparent">
              Filter by
              <ChevronRight className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setStatusFilter("All")}>
              All Users
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("Free")}>
              Free Users
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("Premium")}>
              Premium Users
            </DropdownMenuItem>
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
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          className="gap-1"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
