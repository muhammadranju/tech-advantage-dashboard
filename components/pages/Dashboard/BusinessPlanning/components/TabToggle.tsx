import React from "react";
import { TabType } from "./types";
// import { TabType } from "../types";

interface TabToggleProps {
  active: TabType;
  setActive: (t: TabType) => void;
}

export function TabToggle({ active, setActive }: TabToggleProps) {
  return (
    <div className="flex gap-8">
      <button
        onClick={() => setActive("quiz")}
        className={`pb-2 text-lg font-medium ${
          active === "quiz"
            ? "text-black border-b-2 border-black"
            : "text-neutral-500"
        }`}
      >
        Quiz
      </button>
      <button
        onClick={() => setActive("long-question")}
        className={`pb-2 text-lg font-medium ${
          active === "long-question"
            ? "text-black border-b-2 border-black"
            : "text-neutral-500"
        }`}
      >
        Long Question
      </button>
    </div>
  );
}
