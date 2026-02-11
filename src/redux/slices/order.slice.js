import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchOrders = createAsyncThunk(
    "order/fetchOrders",
    async (params, { getState, rejectWithValue }) => {
        try {

            const token = getState().login.user?.token || "";
            const pageNum = typeof params === 'object' ? params.page : (params || 1);
            const response = await fetch(`http://192.168.50.221:8080/admin/orders/${pageNum ? `?page=${pageNum}` : ""}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            });

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

export const fetchHistory = createAsyncThunk(
    "order/fetchHistory",
    async ({ page = 1 }, { getState, rejectWithValue }) => {
        try {
            const params = new URLSearchParams();
            params.append("page", page);

            const token = getState().login.user?.token || "";
            const response = await fetch(`${import.meta.env.VITE_SOLID_API_URL}/orders/history?${params.toString()}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed Get History");
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const insertOrder = createAsyncThunk(
    "order/addOrder",
    async (orderData, { getState, rejectWithValue }) => {
        try {
            const token = getState().login.user?.token || "";

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
    async ({ id, orderData }, { getState, rejectWithValue }) => {
        try {
            const token = getState().login.user?.token || "";

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
    async (id, { getState, rejectWithValue }) => {
        try {
            const token = getState().login.user?.token || "";

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

export const addReview = createAsyncThunk(
    "order/addReview",
    async ({ dt_orderid, rating }, { getState, rejectWithValue }) => {
        try {
            const token = getState().login.user?.token || "";

            const response = await fetch(`${import.meta.env.VITE_SOLID_API_URL}/orders/review`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ dt_orderid: Number(dt_orderid), rating: Number(rating) })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed Add Review");
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchHistoryDetail = createAsyncThunk(
    "order/fetchHistoryDetail",
    async (id, { getState, rejectWithValue }) => {
        try {
            const token = getState().login.user?.token || "";
            const response = await fetch(`${import.meta.env.VITE_SOLID_API_URL}/orders/history/${id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed Get Order Detail");
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const orderSlice = createSlice({
    name: "order",
    initialState: {
        items: [],
        selectedOrder: null,
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
            .addCase(fetchHistory.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchHistory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload.data || [];
                state.pageInfo = action.payload.pageInfo || state.pageInfo;
            })
            .addCase(fetchHistory.rejected, (state, action) => {
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
            })
            // Add Review
            .addCase(addReview.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addReview.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addReview.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

        builder
            .addCase(fetchHistoryDetail.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchHistoryDetail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedOrder = action.payload.data || action.payload;
            })
            .addCase(fetchHistoryDetail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { setPage } = orderSlice.actions;
export default orderSlice.reducer;
