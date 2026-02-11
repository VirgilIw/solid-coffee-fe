import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMenu = createAsyncThunk(
  "menu/fetchMenu",
  async (params, { getState, rejectWithValue }, ) => {
    try {

      const token = getState().login.user?.token || "";
      const pageNum = typeof params === 'object' ? params.page : (params || 1);

      const response = await fetch(
        `${import.meta.env.VITE_SOLID_API_URL}/admin/menu/${pageNum ? `?page=${pageNum}` : ""}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          }
        },
      );
      if (!response.ok) {
        throw new Error("Failed Get Data menu");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const insertMenu = createAsyncThunk(
  "menu/addMenu",
  async (menuData, { getState, rejectWithValue }) => {
    try {
      const token = getState().login.user?.token || "";
      if (token == "" || null) {
        throw new Error("Unauthorized access");
      }
      const response = await fetch(
        `${import.meta.env.VITE_SOLID_API_URL}/admin/menu`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: menuData,
        },
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed Insert Menu");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateMenu = createAsyncThunk(
  "menu/updateMenu",
  async ({ id, menuData }, { getState, rejectWithValue }) => {
    try {
      const token = getState().login.user?.token || "";

      const response = await fetch(
        `${import.meta.env.VITE_SOLID_API_URL}/admin/menu/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: menuData,
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed Update Menu");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteMenu = createAsyncThunk(
  "menu/deleteMenu",
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().login.user?.token || "";
      const response = await fetch(
        `${import.meta.env.VITE_SOLID_API_URL}/admin/menu/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed Delete Menu");
      }

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.isLoading = false;
        const fetchedData = action.payload.data || action.payload;
        state.items = Array.isArray(fetchedData) ? fetchedData : [];
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(insertMenu.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(insertMenu.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload.data);
      })
      .addCase(insertMenu.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateMenu.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateMenu.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload.data);
      })
      .addCase(updateMenu.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(deleteMenu.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteMenu.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload.data);
      })
      .addCase(deleteMenu.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default menuSlice.reducer;
