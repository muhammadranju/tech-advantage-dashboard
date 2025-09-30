import { apiSlice } from "../apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Assessments Part - Small Business
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
      query: ({ category }) => ({
        url: `/small/business/${category}/questions`,
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

    // Small Business Question & Answers
    // Get all users
    quizSmallBusinessQuestionAnswer: builder.mutation({
      query: ({ body, category }) => ({
        url: `/small/business/${category}/questions`,
        method: "POST",
        body: {
          questionText: body.questionText,
          answers: body.answers,
        },
      }),
      invalidatesTags: ["QuestionAnswer"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),
    // Update question and answer
    quizUpdateSmallBusinessQuestionAnswer: builder.mutation({
      query: ({ body, category, id }) => ({
        url: `/small/business/${category}/questions/${id}`,
        method: "PUT",
        body: {
          questionText: body.questionText,
          answers: body.answers,
        },
      }),
      invalidatesTags: ["QuestionAnswer"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),
    // Delete question and answer
    quizDeleteSmallBusinessQuestionAnswer: builder.mutation({
      query: ({ category, id }) => ({
        url: `/small/business/${category}/questions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["QuestionAnswer"],
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
  useQuizSmallBusinessQuestionAnswerMutation,
  useQuizUpdateSmallBusinessQuestionAnswerMutation,
  useQuizDeleteSmallBusinessQuestionAnswerMutation,
} = authApiSlice;
