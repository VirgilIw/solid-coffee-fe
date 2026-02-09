import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    // console.log(payload);
    try {
      const API_URL = import.meta.env.VITE_SOLID_API_URL;

      const res = await fetch(`${API_URL}/auth/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      // console.log(data);
      if (!res.ok) {
        throw new Error(data.message);
      }

      const token = data.data.token;

      const decodedUser = jwtDecode(token);
      // console.log(decodedUser);
      return {
        email: payload.email,
        token,
        user: decodedUser,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const initialState = {
  user: null,
  getUserStatus: {
    user: {
      isLoading: false,
      isSuccess: false,
      isFailed: false,
    },
  },
  errors: {
    data: null,
  },
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      state.getUserStatus.user.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    return builder.addAsyncThunk(loginThunk, {
      pending: (prevState) => {
        prevState.getUserStatus.user.isLoading = true;
        prevState.getUserStatus.user.isSuccess = false;
        prevState.getUserStatus.user.isFailed = false;
      },
      fulfilled: (prevState, action) => {
        prevState.getUserStatus.user.isLoading = false;
        prevState.getUserStatus.user.isSuccess = true;

        prevState.user = {
          email: action.payload.email, // dari form
           ...action.payload.user,
        };
        // console.log("PAYLOAD LOGIN:", action.payload);
      },
      rejected: (prevState, { payload }) => {
        prevState.getUserStatus.user.isLoading = false;
        prevState.getUserStatus.user.isFailed = true;
        prevState.errors.data = payload;
      },
    });
  },
});

export const { signOut } = loginSlice.actions;
export const loginAction = { ...loginSlice.actions, loginThunk };
export default loginSlice.reducer;
