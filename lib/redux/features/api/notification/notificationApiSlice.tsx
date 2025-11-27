import { apiSlice } from "../apiSlice";

export const notificationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all users
    sendNotification: builder.mutation({
      query: ({ body }) => ({
        url: `/notification/send`,
        method: "POST",
        body: {
          title: body.title,
          description: body.description,
        },
      }),
      invalidatesTags: ["QuestionAnswer"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),

    getNotifications: builder.query({
      query: () => ({
        url: `/notification`,
        method: "GET",
      }),
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const { useSendNotificationMutation, useGetNotificationsQuery } =
  notificationApiSlice;
