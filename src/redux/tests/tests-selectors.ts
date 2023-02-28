import { RootState } from "../store";

export const selectTests = (state: RootState) => state.tests.items;
export const selectIsLoading = (state: RootState) => state.tests.isLoading;
export const selectError = (state: RootState) => state.tests.error;
export const selectLastTest = (state: RootState) => state.tests.lastTest;
export const selectTestsDetails = (state: RootState) =>
  state.tests.testsDetails;
