import React from "react";
import { Input } from "@/components/ui/input";

interface QuestionFieldProps {
  value: string;
  onChange: (v: string) => void;
}

export function QuestionField({ value, onChange }: QuestionFieldProps) {
  return (
    <div>
      <label className="block text-lg font-medium mb-2">Questions</label>
      <Input
        placeholder="Enter your question"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="py-6"
      />
    </div>
  );
}
