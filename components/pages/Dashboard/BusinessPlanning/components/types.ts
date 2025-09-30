/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Answer {
  answer: string;
}

export interface Question {
  questionText: string;
  answers: Answer[];
}

export type TabType = "quiz" | "long-question";

export interface Stat {
  title: string;
  value: number;
  changeType: "positive" | "negative";
  icon: any;
}
