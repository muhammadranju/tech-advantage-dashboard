import { apiSlice } from "../apiSlice";

export const termsSliceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET All Terms & Conditions
    getTerms: builder.query({
      query: () => ({
        url: `terms-conditions`,
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
        url: `terms-conditions`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Terms-conditions"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),

    // update Terms & Conditions
    updateTerms: builder.mutation({
      query: ({ body }) => ({
        url: `terms-conditions`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["Terms-conditions"],
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
  useUpdateTermsMutation,
} = termsSliceApi;
