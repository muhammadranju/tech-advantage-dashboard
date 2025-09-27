import { apiSlice } from "../apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all users
    getAssessments: builder.query({
      query: () => ({
        url: `/small/business/assessments`,
      }),
      providesTags: ["Assessments"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),
    getQuizAnswers: builder.query({
      query: ({ categoryId }) => ({
        url: `/small/business/${categoryId}/questions`,
      }),
      providesTags: ["Assessments"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),

    updateAssessments: builder.mutation({
      query: ({ userId, range, description, recommendedService }) => ({
        url: `/small/business/assessments/${userId}`,
        method: "PUT",
        body: {
          range: range,
          description: description,
          recommendedService: recommendedService,
        },
      }),
      invalidatesTags: ["Assessments"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const {
  useGetAssessmentsQuery,
  useGetQuizAnswersQuery,
  useUpdateAssessmentsMutation,
} = authApiSlice;
