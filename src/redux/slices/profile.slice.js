import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: {},
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    editProfile: (prevState, { payload }) => {
      prevState.profile = payload;
    },
  },
});

export const { editProfile } = profileSlice.actions;
export default profileSlice.reducer;
