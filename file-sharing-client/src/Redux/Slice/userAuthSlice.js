import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const userLoginThunk = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json(); // Get detailed error from API
        return rejectWithValue(errorData.message || "Login failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const userRegisterThunk = createAsyncThunk(
    "auth/register",
    async (payload, { rejectWithValue }) => {
      try {
        const response = await fetch("http://localhost:8000/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          credentials: "include",
        });
  
        if (!response.ok) {
          const errorData = await response.json(); // Get detailed error from API
          return rejectWithValue(errorData.msg || "Login failed");
        }
  
        const data = await response.json();
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

export const userLoginCheckThunk = createAsyncThunk(
  "auth/checkToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/auth/checkToken",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json(); // Get detailed error from API
        return rejectWithValue(errorData.message || "auth check failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const userLogoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:8000/api/auth/logout", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "logout failed");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

export const userAuthSlice = createSlice({
  name: "userAuth",
  initialState: {
    isAuthenticated: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: null,
    userData: null,
  },
  extraReducers: (builder) => {
    builder.addCase(userLoginThunk.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = null;
      state.userData = null;
    });
    builder.addCase(userLoginThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userData = action.payload;
      state.isSuccess = action.payload?.success;
      if (action.payload?.success) {
        state.isAuthenticated = true;
        toast.success("login success");
      } else {
        state.isAuthenticated = false;
        state.isError = true;
        state.errorMessage = action.payload?.msg || "Authentication failed";
      }
    });
    builder.addCase(userLoginThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = action.payload?.msg || "Login request failed";
      toast.error("Login failed");
    });
    builder.addCase(userLogoutThunk.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = null;
    });
    builder.addCase(userLogoutThunk.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isAuthenticated = false; // 🔹 User is logged out
    });
    builder.addCase(userLogoutThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    });
    builder.addCase(userLoginCheckThunk.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = null;
      state.userData = null;
    });
    builder.addCase(userLoginCheckThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isAuthenticated = true;
    });
    builder.addCase(userLoginCheckThunk.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
    });
    builder.addCase(userRegisterThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = null;
        state.userData = null;
      });
      builder.addCase(userRegisterThunk.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.isAuthenticated = true;
          toast.success(action.payload.msg);
      });
      builder.addCase(userRegisterThunk.rejected, (state, action) => {
          state.isError = true;
          state.isLoading = false;
          state.isSuccess = false;
          state.errorMessage = action.payload;
          toast.error(state.errorMessage);
      })
  },
});

export default userAuthSlice.reducer;
