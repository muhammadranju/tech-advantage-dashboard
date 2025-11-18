import { apiSlice } from "../apiSlice";

export const smallBusinessApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all users
    addQuestionAnswer: builder.mutation({
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
  }),
});

export const { useAddQuestionAnswerMutation } = smallBusinessApiSlice;
