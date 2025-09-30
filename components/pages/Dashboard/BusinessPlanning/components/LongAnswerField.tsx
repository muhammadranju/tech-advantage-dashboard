import React from "react";
import { Textarea } from "@/components/ui/textarea";

interface LongAnswerFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function LongAnswerField({ value, onChange }: LongAnswerFieldProps) {
  return (
    <div>
      <label className="block text-lg font-medium mb-2">Answer</label>
      <Textarea
        placeholder="Enter question answer"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="py-6 flex-1"
      />
    </div>
  );
}
