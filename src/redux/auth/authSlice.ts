import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Achievements, initialAchievements, UserInfo } from "../../types/auth";
import {
  getCurrentUser,
  getLeaderboardPlace,
  getUserAchievements,
  login,
  logOut,
  register,
  setCompletedAchievement,
  updateUserAvatar,
  updateUserName,
} from "./auth-operations";

export type AuthSlice = {
  user: UserInfo;
  token: string | null;
  leaderboardPlace: number;
  achievements: Achievements;
  isLoggedIn: boolean;
  isFetchingCurrentUser: boolean;
  isLoading: boolean;
};

const initialState: AuthSlice = {
  user: {
    name: "",
    email: "",
    createdAt: "",
    _id: "",
    avatarURL: "",
    verify: false,
    currentWordIndex: 0,
    isPartyLeader: false,
  },
  leaderboardPlace: 0,
  achievements: initialAchievements,
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
        state.user = {
          name: "",
          email: "",
          createdAt: "",
          _id: "",
          avatarURL: "",
          isPartyLeader: false,

          currentWordIndex: 0,
        };
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
        state.user.avatarURL = payload?.user.avatarURL || "";
        state.user._id = payload?.user._id || "";
        state.user.verify = payload?.user.verify;
        state.user.isPartyLeader = payload?.user.isPartyLeader;
        state.user.currentWordIndex = payload?.user.currentWordIndex;

        state.isLoggedIn = true;
        state.isFetchingCurrentUser = false;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.isFetchingCurrentUser = false;
      })
      .addCase(getLeaderboardPlace.fulfilled, (state, { payload }) => {
        state.leaderboardPlace = payload?.place || 0;
      })
      .addCase(updateUserName.fulfilled, (state, { payload }) => {
        state.user.name = payload?.name || state.user.name;
      })
      .addCase(updateUserAvatar.fulfilled, (state, { payload }) => {
        state.user.avatarURL = payload?.avatarURL || "";
        state.isLoading = false;
      })
      .addCase(getUserAchievements.fulfilled, (state, { payload }) => {
        state.achievements = payload || initialAchievements;
      })
      .addCase(setCompletedAchievement.fulfilled, (state, { payload }) => {
        state.achievements = payload || initialAchievements;
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
          state.user.avatarURL = payload?.user.avatarURL || "";
          state.user._id = payload?.user._id || "";
          state.user.verify = payload?.user.verify;
          state.user.isPartyLeader = payload?.user.isPartyLeader;
          state.user.currentWordIndex = payload?.user.currentWordIndex;

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
