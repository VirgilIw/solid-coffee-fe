import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchOrders = createAsyncThunk(
    "order/fetchOrders",
    async ({ page = 1, noOrder = "", status = ""}, { getState, rejectWithValue }) => {
        try {
            const params = new URLSearchParams();
            params.append("page", page);

            if (noOrder) {
                params.append("No.Order", noOrder);
            }
            if (status) {
                params.append("status", status.toLowerCase());
            }

            const token = getState().login.user?.token || "";
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
    async (id, { getState,rejectWithValue }) => {
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
