import { AuthState, User } from "@/interface/auth.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import type { RootState } from "../../store";

// Load initial state from localStorage (if available)
const loadAuthFromStorage = (): Partial<AuthState> => {
  if (typeof window === "undefined") return {};

  try {
    const token = localStorage.getItem("token");
    const accessToken = Cookies.get("token");
    const user = localStorage.getItem("user");

    console.log(token);

    if (token || user || accessToken) {
      return {
        token,
        user: JSON.parse(user as string),
        isAuthenticated: true,
      };
    }
  } catch (error) {
    console.error("Error loading auth from storage:", error);
  }

  return {};
};

const initialState: AuthState = {
  user: null,
  token: null,
  authToken: null,
  isAuthenticated: false,
  isLoading: false,
  userEmail: "",
  logout: false,
  moduleTitle: "",
  ...loadAuthFromStorage(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;

      // Save to localStorage
      if (typeof window !== "undefined") {
        Cookies.set("token", token);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.userEmail = "";
      state.authToken = "";
      Cookies.remove("token");
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Clear localStorage
      if (typeof window !== "undefined") {
        Cookies.remove("token");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }

      if (!Cookies.get("token")) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setAuthToken: (state, action: PayloadAction<string>) => {
      state.authToken = action.payload;
    },

    setUserEmail: (state, action: PayloadAction<string>) => {
      state.userEmail = action.payload;
    },
    setLogout: (state) => {
      state.isAuthenticated = false;
      state.userEmail = "";
      state.authToken = "";
      Cookies.remove("token");
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      state.isLoading = false;
      state.user = null;
      state.token = null;
      state.authToken = null;
      state.isAuthenticated = false;

      // Only redirect in browser environment
      if (typeof window !== "undefined") {
        // window.location.href = "/login?logout=true";
        window.location.href = `/login?redirect=${window.location.pathname.slice(
          1
        )}`;
      }
    },

    setModuleTitle: (state, action: PayloadAction<string>) => {
      state.moduleTitle = action.payload;
    },
  },
});

// Fixed: Export all actions including setUserEmail and setAuthToken
export const {
  setCredentials,
  logout,
  setLoading,
  setAuthToken,
  setUserEmail,
  setLogout,
} = authSlice.actions;

// Selectors
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthToken = (state: RootState) => state.auth.authToken;
export const selectUserEmail = (state: RootState) => state.auth.userEmail;
export const selectLogout = (state: RootState) => state.auth.logout;

export const selectModuleTitle = (state: RootState) => state.auth.moduleTitle;

export default authSlice.reducer;
