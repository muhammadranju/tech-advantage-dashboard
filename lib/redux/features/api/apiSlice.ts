import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../store";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers, { getState }) => {
      // Get token from auth state
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      // headers.set("content-type", "application/json");
      return headers;
    },
  }),
  tagTypes: [
    "User",
    "Coaching",
    "Dashboard",
    "Assessments",
    "QuestionAnswer",
    "SuccessPath",
    "BootCamp",
    "Playlists",
    "Profile",
    "Coaching",
    "Courses",
    "Modules",
    "Contents",
    "MockInterview",
    "Notifications",
    "Community",
    "Terms-conditions",
  ],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  endpoints: (builder) => ({}),
});
