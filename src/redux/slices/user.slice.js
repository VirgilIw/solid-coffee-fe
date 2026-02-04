import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
    "user/fetchUsers",
    async ({ page } = {}, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const pageNum = page || 1;
            const response = await fetch(`${import.meta.env.VITE_SOLID_API_URL}/admin/user/?page=${pageNum}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("Failed to get Data User");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const insertUser = createAsyncThunk(
    "user/insertUser",
    async (userData, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`${import.meta.env.VITE_SOLID_API_URL}/admin/user/`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: userData
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed Insert User");
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateUser = createAsyncThunk(
    "user/updateUser",
    async (userData, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`${import.meta.env.VITE_SOLID_API_URL}/admin/user/`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: userData
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed Update User");
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (id, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`${import.meta.env.VITE_SOLID_API_URL}/admin/user/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Failed Delete User");
            }

            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        items: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                const fetchedData = action.payload.data || action.payload;
                state.items = Array.isArray(fetchedData) ? fetchedData : [];
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default userSlice.reducer;
