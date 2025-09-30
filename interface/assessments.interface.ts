export interface SurveyOption {
  _id: string;
  text: string;
  score: string;
}

export interface SurveyCard {
  _id: string;
  questionText: string;
  answers: SurveyOption[];
}
