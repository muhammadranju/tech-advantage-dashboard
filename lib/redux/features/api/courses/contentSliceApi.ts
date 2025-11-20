import { apiSlice } from "../apiSlice";

export const successPathApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Content - Get All Courses
    getContents: builder.query({
      query: ({ moduleId, videoID }) => ({
        url: `bootcamp/courses/${moduleId}/modules/${videoID}/contents`,
        method: "GET",
      }),
      providesTags: ["Courses"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),

    //  Get Single Course
    getSingleContent: builder.query({
      query: ({ moduleId, videoID, id }) => ({
        url: `bootcamp/courses/${moduleId}/modules/${videoID}/contents/${id}`,
        method: "GET",
      }),
      providesTags: ["Courses"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),

    // Content - Create Course
    createContent: builder.mutation({
      query: ({ title, type, file, moduleId, videoID }) => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("type", type);
        if (file) {
          formData.append("doc", file);
        }
        return {
          url: `bootcamp/courses/${moduleId}/modules/${videoID}/contents`,
          method: "POST",
          body: formData,
          headers: {
            // Note: The browser usually sets Content-Type for FormData automatically.
            // Explicitly setting it here is a troubleshooting step and might be removed if it causes issues.
            // "Content-Type": "multipart/form-data",
          },
        };
      },
      invalidatesTags: ["Courses"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),

    // Content - Update Course
    updateContent: builder.mutation({
      query: ({ id, title, moduleId, videoID }) => ({
        url: `bootcamp/courses/${moduleId}/modules/${videoID}/contents/${id}`,
        method: "PATCH",
        body: {
          title: title,
        },
      }),
      invalidatesTags: ["Courses"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),

    // Content - Delete Course
    deleteContent: builder.mutation({
      query: ({ id, moduleId, videoID }) => ({
        url: `bootcamp/courses/${moduleId}/modules/${videoID}/contents/${id}`,
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
  useGetContentsQuery,
  useGetSingleContentQuery,
  useCreateContentMutation,
  useUpdateContentMutation,
  useDeleteContentMutation,
} = successPathApiSlice;
