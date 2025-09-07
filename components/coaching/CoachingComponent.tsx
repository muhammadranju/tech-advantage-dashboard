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
import FilterCoaching from "./FilterCoaching";

const users = [
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

export function CoachingComponent() {
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const usersPerPage = 5; // Define how many users you want per page

  // Filter users by status and search query
  const filterCoachingByStatusAndSearch = () => {
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
    const filteredUsers = filterCoachingByStatusAndSearch();
    const startIndex = (currentPage - 1) * usersPerPage;
    return filteredUsers.slice(startIndex, startIndex + usersPerPage);
  };

  // Total pages based on the filtered users
  const totalPages = Math.ceil(
    filterCoachingByStatusAndSearch().length / usersPerPage
  );

  return (
    <div className="w-full mx-auto space-y-6 mt-10">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-6 w-6" />
        <Input
          placeholder="Search by name or email..."
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
            onClick={() => [
              setActiveTab("Approved"),
              setStatusFilter("Approved"),
            ]}
            className={`pb-2 text-sm font-medium transition-colors ${
              activeTab === "Approved"
                ? "text-foreground border-b-2 border-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => [
              setActiveTab("Pending"),
              setStatusFilter("Pending"),
            ]}
            className={`pb-2 text-sm font-medium transition-colors ${
              activeTab === "Pending"
                ? "text-foreground border-b-2 border-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => [setActiveTab("Deny"), setStatusFilter("Deny")]}
            className={`pb-2 text-sm font-medium transition-colors ${
              activeTab === "Deny"
                ? "text-foreground border-b-2 border-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Deny
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
            <DropdownMenuItem onClick={() => setStatusFilter("Pending")}>
              Pending Users
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("Approved")}>
              Approved Users
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("Deny")}>
              Denied Users
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

        <FilterCoaching filterCoachingByStatus={getPagedUsers} />
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
