import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (
    { page = 1, title = "", category = [], min = "", max = "", id = "" },
    { rejectWithValue },
  ) => {
    try {
      const params = new URLSearchParams();
      params.append("page", page);

      if (title) {
        params.append("title", title);
      }
      if (category && category.length > 0) {
        category.forEach((cat) => params.append("category", cat));
      }
      if (min) {
        params.append("min", min);
      }
      if (max) {
        params.append("max", max);
      }
      if (id) {
        params.append("id", id);
      }

      const response = await fetch(
        `${import.meta.env.VITE_SOLID_API_URL}/products?${params.toString()}`,
      );

      if (!response.ok) {
        throw new Error("Failed Get Data Product");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const insertProduct = createAsyncThunk(
  "product/addProduct",
  async (productData, { getState, rejectWithValue }) => {
    try {
      const token = getState().login.user?.token || "";
      if (token == "" || null) {
        throw new Error("Unauthorized access");
      }
      const response = await fetch(
        `${import.meta.env.VITE_SOLID_API_URL}/admin/products`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: productData,
        },
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed Insert Product");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, productData }, { getState, rejectWithValue }) => {
    try {
      const token = getState().login.user?.token || "";

      const response = await fetch(
        `${import.meta.env.VITE_SOLID_API_URL}/admin/products/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: productData,
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed Update Product");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().login.user?.token || "";
      const response = await fetch(
        `${import.meta.env.VITE_SOLID_API_URL}/admin/products/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed Delete Product");
      }

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
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
        if (action.payload.meta) {
          state.pageInfo = {
            currentPage: action.payload.meta.page,
            totalPage: action.payload.meta.total_page,
            totalData: action.payload.meta.total_data || 0,
          };
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(insertProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(insertProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload.data);
        state.pageInfo = action.payload.pageInfo || state.pageInfo;
      })
      .addCase(insertProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.data || [];
        state.pageInfo = action.payload.pageInfo || state.pageInfo;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.data || [];
        state.pageInfo = action.payload.pageInfo || state.pageInfo;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage } = productSlice.actions;
export default productSlice.reducer;
