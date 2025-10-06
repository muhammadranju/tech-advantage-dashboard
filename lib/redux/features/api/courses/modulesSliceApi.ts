import { apiSlice } from "../apiSlice";

export const modulesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Module - Get All Modules
    getModules: builder.query({
      query: () => ({
        url: `bootcamp/modules`,
        method: "GET",
      }),
      providesTags: ["Modules"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),

    //  Get Single Module
    getSingleModule: builder.query({
      query: ({ moduleId }) => ({
        url: `bootcamp/${moduleId}/modules`,
        method: "GET",
      }),
      providesTags: ["Modules"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),

    // Module - Create Module
    createModule: builder.mutation({
      query: ({ body, moduleId }) => ({
        url: `bootcamp/${moduleId}/modules`,
        method: "POST",
        body: {
          name: body.name,
        },
      }),
      invalidatesTags: ["Modules"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),

    // Module - Update Module
    updateModule: builder.mutation({
      query: ({ moduleId, id, body }) => ({
        url: `bootcamp/${moduleId}/modules/${id}`,
        method: "PUT",
        body: {
          name: body.name,
        },
      }),
      invalidatesTags: ["Modules"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),

    // Module - Delete Module
    deleteModule: builder.mutation({
      query: ({ moduleId, id }) => ({
        url: `bootcamp/${moduleId}/modules/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Modules"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const {} = modulesApiSlice;
