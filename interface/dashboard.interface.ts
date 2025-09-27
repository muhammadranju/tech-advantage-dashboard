export interface ApplicationRate {
  month: string;
  value: number;
}

export interface CoachingUser {
  _id: string;
  name: string;
  email: string;
  status: "PENDING" | "APPROVED" | "DENIED";
  date: string;
  time: Array<{
    range: string;
    flag: boolean;
  }>;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
