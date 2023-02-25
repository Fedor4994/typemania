export type Test = {
  _id: string;
  wpm: number;
  accuracy: number;
  time: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

export type TestInfo = Pick<Test, "wpm" | "accuracy" | "time">;
