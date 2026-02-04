import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchOrders = createAsyncThunk(
    "order/fetchOrders",
    async ({ page = 1, limit = 5, noOrder = "", status = ""}, { rejectWithValue }) => {
        try {
            const params = new URLSearchParams();
            params.append("page", page);
            //params.append("limit", limit);

            if (noOrder) {
                params.append("No.Order", noOrder);
            }
            if (status) {
                params.append("status", status.toLowerCase());
            }

            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInJvbGUiOiJhZG1pbiIsImlzcyI6IndpYmlzYW5hIiwiZXhwIjoxNzcwMjUzMTk0fQ._Up12Vw3w-gbGEVlKr6wkxNvzTgcQoQQ_ITlCKEuswE";
                                        // http://192.168.50.221:8080/admin/orders/?page=1
            const response = await fetch(`http://192.168.50.221:8080/admin/orders/?${params.toString()}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            });

            console.log(params.toString())

            if (!response.ok) {
                throw new Error("Failed Get Data Order");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const insertOrder = createAsyncThunk(
    "order/addOrder",
    async (orderData, { rejectWithValue }) => {
        try {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInJvbGUiOiJhZG1pbiIsImlzcyI6IndpYmlzYW5hIiwiZXhwIjoxNzcwMjUzMTk0fQ._Up12Vw3w-gbGEVlKr6wkxNvzTgcQoQQ_ITlCKEuswE";

            const response = await fetch(`${import.meta.env.VITE_SOLID_API_URL}/admin/orders/`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: orderData
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed Insert Order");
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateOrder = createAsyncThunk(
    "order/updateOrder",
    async ({ id, orderData }, { rejectWithValue }) => {
        try {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsInJvbGUiOiJhZG1pbiIsImlzcyI6IndpYmlzYW5hIiwiZXhwIjoxNzcwMTc1MDQzfQ.tnMJ5IB00SPwLleE84Fo-jP4bOLj_pycnR1HZKrypx4";

            const response = await fetch(`${import.meta.env.VITE_SOLID_API_URL}/admin/orders/${id}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: orderData
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed Update Order");
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteOrder = createAsyncThunk(
    "order/deleteorder",
    async (id, { rejectWithValue }) => {
        try {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsInJvbGUiOiJhZG1pbiIsImlzcyI6IndpYmlzYW5hIiwiZXhwIjoxNzcwMTc1MDQzfQ.tnMJ5IB00SPwLleE84Fo-jP4bOLj_pycnR1HZKrypx4";

            const response = await fetch(`${import.meta.env.VITE_SOLID_API_URL}/admin/orders/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Failed Delete Order");
            }

            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const orderSlice = createSlice({
    name: "order",
    initialState: {
        items: [],
        pageInfo: {
            currentPage: 1,
            totalPage: 1,
            totalData: 0,
        },
        isLoading: false,
        error: null,
    },
    reducers: {
        setPage: (state, action) => {
            state.pageInfo.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload.data || [];
                state.pageInfo = action.payload.pageInfo || state.pageInfo;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
        
        builder
            .addCase(insertOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(insertOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload.data || [];
                state.pageInfo = action.payload.pageInfo || state.pageInfo;
            })
            .addCase(insertOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
        
        builder
            .addCase(updateOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload.data || [];
                state.pageInfo = action.payload.pageInfo || state.pageInfo;
            })
            .addCase(updateOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

        builder
            .addCase(deleteOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload.data || [];
                state.pageInfo = action.payload.pageInfo || state.pageInfo;
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { setPage } = orderSlice.actions;
export default orderSlice.reducer;
