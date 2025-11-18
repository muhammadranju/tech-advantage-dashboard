import { apiSlice } from "../apiSlice";

export const coachingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCoaches: builder.query({
      query: () => ({
        url: `/coaching/coach`,
      }),
      providesTags: ["Coaching"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),
    getCoach: builder.query({
      query: ({ id }) => ({
        url: `/coaching/coach/${id}`,
      }),
      providesTags: ["Coaching"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),

    // create coach
    createCoach: builder.mutation({
      query: ({ body }) => ({
        url: `/coaching/coach`,
        method: "POST",
        body: {
          name: body.name,
          description: body.description,
        },
      }),
      invalidatesTags: ["Coaching"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),

    addDate: builder.mutation({
      query: ({ date, coachId }) => ({
        url: `/coaching/coach/${coachId}/date`,
        method: "POST",
        body: { date },
      }),
      invalidatesTags: ["Coaching"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),

    getSlotsByIdWithDate: builder.query({
      query: ({ coachId, date }) => ({
        url: `/coaching/coach/${coachId}/slots?date=${date}`,
      }),
      providesTags: ["Coaching"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),

    updateSlot: builder.mutation({
      query: ({ coachId, date, slot }) => ({
        url: `/coaching/coach/${coachId}/slot`,
        method: "PUT",
        body: {
          date: date,
          updates: slot,
        },
      }),
      invalidatesTags: ["Coaching"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const {
  useGetAllCoachesQuery,
  useGetCoachQuery,
  useCreateCoachMutation,
  useGetSlotsByIdWithDateQuery,
  useUpdateSlotMutation,
  useAddDateMutation,
} = coachingApiSlice;
