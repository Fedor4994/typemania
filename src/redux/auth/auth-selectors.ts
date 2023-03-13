import { RootState } from "../store";

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectUser = (state: RootState) => state.auth.user;
export const selectLeaderboardPlace = (state: RootState) =>
  state.auth.leaderboardPlace;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectIsFetchingUser = (state: RootState) =>
  state.auth.isFetchingCurrentUser;
export const selectAchievements = (state: RootState) => state.auth.achievements;
