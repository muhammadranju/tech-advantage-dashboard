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
import FreeUsers from "./FreeUsers";
import PremiumUsers from "./PremiumUsers";

export function UserManagement() {
  const [activeTab, setActiveTab] = useState("Free");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="w-full mx-auto space-y-6 mt-10">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-6 w-6" />
        <Input
          placeholder="Search here......"
          className="pl-10 bg-background border-border rounded-lg max-w-2xl py-6"
        />
      </div>

      {/* Tabs and Filter */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab("Free")}
            className={`pb-2 text-sm font-medium transition-colors ${
              activeTab === "Free"
                ? "text-foreground border-b-2 border-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Free
          </button>
          <button
            onClick={() => setActiveTab("Premium")}
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
            <DropdownMenuItem>All Users</DropdownMenuItem>
            <DropdownMenuItem>Free Users</DropdownMenuItem>
            <DropdownMenuItem>Premium Users</DropdownMenuItem>
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

        {/* Table Rows */}
        {activeTab === "Free" ? <FreeUsers /> : <PremiumUsers />}
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
          {[1, 2, 3].map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "ghost"}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className="w-8 h-8 p-0"
            >
              {page}
            </Button>
          ))}
          <span className="flex items-center px-2 text-sm text-muted-foreground">
            ...
          </span>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentPage(currentPage + 1)}
          className="gap-1"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
