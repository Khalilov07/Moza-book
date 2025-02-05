import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../ui/api";

export const getClassrooms = createAsyncThunk(
    "class/getClassrooms",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/kanban_board_api/classrooms/");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Ошибка при получении классов");
        }
    }
);

export const createClassroom = createAsyncThunk(
    "class/createClassroom",
    async (classroomData, { rejectWithValue }) => {
        try {
            const response = await api.post("/kanban_board_api/classrooms/create/", classroomData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Ошибка при создании класса");
        }
    }
);

const classSlice = createSlice({
    name: "class",
    initialState: {
        classrooms: [],
        loading: false,
        error: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getClassrooms.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getClassrooms.fulfilled, (state, action) => {
                state.loading = false;
                state.classrooms = action.payload;
            })
            .addCase(getClassrooms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(createClassroom.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createClassroom.fulfilled, (state, action) => {
                state.loading = false;
                state.classrooms.push(action.payload); // Добавляем новый класс в список
            })
            .addCase(createClassroom.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default classSlice.reducer;
