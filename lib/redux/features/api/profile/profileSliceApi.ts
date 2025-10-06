import { apiSlice } from "../apiSlice";

export const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateUserPasswordProfile: builder.mutation({
      query: ({ body }) => ({
        url: `auth/change-password`,
        method: "POST",
        body: {
          currentPassword: body.currentPassword,
          newPassword: body.newPassword,
          confirmPassword: body.confirmPassword,
        },
      }),
      invalidatesTags: ["Profile"],
      transformResponse: (response) => response,
    }),
    updateUserNameProfile: builder.mutation({
      query: ({ body, userId }) => ({
        url: `user/${userId}/name`,
        method: "PATCH",
        body: { name: body.name },
      }),
      invalidatesTags: ["Profile"],
      transformResponse: (response) => response,
    }),
    updateUserPhotoProfile: builder.mutation({
      query: (formData: FormData) => ({
        url: `user/profile`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Profile"],
      transformResponse: (response) => response,
    }),
  }),
});

export const {
  useUpdateUserPasswordProfileMutation,
  useUpdateUserNameProfileMutation,
  useUpdateUserPhotoProfileMutation,
} = profileApiSlice;
