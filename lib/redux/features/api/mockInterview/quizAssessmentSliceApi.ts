import { apiSlice } from "../apiSlice";

export const quizAssessmentSliceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Mock Interview - Get All Videos
    getQuizAssessment: builder.query({
      query: () => ({
        url: `mock/interview/assessments`,
        method: "GET",
      }),
      providesTags: ["Assessments"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),
    // Mock Interview - Upload Video
    createQuizAssessments: builder.mutation({
      query: ({ body }) => ({
        url: `mock/interview/assessments`,
        method: "POST",
        body: {
          range: body.range,
          recomandedText: body.recomandedText,
        },
      }),
      invalidatesTags: ["Assessments"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),

    // update mock interview
    updateQuizAssessments: builder.mutation({
      query: ({ id, body }) => ({
        url: `mock/interview/assessments/${id}`,
        method: "PUT",
        body: {
          range: body.range,
          recomandedText: body.recomandedText,
        },
      }),
      invalidatesTags: ["Assessments"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),

    // delete mock interview
    deleteQuizAssessments: builder.mutation({
      query: ({ id }) => ({
        url: `mock/interview/assessments/${id}`,
        method: "DELETE",
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
  useGetQuizAssessmentQuery,
  useCreateQuizAssessmentsMutation,
  useUpdateQuizAssessmentsMutation,
  useDeleteQuizAssessmentsMutation,
} = quizAssessmentSliceApi;
