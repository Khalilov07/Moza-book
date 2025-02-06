import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../ui/api";

export const registerTeacher = createAsyncThunk(
    "auth/registerTeacher",
    async ({ username, password, email, phone_number, role }, { rejectWithValue }) => {
        try {
            const response = await api.post("/teacher_api/register/teacher/", {
                user: { username, password, email },
                phone_number,
                role,
            });
            return response.data;
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
                verification_code,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.error || "Ошибка верификации");
        }
    }
);

export const loginTeacher = createAsyncThunk(
    "auth/loginTeacher",
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const response = await api.post("/teacher_api/login/teacher/", {
                username,
                password,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Ошибка авторизации");
        }
    }
);
export const forgotPasswordTeacher = createAsyncThunk(
    "auth/forgotPasswordTeacher",
    async ({ phone_number }, { rejectWithValue }) => {
        try {
            const response = await api.post("/teacher_api/forgot-password/teacher/", {
                phone_number
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Ошибка авторизации");
        }
    }
);
export const resetPasswordTeacher = createAsyncThunk(
    "auth/resetPasswordTeacher",
    async ({ phone_number,reset_code,new_password }, { rejectWithValue }) => {
        try {
            const response = await api.post("/teacher_api/reset-password/teacher/", {
                phone_number,
                reset_code,
                new_password
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Ошибка авторизации");
        }
    }
);
export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        user: null,
        loading: false,
        phone:"",
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
        forgotPassword: (state,action) => {
            state.phone = action.payload;
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
                state.user = action.payload;
            })
            .addCase(registerTeacher.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(loginTeacher.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginTeacher.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
                localStorage.setItem("MAZA_BOOK",action.payload.access)
            })
            .addCase(loginTeacher.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { login, logout , forgotPassword} = authSlice.actions;
export default authSlice.reducer;
