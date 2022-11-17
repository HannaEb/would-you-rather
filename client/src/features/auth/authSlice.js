import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./../api/apiSlice";

const initialState = {
  user: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      apiSlice.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        state.accessToken = payload.accessToken;
        state.user = payload.user;
      }
    );
  },
});

export const selectAuthedUser = (state) => state.auth.user;

export const selectAuthedUserId = (state) => state.auth.user.id;

export default authSlice.reducer;
