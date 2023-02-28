import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { UserInfo } from "../../types/auth";
import { getCurrentUser, login, logOut, register } from "./auth-operations";

export type AuthSlice = {
  user: UserInfo;
  token: string | null;
  isLoggedIn: boolean;
  isFetchingCurrentUser: boolean;
  isLoading: boolean;
};

const initialState: AuthSlice = {
  user: { name: "", email: "", createdAt: "" },
  token: null,
  isLoggedIn: false,
  isFetchingCurrentUser: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(logOut.fulfilled, (state) => {
        state.user = { name: "", email: "", createdAt: "" };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.isFetchingCurrentUser = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        state.user.email = payload?.user.email || "";
        state.user.name = payload?.user.name || "";
        state.user.createdAt = payload?.user.createdAt || "";

        state.isLoggedIn = true;
        state.isFetchingCurrentUser = false;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.isFetchingCurrentUser = false;
      })
      .addMatcher(isAnyOf(register.pending, login.pending), (state) => {
        state.isLoading = true;
      })
      .addMatcher(
        isAnyOf(register.fulfilled, login.fulfilled),
        (state, { payload }) => {
          state.user.email = payload?.user.email || "";
          state.user.name = payload?.user.name || "";
          state.user.createdAt = payload?.user.createdAt || "";
          state.token = payload?.token || null;
          state.isLoggedIn = true;
          state.isLoading = false;
        }
      )
      .addMatcher(isAnyOf(register.rejected, login.rejected), (state) => {
        state.isLoading = false;
      }),
});

export default authSlice.reducer;
export type AuthReducer = ReturnType<typeof authSlice.reducer>;
