import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Achievements,
  initialAchievements,
  User,
  UserInfo,
} from "../../types/auth";
import { AuthSlice } from "./authSlice";

// axios.defaults.baseURL = "https://typemania.fly.dev/api";
axios.defaults.baseURL = "http://localhost:8080/api";

const token = {
  set(token: string | null) {
    axios.defaults.headers.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.Authorization = "";
  },
};

export const register = createAsyncThunk(
  "auth/register",
  async (userData: Omit<User, "_id" | "createdAt">, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<{
        token: string | null;
        user: UserInfo;
      }>("/users/register", userData);
      toast.success("Verification email sent");
      token.set(data.token);

      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData: Pick<User, "email" | "password">, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<{
        token: string | null;
        user: UserInfo;
      }>("/users/login", userData);

      token.set(data.token);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const logOut = createAsyncThunk(
  "auth/logOut",
  async (_, { rejectWithValue }) => {
    try {
      token.unset();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getLeaderboardPlace = createAsyncThunk(
  "auth/getPlace",
  async (userId: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<{
        place: number;
      }>(`/users/leaderboard/place/${userId}`);

      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/refresh",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as {
      auth: AuthSlice;
    };
    const persistToken = state.auth.token;

    if (persistToken === null) {
      return rejectWithValue("");
    }
    token.set(persistToken);

    try {
      const { data } = await axios.get<{
        token: string | null;
        user: UserInfo;
      }>("/users/current");

      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as {
        auth: AuthSlice;
      };

      const { isFetchingCurrentUser } = state.auth;
      if (isFetchingCurrentUser) {
        return false;
      }
    },
  }
);

export const updateUserName = createAsyncThunk(
  "auth/updateUsername",
  async (name: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch<User>("/users/name", { name });
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateUserAvatar = createAsyncThunk(
  "auth/updateUserAvatar",
  async ({ avatar }: { avatar: FormData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch<{ avatarURL: string }>(
        "/users/avatars",
        avatar,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getUserAchievements = createAsyncThunk(
  "auth/getAchievements",
  async (userId: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<Achievements>(
        `/users/achievemets/${userId}`
      );

      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const setCompletedAchievement = createAsyncThunk(
  "auth/updateAchievementsCompleted",
  async (
    achievementName: keyof typeof initialAchievements,
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.put<Achievements>("/users/achievemets", {
        achievementName,
      });
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);
