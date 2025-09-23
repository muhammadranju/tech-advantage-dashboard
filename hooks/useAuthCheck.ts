"use client";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";
import { useGetUserProfileQuery } from "@/lib/redux/features/api/authApiSlice";
import {
  selectToken,
  selectIsAuthenticated,
  logout,
} from "@/lib/redux/features/auth/authSlice";

export const useAuthCheck = () => {
  const token = useAppSelector(selectToken);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();

  const {
    data: userProfile,
    error,
    isLoading,
    refetch,
  } = useGetUserProfileQuery(undefined, {
    skip: !token || !isAuthenticated,
  });

  useEffect(() => {
    if (error && isAuthenticated) {
      // If profile fetch fails and we're supposed to be authenticated, logout
      console.error("Failed to fetch user profile:", error);
      dispatch(logout());
    }
  }, [error, isAuthenticated, dispatch]);

  return {
    userProfile,
    isLoading,
    error,
    refetch,
  };
};
