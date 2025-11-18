import { apiSlice } from "../apiSlice";

export const mockInterviewSliceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Mock Interview - Get All Videos
    getMockInterview: builder.query({
      query: () => ({
        url: `mock/interview/quiz`,
        method: "GET",
      }),
      providesTags: ["MockInterview"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),
    // Mock Interview - Upload Video
    createMockInterview: builder.mutation({
      query: ({ body }) => ({
        url: `mock/interview/quiz`,
        method: "POST",
        body: {
          question: body.question,
          answers: body.answers,
        },
      }),
      invalidatesTags: ["MockInterview"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),

    // update mock interview
    updateMockInterview: builder.mutation({
      query: ({ id, body }) => ({
        url: `mock/interview/quiz/${id}`,
        method: "PUT",
        body: {
          question: body.question,
          answers: body.answers,
        },
      }),
      invalidatesTags: ["MockInterview"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),

    // delete mock interview
    deleteMockInterview: builder.mutation({
      query: ({ id }) => ({
        url: `mock/interview/quiz/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MockInterview"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const {
  useGetMockInterviewQuery,
  useCreateMockInterviewMutation,
  useUpdateMockInterviewMutation,
  useDeleteMockInterviewMutation,
} = mockInterviewSliceApi;
