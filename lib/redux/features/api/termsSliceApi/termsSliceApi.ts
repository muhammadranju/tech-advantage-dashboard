import { apiSlice } from "../apiSlice";

export const termsSliceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET All Terms & Conditions
    getTerms: builder.query({
      query: () => ({
        url: `terms-condition`,
        method: "GET",
      }),
      providesTags: ["Terms-conditions"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),

    // POST Terms & Conditions
    createTerms: builder.mutation({
      query: ({ body }) => ({
        url: `terms-condition`,
        method: "POST",
        body: { content: body.content },
      }),
      invalidatesTags: ["Terms-conditions"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),

    // GET feedback
    getFeedback: builder.query({
      query: () => ({
        url: `feedback`,
        method: "GET",
      }),
      providesTags: ["Terms-conditions"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const {
  useGetTermsQuery,
  useCreateTermsMutation,

  useGetFeedbackQuery,
} = termsSliceApi;
