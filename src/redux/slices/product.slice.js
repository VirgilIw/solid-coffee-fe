import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
    "product/fetchProducts",
    async ({ page = 1, limit = 6 }, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://192.168.50.221:8080/products?page=${page}&limit=${limit}`);

            if (!response.ok) {
                throw new Error("Gagal mengambil data produk");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const productSlice = createSlice({
    name: "product",
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
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload.data || [];
                state.pageInfo = action.payload.pageInfo || state.pageInfo;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { setPage } = productSlice.actions;
export default productSlice.reducer;
