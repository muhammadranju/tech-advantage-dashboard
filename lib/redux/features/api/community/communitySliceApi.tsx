import { apiSlice } from "../apiSlice";

export const communitySliceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //Community - Get All Groups
    getCommunityGroups: builder.query({
      query: () => ({
        url: `groups`,
        method: "GET",
      }),
      providesTags: ["Community"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),

    getSingleCommunityGroup: builder.query({
      query: ({ groupId }) => ({
        url: `groups/${groupId}`,
        method: "GET",
      }),
      providesTags: ["Community"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),
    // Community - create Group
    createCommunityGroup: builder.mutation({
      query: (formData: FormData) => ({
        url: `groups`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Community"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),

    // update community group
    updateCommunityGroup: builder.mutation({
      query: ({ id, body }) => ({
        url: `groups/${id}`,
        method: "PUT",
        body: {
          range: body.range,
          recomandedText: body.recomandedText,
        },
      }),
      invalidatesTags: ["Community"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),

    // delete community
    deleteCommunityGroup: builder.mutation({
      query: ({ id }) => ({
        url: `groups/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Community"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),
    // Community -  Get Single Group
    replayCommunityGroup: builder.query({
      query: ({ groupId }) => ({
        url: `bootcamp/community/${groupId}`,
        method: "POST",
      }),
      providesTags: ["Community"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const {
  useGetCommunityGroupsQuery,
  useCreateCommunityGroupMutation,
  useUpdateCommunityGroupMutation,
  useDeleteCommunityGroupMutation,
  useReplayCommunityGroupQuery,
} = communitySliceApi;
