import { TypingEvent } from "../hooks/useStopwatchTyping";

export type Test = {
  _id: string;
  wpm: number;
  accuracy: number;
  time: number;
  testType: string;
  language: string;
  isHardcore: boolean;
  text: string;
  record: TypingEvent[];
  createdAt: string;
  updatedAt: string;
  userId: string;
};

export type TestInfo = Pick<
  Test,
  | "wpm"
  | "accuracy"
  | "time"
  | "testType"
  | "language"
  | "isHardcore"
  | "text"
  | "record"
>;

export type TestsDetails = {
  averageAccuracy: number;
  averageWpm: number;
  testCompleted: number;
  timeSpended: string;

  timerFifteenTopWpm: number | null;
  timerSixtyTopWpm: number | null;
  timerThirtyTopWpm: number | null;
  timerTwoMinuteTopWpm: number | null;
  topWpm: number | null;
  wordsFiftyTopWpm: number | null;
  wordsHungredTopWpm: number | null;
  wordsTenTopWpm: number | null;
  wordsTwenyFiveTopWpm: number | null;
};
