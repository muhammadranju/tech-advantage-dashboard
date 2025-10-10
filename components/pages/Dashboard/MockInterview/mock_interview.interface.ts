export interface Comment {
  _id: number;
  title: string;
  range: string;
  recomandedText: string;
}

export interface Answer {
  text: string;
  score: number | string;
}

export type TabType = "quiz" | "assessment";


interface SurveyOption {
  _id: string;
  text: string;
  score: number | string;
}

export interface SurveyCard {
  _id: string;
  question: string;
  answers: SurveyOption[];
}