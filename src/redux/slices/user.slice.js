import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
    "user/fetchUsers",
    async (page, { getState, rejectWithValue }) => {
        try {
            const token = getState().login.user?.token || "";
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
    async (userData, { getState, rejectWithValue }) => {
        try {
            const token = getState().login.user?.token || "";

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
    async ({ id, userData }, { getState, rejectWithValue }) => {
        try {
            const token = getState().login.user?.token || "";

            const response = await fetch(`${import.meta.env.VITE_SOLID_API_URL}/admin/user/${id}`, {
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
    async (id, { getState, rejectWithValue }) => {
        try {
            const token = getState().login.user?.token || "";

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
            })
            .addCase(insertUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(insertUser.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(insertUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Delete User
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default userSlice.reducer;
