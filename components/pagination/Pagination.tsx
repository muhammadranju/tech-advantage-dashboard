"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showIfSinglePage?: boolean;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  showIfSinglePage = false,
}: PaginationProps) => {
  if (!showIfSinglePage && totalPages <= 1) {
    return null;
  }



  return (
    <div className="flex items-center justify-end space-x-2 mt-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="gap-1"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>

      <div className="flex space-x-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "ghost"}
            size="sm"
            onClick={() => onPageChange(page)}
            className="w-8 h-8 p-0"
          >
            {page}
          </Button>
        ))}
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        className="gap-1"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
