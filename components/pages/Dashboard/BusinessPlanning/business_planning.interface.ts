export interface SurveyOption {
  answer: string;
}

export interface SurveyCard {
  _id: string;
  questionText: string;
  answers: SurveyOption[];
  answer: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}