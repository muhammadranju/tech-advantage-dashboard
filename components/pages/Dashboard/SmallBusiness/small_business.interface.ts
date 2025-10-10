export interface Assessment {
  _id: string;
  range: string;
  description: string;
  recommendedService: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Interface for editing data
export interface EditData {
  _id: string;
  range: string;
  description: string;
  recommendedService: string;
}

export interface Question {
  questionText: string;
  answers: { text: string; score: number }[];
}
