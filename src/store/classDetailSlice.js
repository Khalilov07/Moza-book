import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../ui/api";

export const getClassroomDetail = createAsyncThunk(
    "classDetail/getClassroomDetail",
    async (classroomId, { rejectWithValue }) => {
        try {
            const response = await api.get(`/kanban_board_api/classroom/${classroomId}/`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Ошибка при получении данных о классе");
        }
    }
);

export const updateClassroomDetail = createAsyncThunk(
    "classDetail/updateClassroomDetail",
    async ({ classroomId, classroomData }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/kanban_board_api/classroom/${classroomId}/`, classroomData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Ошибка при обновлении данных о классе");
        }
    }
);

const classDetailSlice = createSlice({
    name: "classDetail",
    initialState: {
        classroom: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearClassroomDetail: (state) => {
            state.classroom = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getClassroomDetail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getClassroomDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.classroom = action.payload; // Сохраняем данные о классе
            })
            .addCase(getClassroomDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(updateClassroomDetail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateClassroomDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.classroom = action.payload; // Обновляем данные о классе
            })
            .addCase(updateClassroomDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export const { clearClassroomDetail } = classDetailSlice.actions;
export default classDetailSlice.reducer;
