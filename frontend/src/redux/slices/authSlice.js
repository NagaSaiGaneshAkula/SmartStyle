import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";

// Create axios instance with interceptors
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:9000'
});

// Add request interceptor to include token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle token errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token is invalid or expired
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userToken");
      // You might want to dispatch logout action here
      // store.dispatch(logout());
      
      // Optional: Redirect to login page
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        window.location.href = '/login?message=session-expired';
      }
    }
    return Promise.reject(error);
  }
);

const userFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialGuestId = localStorage.getItem("guestId") || `guest_${Date.now()}`;
localStorage.setItem("guestId", initialGuestId);

const initialState = {
  user: userFromStorage,
  guestId: initialGuestId,
  error: null,
  loading: false,
  tokenError: false, // New field to track token errors
};

// Helper function to clear auth data
const clearAuthData = (state) => {
  state.user = null;
  state.tokenError = true;
  localStorage.removeItem("userInfo");
  localStorage.removeItem("userToken");
};

export const loginUser = createAsyncThunk(
  "/auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/users/login", userData);
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      localStorage.setItem("userToken", response.data.token);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Login failed" });
    }
  },
);

export const registerUser = createAsyncThunk(
  "/auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/users/register", userData);
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      localStorage.setItem("userToken", response.data.token);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Registration failed" });
    }
  },
);

// New thunk to validate current token
export const validateToken = createAsyncThunk(
  "/auth/validateToken",
  async (_, { rejectWithValue, dispatch }) => {
    const token = localStorage.getItem("userToken");
    const user = localStorage.getItem("userInfo");
    
    if (!token || !user) {
      return rejectWithValue({ message: "No token found" });
    }
    
    try {
      // Make a request to a protected route to validate token
      const response = await api.get("/api/users/profile");
      return JSON.parse(user);
    } catch (error) {
      // Token is invalid
      dispatch(logout());
      return rejectWithValue(error.response?.data || { message: "Token validation failed" });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  
  reducers: {
    logout: (state) => {
      state.user = null;
      state.guestId = `guest_${Date.now()}`; 
      state.tokenError = false;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userToken");
      localStorage.setItem("guestId", state.guestId);
    },
    generateNewGuestId: (state) => {
      state.guestId = `guest_${Date.now()}`;
      localStorage.setItem("guestId", state.guestId);
    },
    clearTokenError: (state) => {
      state.tokenError = false;
    },
    // New reducer to handle token errors
    handleTokenError: (state) => {
      clearAuthData(state);
    },
  },
  
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.tokenError = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
        state.tokenError = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed, please try again";
        
        // Handle specific token errors
        if (action.payload?.status === 401) {
          clearAuthData(state);
        }
      })
      
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.tokenError = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
        state.tokenError = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Registration failed, please try again";
        
        // Handle specific token errors
        if (action.payload?.status === 401) {
          clearAuthData(state);
        }
      })
      
      // Token validation cases
      .addCase(validateToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(validateToken.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.tokenError = false;
      })
      .addCase(validateToken.rejected, (state) => {
        state.loading = false;
        clearAuthData(state);
      });
  },
});

export const { logout, generateNewGuestId, clearTokenError, handleTokenError } = authSlice.actions;

// Export the api instance for use in other files
export { api };

export default authSlice.reducer;