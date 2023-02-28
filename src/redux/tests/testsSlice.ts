import { createSlice, isAnyOf, SerializedError } from "@reduxjs/toolkit";
import { Test, TestsDetails } from "../../types/test";
import { addTest, fetchTests, getTestsDetails } from "./tests-operations";

export type TestsSlice = {
  items: Test[];
  testsDetails: TestsDetails | null;
  lastTest: Test | null;
  isLoading: boolean;
  error: SerializedError | null;
};

const initialState: TestsSlice = {
  items: [],
  testsDetails: null,
  lastTest: null,
  isLoading: false,
  error: null,
};

const testsSlice = createSlice({
  name: "tests",
  initialState,
  reducers: {
    setLastTest(state, { payload }) {
      state.lastTest = payload;
    },
    clearTests(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) =>
    builder

      .addCase(fetchTests.fulfilled, (state, { payload }) => {
        if (payload) {
          state.items = [...state.items, ...payload];
        }
      })
      .addCase(getTestsDetails.fulfilled, (state, { payload }) => {
        if (payload) {
          state.testsDetails = payload;
        }
      })
      .addCase(addTest.fulfilled, (state, { payload }) => {
        if (payload) {
          state.lastTest = payload;
        }
      })
      .addMatcher(isAnyOf(fetchTests.pending, addTest.pending), (state) => {
        state.isLoading = true;
      })
      .addMatcher(isAnyOf(fetchTests.fulfilled, addTest.fulfilled), (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addMatcher(
        isAnyOf(fetchTests.rejected, addTest.rejected),
        (state, { error }) => {
          state.isLoading = false;
          state.error = error;
        }
      ),
});

export default testsSlice.reducer;
export const { setLastTest, clearTests } = testsSlice.actions;
