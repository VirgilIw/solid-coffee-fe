import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
//   isValid: false,
};

const registerSlice = createSlice({
  initialState,
  name: "register",
  reducers: {
    register: (prevState, { payload }) => {
      prevState.user = payload;
    },
  },
});

export const { register } = registerSlice.actions;
export default registerSlice.reducer;
