import { apiSlice } from "../apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //  Success Path - Get Quiz Question Answer
    getSuccessPathQuizQuestionAnswer: builder.query({
      query: ({ category }) => ({
        url: `success/path/${category}`,
        method: "GET",
      }),
      providesTags: ["SuccessPath"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),
    //  Success Path - Create Quiz Question Answer
    createSuccessPathQuizQuestionAnswer: builder.mutation({
      query: ({ body, category }) => ({
        url: `/success/path/${category}`,
        method: "POST",
        body: {
          questionText: body.questionText,
        },
      }),
      invalidatesTags: ["SuccessPath"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),

    //  Success Path - Update Quiz Question Answer
    updateSuccessPathQuizQuestionAnswer: builder.mutation({
      query: ({ body, category, id }) => ({
        url: `/success/path/${category}/${id}`,
        method: "PUT",
        body: {
          questionText: body.questionText,
        },
      }),
      invalidatesTags: ["SuccessPath"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),

    //  Success Path - Delete Quiz Question Answer
    deleteSuccessPathQuizQuestionAnswer: builder.mutation({
      query: ({ id, category }) => ({
        url: `/success/path/${category}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SuccessPath"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),

    //  Success Path - Get Long Question Answer
    getSuccessPathAssessmentQuestionAnswer: builder.query({
      query: ({ category }) => ({
        url: `/success/path/assessments/${category}`,
        method: "GET",
      }),
      providesTags: ["SuccessPath"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),

    //  Success Path - Create Long Question Answer
    createSuccessPathAssessmentQuestionAnswer: builder.mutation({
      query: ({ body, category }) => ({
        url: `/success/path/assessments/${category}`,
        method: "POST",
        body: {
          range: body.range,
          begineerData: body.begineerData,
          IntermediateData: body.IntermediateData,
          proData: body.proData,
        }, // Shorthand for body: body (sends the inner { questionText, answer })
      }),
      invalidatesTags: ["SuccessPath"],
      transformResponse: (response) => {
        return response;
      },
    }),

    //  Success Path - Update Long Question Answer
    updateSuccessPathAssessmentQuestionAnswer: builder.mutation({
      query: ({ body, id, category }) => ({
        url: `/success/path/assessments/${category}/${id}`,
        method: "PUT",
        body: {
          range: body.range,
          begineerData: body.begineerData,
          IntermediateData: body.IntermediateData,
          proData: body.proData,
        },
      }),
      invalidatesTags: ["SuccessPath"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),

    //  Success Path - Delete Long Question Answer
    deleteSuccessPathAssessmentQuestionAnswer: builder.mutation({
      query: ({ id, category }) => ({
        url: `/success/path/assessments/${category}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SuccessPath"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const {
  //   Quiz Question Answers
  useGetSuccessPathQuizQuestionAnswerQuery,
  useCreateSuccessPathQuizQuestionAnswerMutation,
  useUpdateSuccessPathQuizQuestionAnswerMutation,
  useDeleteSuccessPathQuizQuestionAnswerMutation,
  //   Assessment Question Answers
  useGetSuccessPathAssessmentQuestionAnswerQuery,
  useCreateSuccessPathAssessmentQuestionAnswerMutation,
  useUpdateSuccessPathAssessmentQuestionAnswerMutation,
  useDeleteSuccessPathAssessmentQuestionAnswerMutation,
} = authApiSlice;
