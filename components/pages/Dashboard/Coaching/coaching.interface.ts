/* eslint-disable @typescript-eslint/no-explicit-any */
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
export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  displayText: string;
}

export interface BookingDetail {
  date: string;
  slot1?: string;
  slot2?: string;
  slot3?: string;
}

export interface Coach {
  id: number;
  name: string;
  description: string;
  availableDates: Date[];
  timeSlots: TimeSlot[];
}

export interface BookingData {
  name: string;
  description: string;
  details: BookingDetail[];
}

export type StatusFilter = "All" | "PENDING" | "APPROVED" | "DENIED";
export type SortBy = "newest" | "oldest";
export type ActionType = "APPROVED" | "DENIED";

export interface Stat {
  title: string;
  value: string;
  changeType: "positive" | "negative";
  icon: React.ComponentType<any>;
}
