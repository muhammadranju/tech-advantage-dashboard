import { apiSlice } from "../apiSlice";

export const bootCampSliceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //  Boot Camp - Get All Videos
    getBootCamp: builder.query({
      query: () => ({
        url: `bootcamp/videos`,
        method: "GET",
      }),
      providesTags: ["BootCamp"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),
    //  Boot Camp - Upload Video
    createBootCamp: builder.mutation({
      query: ({ body }) => ({
        url: `bootcamp/videos`,
        method: "POST",
        body: {
          mark: body.mark,
          title: body.title,
          url: body.url,
          category: body.category,
        },
      }),
      invalidatesTags: ["BootCamp"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),

    // Playlists - Get All Playlists
    getPlaylists: builder.query({
      query: () => ({
        url: `bootcamp/playlists`,
        method: "GET",
      }),
      providesTags: ["Playlists"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),

    // Playlists - Get Single Playlist
    getSinglePlaylist: builder.query({
      query: ({ playlistID }) => ({
        url: `bootcamp/playlists/${playlistID}`,
        method: "GET",
      }),
      providesTags: ["Playlists"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),

    // Playlists - Create Playlist
    createPlaylist: builder.mutation({
      query: ({ body }) => ({
        url: `bootcamp/playlists`,
        method: "POST",
        body: {
          title: body.title,
        },
      }),
      invalidatesTags: ["Playlists"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),

    // Add Videos to Playlist
    addVideosToPlaylist: builder.mutation({
      query: ({ playlistID, body }) => ({
        url: `bootcamp/playlists/${playlistID}/videos`,
        method: "POST",
        body: {
          videos: body.videos,
        },
      }),
      invalidatesTags: ["Playlists"],
      // Transform response to handle different response structures
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const {
  useGetBootCampQuery,
  useCreateBootCampMutation,
  useGetPlaylistsQuery,
  useGetSinglePlaylistQuery,
  useCreatePlaylistMutation,
  useAddVideosToPlaylistMutation,
} = bootCampSliceApi;
