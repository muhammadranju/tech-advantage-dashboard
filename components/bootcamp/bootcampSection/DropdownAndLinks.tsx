"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Option {
  label: string;
  route: string;
}

interface DropdownAndLinksProps {
  initialOption: string;
  options: Option[];
  staticLabel?: string; // Optional static label for the left tab/button
  staticLabel2?: string; // Optional static label for the left tab/button
}

const DropdownAndLinks = ({
  initialOption,
  options,
}: //
DropdownAndLinksProps) => {
  const [selectedOption, setSelectedOption] = useState(initialOption);
  const router = useRouter();

  const handleSelect = (label: string) => {
    const selected = options.find((option) => option.label === label);
    if (selected) {
      router.push(selected.route);
    }
    setSelectedOption(label);
  };
  return (
    <div className="flex justify-between gap-8 ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2 bg-transparent p-5">
            {selectedOption}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {options.map((option) => (
            <DropdownMenuItem
              key={option.label}
              onClick={() => handleSelect(option.label)}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropdownAndLinks;
