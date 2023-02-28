import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Test, TestInfo, TestsDetails } from "../../types/test";
import { TestsSlice } from "./testsSlice";

export const fetchTests = createAsyncThunk(
  "tests/fetchTests",
  async (
    { page = 1, sort = -1 }: { page?: number; sort?: number },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.get<Test[]>(
        `/tests?page=${page}&sort=${sort}`
      );
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

export const getTestsDetails = createAsyncThunk(
  "tests/testsDetails",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<TestsDetails>(`/tests/details`);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);
