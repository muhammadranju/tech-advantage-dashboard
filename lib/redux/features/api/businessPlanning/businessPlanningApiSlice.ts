import { apiSlice } from "../apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //  Business Planning - Get Quiz Question Answer
    getBusinessPlanQuizQuestionAnswer: builder.query({
      query: () => ({
        url: `business/plan/quiz`,
        method: "GET",
      }),
      providesTags: ["QuestionAnswer"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),
    //  Business Planning - Create Quiz Question Answer
    createBusinessPlanQuizQuestionAnswer: builder.mutation({
      query: ({ body }) => ({
        url: `business/plan/quiz`,
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
    //  Business Planning - Update Quiz Question Answer !TODO
    // !TODO
    updateBusinessPlanQuizQuestionAnswer: builder.mutation({
      query: ({ body, id }) => ({
        url: `business/plan/quiz/${id}`,
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
    //  Business Planning - Delete Quiz Question Answer
    deleteBusinessPlanQuizQuestionAnswer: builder.mutation({
      query: ({ id }) => ({
        url: `business/plan/quiz/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["QuestionAnswer"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),

    //  Business Planning - Get Long Question Answer
    getBusinessPlanLongQuestionAnswer: builder.query({
      query: () => ({
        url: `business/plan/question`,
        method: "GET",
      }),
      providesTags: ["QuestionAnswer"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),

    //  Business Planning - Create Long Question Answer
    createBusinessPlanLongQuestionAnswer: builder.mutation({
      query: ({ body }) => ({
        url: `/business/plan/question`,
        method: "POST",
        body, // Shorthand for body: body (sends the inner { questionText, answer })
      }),
      invalidatesTags: ["QuestionAnswer"],
      transformResponse: (response) => {
        return response;
      },
    }),

    //  Business Planning - Update Long Question Answer
    updateBusinessPlanLongQuestionAnswer: builder.mutation({
      query: ({ body, id }) => ({
        url: `business/plan/question/${id}`,
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

    //  Business Planning - Delete Long Question Answer
    deleteBusinessPlanLongQuestionAnswer: builder.mutation({
      query: ({ id }) => ({
        url: `business/plan/question/${id}`,
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
  //   Quiz Question
  useGetBusinessPlanQuizQuestionAnswerQuery,
  useCreateBusinessPlanQuizQuestionAnswerMutation,
  useUpdateBusinessPlanQuizQuestionAnswerMutation,
  useDeleteBusinessPlanQuizQuestionAnswerMutation,
  //   Long Question
  useCreateBusinessPlanLongQuestionAnswerMutation,
  useGetBusinessPlanLongQuestionAnswerQuery,
  useUpdateBusinessPlanLongQuestionAnswerMutation,
  useDeleteBusinessPlanLongQuestionAnswerMutation,
} = authApiSlice;
