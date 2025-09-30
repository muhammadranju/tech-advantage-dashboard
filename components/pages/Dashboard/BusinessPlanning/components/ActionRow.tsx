import React from "react";
import { Button } from "@/components/ui/button";
import { ListCollapse, Save } from "lucide-react";
import Link from "next/link";

interface ActionRowProps {
  viewHref: string;
  onSave: () => void;
  disabled?: boolean;
}

export function ActionRow({ viewHref, onSave, disabled }: ActionRowProps) {
  return (
    <div className="flex gap-4">
      <Link className="flex-1" href={viewHref}>
        <Button variant="outline" className="py-6 bg-transparent w-full">
          <ListCollapse /> View Details
        </Button>
      </Link>
      <Button
        className="flex-1 py-6 hover:bg-neutral-800"
        onClick={onSave}
        disabled={disabled}
      >
        <Save /> Save
      </Button>
    </div>
  );
}
