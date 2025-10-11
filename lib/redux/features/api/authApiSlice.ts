import {
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  ResetPasswordRequest,
  UserProfileResponse,
  VerifyOTPRequest,
} from "@/interface/auth.interface";

import toast from "react-hot-toast";
import { logout, setCredentials, setLoading } from "../auth/authSlice";
import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;

          // Store token temporarily
          const token = data.data;

          // Now fetch user profile with the token
          const profileResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (!profileResponse.ok) {
            toast.error("Failed to fetch user profile");
            throw new Error("Failed to fetch user profile");
          }
          const profileData = await profileResponse.json();

          if (process.env.NEXT_PUBLIC_ROLE !== profileData?.data?.role) {
            toast.error("You are not authorized to access this page");
            throw new Error("You are not authorized to access this page");
          }

          // Set credentials with both token and user data
          dispatch(
            setCredentials({
              user: profileData.user || profileData, // Handle different response structures
              token: token,
            })
          );
        } catch (error) {
          dispatch(logout()); // Clear any partial state
          throw error; // Re-throw to handle in component
        } finally {
          dispatch(setLoading(false));
        }
      },
    }),

    getUserProfile: builder.query<UserProfileResponse, void>({
      query: () => ({
        url: `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["User"],
      // Transform response to handle different response structures
      transformResponse: (response: UserProfileResponse) => {
        return {
          user: response.user || response,
        };
      },
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
          dispatch(apiSlice.util.resetApiState()); // Clear all cached data
        } catch (error) {
          dispatch(logout());
          dispatch(apiSlice.util.resetApiState());
          throw error;
        }
      },
    }),

    refreshToken: builder.mutation<{ token: string }, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
      }),
    }),

    forgotPassword: builder.mutation<void, ForgotPasswordRequest>({
      query: (credentials) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: credentials,
      }),
    }),

    verifyOTP: builder.mutation<void, VerifyOTPRequest>({
      query: ({ otp, email }) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: { email, oneTimeCode: otp },
      }),
    }),

    resetPassword: builder.mutation<void, ResetPasswordRequest>({
      query: ({ password, confirmPassword, authToken }) => ({
        url: "/auth/reset-password",
        headers: {
          Authorization: authToken || "",
        },
        method: "POST",
        body: { newPassword: password, confirmPassword },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetUserProfileQuery,
  useRefreshTokenMutation,
  useForgotPasswordMutation,
  useVerifyOTPMutation,
  useResetPasswordMutation,
} = authApiSlice;
