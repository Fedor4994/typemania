import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Test, TestInfo } from "../../types/test";
import { TestsSlice } from "./testsSlice";

export const fetchTests = createAsyncThunk(
  "tests/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<Test[]>("/tests");
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const addTest = createAsyncThunk(
  "tests/addTest",
  async (newTest: TestInfo, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<Test>("/tests", newTest);
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
        tests: TestsSlice;
      };

      const { isLoading } = state.tests;
      if (isLoading) {
        return false;
      }
    },
  }
);
