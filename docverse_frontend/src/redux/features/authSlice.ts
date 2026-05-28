import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { User, LoginFormData, RegisterFormData } from "@/types";
import authService from "@/services/auth.service";
import { setAuthCookie, removeAuthCookie } from "@/lib/cookies";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Load persisted auth state from localStorage
function loadAuthState(): AuthState {
  if (typeof window === "undefined") {
    return {
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    };
  }
  try {
    const saved = localStorage.getItem("auth_state");
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        user: parsed.user || null,
        isAuthenticated: !!parsed.user,
        isLoading: false,
        error: null,
      };
    }
  } catch {
    // ignore
  }
  return {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  };
}

const initialState: AuthState = loadAuthState();

function persistAuthState(user: User | null) {
  try {
    if (user) {
      localStorage.setItem("auth_state", JSON.stringify({ user }));
      setAuthCookie("true");
    } else {
      localStorage.removeItem("auth_state");
      removeAuthCookie();
    }
  } catch {
    // ignore
  }
}

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: LoginFormData, { rejectWithValue }) => {
    try {
      const result = await authService.login(data);
      return result;
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || "Login failed";
      return rejectWithValue(message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data: RegisterFormData, { rejectWithValue }) => {
    try {
      const result = await authService.register(data);
      return result;
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || "Registration failed";
      return rejectWithValue(message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const result = await authService.logout();
      return result;
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || "Logout failed";
      return rejectWithValue(message);
    }
  }
);

export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const user = await authService.getProfile();
      return { user };
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || "Failed to get profile";
      return rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      persistAuthState(action.payload);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
        persistAuthState(action.payload.user);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
        persistAuthState(action.payload.user);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Logout
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = null;
        persistAuthState(null);
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
      });

    // Get Profile
    builder
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isLoading = false;
        persistAuthState(action.payload.user);
      })
      .addCase(getProfile.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        persistAuthState(null);
      });
  },
});

export const { setUser, clearError } = authSlice.actions;
export default authSlice.reducer;
