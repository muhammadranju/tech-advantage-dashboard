// import { apiSlice } from "../apiSlice";

// export const successPathApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     // Content - Get All Courses
//     getContents: builder.query({
//       query: ({ moduleId, videoID }) => ({
//         url: `bootcamp/courses/${moduleId}/modules/${videoID}/contents`,
//         method: "GET",
//       }),
//       providesTags: ["Courses"],
//       // Transform response to handle different response structures
//       transformResponse: (response) => {
//         return response;
//       },
//     }),

//     //  Get Single Course
//     getSingleContent: builder.query({
//       query: ({ moduleId, videoID, id }) => ({
//         url: `bootcamp/courses/${moduleId}/modules/${videoID}/contents/${id}`,
//         method: "GET",
//       }),
//       providesTags: ["Courses"],
//       // Transform response to handle different response structures
//       transformResponse: (response) => {
//         return response;
//       },
//     }),

//     // Content - Create Course
//     createContent: builder.mutation({
//       query: ({ body, moduleId, videoID }) => ({
//         url: `bootcamp/courses/${moduleId}/modules/${videoID}/contents`,
//         method: "POST",
//         body: {
//           name: body.name,
//         },
//       }),
//       invalidatesTags: ["Courses"],
//       // Transform response to handle different response structures
//       transformResponse: (response) => {
//         return response;
//       },
//     }),

//     // Content - Update Course
//     updateContent: builder.mutation({
//       query: ({ id, body, moduleId, videoID }) => ({
//         url: `bootcamp/courses/${moduleId}/modules/${videoID}/contents/${id}`,
//         method: "PATCH",
//         body: {
//           name: body.name,
//         },
//       }),
//       invalidatesTags: ["Courses"],
//       // Transform response to handle different response structures
//       transformResponse: (response) => {
//         return response;
//       },
//     }),

//     // Content - Delete Course
//     deleteContent: builder.mutation({
//       query: ({ id, moduleId, videoID }) => ({
//         url: `bootcamp/courses/${moduleId}/modules/${videoID}/contents/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["Courses"],
//       // Transform response to handle different response structures
//       transformResponse: (response) => {
//         return response;
//       },
//     }),
//   }),
// });

// export const {
//   useGetContentsQuery,
//   useGetSingleContentQuery,
//   useCreateContentMutation,
//   useUpdateContentMutation,
//   useDeleteContentMutation,
// } = successPathApiSlice;

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
      query: ({ id, title, file, moduleId, videoID }) => {
        const formData = new FormData();
        formData.append("title", title);
        if (file) {
          formData.append("doc", file);
        }
        return {
          url: `bootcamp/courses/${moduleId}/modules/${videoID}/contents/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
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
