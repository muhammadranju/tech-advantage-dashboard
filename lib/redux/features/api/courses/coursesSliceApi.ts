import { apiSlice } from "../apiSlice";

export const coursesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Course - Get All Courses
    getCourses: builder.query({
      query: () => ({
        url: `bootcamp/courses`,
        method: "GET",
      }),
      providesTags: ["Courses"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),

    //  Get Single Course
    getSingleCourse: builder.query({
      query: ({ id }) => ({
        url: `bootcamp/courses/${id}`,
        method: "GET",
      }),
      providesTags: ["Courses"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),

    // Course - Create Course
    createCourse: builder.mutation({
      query: ({ body }) => ({
        url: `bootcamp/courses`,
        method: "POST",
        body: {
          name: body.name,
        },
      }),
      invalidatesTags: ["Courses"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),

    // Course - Update Course
    updateCourse: builder.mutation({
      query: ({ id, body }) => ({
        url: `bootcamp/courses/${id}`,
        method: "PATCH",
        body: {
          name: body.name,
        },
      }),
      invalidatesTags: ["Courses"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),

    // Course - Delete Course
    deleteCourse: builder.mutation({
      query: ({ id }) => ({
        url: `bootcamp/courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Courses"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetSingleCourseQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = coursesApiSlice;
