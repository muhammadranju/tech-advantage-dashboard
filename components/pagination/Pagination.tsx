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

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <Button
        variant="outline"
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" /> Previous
      </Button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}
      <Button
        variant="outline"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;