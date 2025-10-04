/* eslint-disable @typescript-eslint/no-explicit-any */

import { apiSlice } from "../apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all users
    getAllUsers: builder.query({
      query: () => ({
        url: `${process.env.NEXT_PUBLIC_API_URL}/user/all`,
      }),
      providesTags: ["User"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),

    blockedUser: builder.mutation({
      query: (id: string) => ({
        url: `${process.env.NEXT_PUBLIC_API_URL}/user/block/${id}`,
        method: "PATCH",
      }),
      // This is the key fix - invalidate User tags to trigger refetch
      invalidatesTags: ["User"],
      transformResponse: (response) => {
        return response;
      },
      // Optional: Optimistic updates for better UX
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        // Optimistically update the cache
        const patchResult = dispatch(
          userApiSlice.util.updateQueryData(
            "getAllUsers",
            undefined,
            (draft: any) => {
              if (Array.isArray(draft)) {
                const user = draft.find((u: any) => u._id === id);
                if (user) {
                  user.userStatus = "blocked";
                }
              } else if (draft?.data && Array.isArray(draft.data)) {
                const user = draft.data.find((u: any) => u._id === id);
                if (user) {
                  user.userStatus = "blocked";
                }
              }
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          // If the mutation fails, undo the optimistic update
          patchResult.undo();
        }
      },
    }),

    unblockUser: builder.mutation({
      query: (id: string) => ({
        url: `${process.env.NEXT_PUBLIC_API_URL}/user/unblock/${id}`,
        method: "PATCH",
      }),
      // This is the key fix - invalidate User tags to trigger refetch
      invalidatesTags: ["User"],
      transformResponse: (response) => {
        return response;
      },
      // Optional: Optimistic updates for better UX
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        // Optimistically update the cache
        const patchResult = dispatch(
          userApiSlice.util.updateQueryData(
            "getAllUsers",
            undefined,
            (draft: any) => {
              if (Array.isArray(draft)) {
                const user = draft.find((u: any) => u._id === id);
                if (user) {
                  user.userStatus = "active";
                }
              } else if (draft?.data && Array.isArray(draft.data)) {
                const user = draft.data.find((u: any) => u._id === id);
                if (user) {
                  user.userStatus = "active";
                }
              }
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          // If the mutation fails, undo the optimistic update
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useBlockedUserMutation,
  useUnblockUserMutation,
} = userApiSlice;
