import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    email: "",
    // password: "",
  },
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoginData: (prevState, { payload }) => {
      prevState = payload;
    },
    clearLoginData: (prevState) => {
      prevState.data = { email: "", password: "" };
    },
  },
});

export const { setLoginData, clearLoginData } = loginSlice.actions;
export default loginSlice.reducer;
