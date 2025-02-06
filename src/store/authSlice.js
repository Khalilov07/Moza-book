import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {api} from "../ui/api";

export const registerTeacher = createAsyncThunk(
    "auth/registerTeacher",
    async ({ username, password, email, phone_number, role }, { rejectWithValue }) => {
      try {
        const response = await api.post("/teacher_api/register/teacher/", {
          user: { username, password, email: "dwadawdwa@gmail.com" },
          phone_number,
          role,
        });
        return response;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Ошибка регистрации");
      }
    }
);


export const verifyPhone = createAsyncThunk(
  "auth/verifyPhone",
  async ({ phone_number, verification_code }, { rejectWithValue }) => {
    try {
      const response = await api.post("/teacher_api/verify-phone/teacher/", {
        phone_number,
        verification_code
      });
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error || "Ошибка регистрации");
    }
  }
);


export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(registerTeacher.pending, (state) => {
          state.loading = true; 
          state.error = null;
        })
        .addCase(registerTeacher.fulfilled, (state, action) => {
          state.loading = false;
          state.isAuthenticated = true;
        })
        .addCase(registerTeacher.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
