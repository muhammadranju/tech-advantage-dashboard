import {
  LoginRequest,
  LoginResponse,
  UserProfileResponse,
} from "@/interface/auth.interface";

import { logout, setCredentials, setLoading } from "../auth/authSlice";
import { apiSlice } from "./apiSlice";
import { RootState } from "../../store";
import toast from "react-hot-toast";

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
          console.error("Login failed:", error);
          // toast.error("Login failed"+error);
          dispatch(logout()); // Clear any partial state
          throw error; // Re-throw to handle in component
        } finally {
          dispatch(setLoading(false));
        }
      },
    }),

    // signup: builder.mutation<LoginResponse, SignupRequest>({
    //   query: (userData) => ({
    //     url: "/auth/signup",
    //     method: "POST",
    //     body: userData,
    //   }),
    //   async onQueryStarted(arg, { dispatch, queryFulfilled }) {
    //     dispatch(setLoading(true));
    //     try {
    //       const { data } = await queryFulfilled;

    //       // Store token temporarily
    //       const token = data.token;

    //       // Fetch user profile with the token
    //       const profileResponse = await fetch(
    //         "http://10.10.7.102:3000/api/v1/user/profile",
    //         {
    //           headers: {
    //             Authorization: `Bearer ${token}`,
    //             "Content-Type": "application/json",
    //           },
    //         }
    //       );

    //       if (!profileResponse.ok) {
    //         throw new Error("Failed to fetch user profile");
    //       }

    //       const profileData = await profileResponse.json();

    //       // Set credentials with both token and user data
    //       dispatch(
    //         setCredentials({
    //           user: profileData.user || profileData,
    //           token: token,
    //         })
    //       );
    //     } catch (error) {
    //       console.error("Signup failed:", error);
    //       dispatch(logout());
    //       throw error;
    //     } finally {
    //       dispatch(setLoading(false));
    //     }
    //   },
    // }),

    // Direct profile fetching endpoint (can be used to refresh user data)
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
          // toast.error("Logout failed");
          // Even if the API call fails, logout locally
          dispatch(logout());
          dispatch(apiSlice.util.resetApiState());
        }
      },
    }),

    refreshToken: builder.mutation<{ token: string }, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;
          const state = getState() as RootState;
          const currentUser = state.auth.user;

          if (currentUser) {
            dispatch(setCredentials({ user: currentUser, token: data.token }));
          }
        } catch (error) {
          toast.error("Refresh token failed");
          dispatch(logout());
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  // useSignupMutation,
  useLogoutMutation,
  useGetUserProfileQuery,
  useRefreshTokenMutation,
} = authApiSlice;
