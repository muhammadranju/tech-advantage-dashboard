import { apiSlice } from "../apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all users
    totalCochairingUsers: builder.query({
      query: () => ({
        url: `/coaching/total-users`,
      }),
      providesTags: ["Coaching"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),
    dashboardApplicationRate: builder.query({
      query: () => ({
        url: `/dashboard`,
      }),
      providesTags: ["Dashboard"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),
    coachingUsers: builder.query({
      query: () => ({
        url: `/coaching/users`,
      }),
      providesTags: ["Coaching"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),

    updateCoachingStatus: builder.mutation({
      query: ({ userId, time, action }) => ({
        url: `/coaching/status/${userId}`,
        method: "PUT",
        body: { range: time, action: action },
      }),
      invalidatesTags: ["Coaching"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const {
  useTotalCochairingUsersQuery,
  useDashboardApplicationRateQuery,
  useCoachingUsersQuery,
  useUpdateCoachingStatusMutation,
} = authApiSlice;
