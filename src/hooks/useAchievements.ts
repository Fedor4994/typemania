import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getUserAchievements,
  setCompletedAchievement,
} from "../redux/auth/auth-operations";
import {
  selectAchievements,
  selectIsLoggedIn,
} from "../redux/auth/auth-selectors";
import { useAppDispatch } from "../redux/store";
import { TestsDetails } from "../types/test";

export const useAchievements = (
  userId: string,
  testsDetails: TestsDetails | null
) => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [earnedAchievements, setEarnedAchievements] = useState<String[]>([]);
  const achievements = useSelector(selectAchievements);

  useEffect(() => {
    dispatch(getUserAchievements(userId)).then(() => {
      if (isLoggedIn) {
        if (
          testsDetails?.topWpm &&
          testsDetails?.topWpm >= 10 &&
          !achievements.speed10
        ) {
          dispatch(setCompletedAchievement("speed10"));

          setEarnedAchievements((prev) => {
            if (prev.includes("speed10")) {
              return prev;
            }
            return [...prev, "speed10"];
          });
        }
        if (
          testsDetails?.topWpm &&
          testsDetails?.topWpm >= 30 &&
          !achievements.speed30
        ) {
          dispatch(setCompletedAchievement("speed30"));
          setEarnedAchievements((prev) => {
            if (prev.includes("speed30")) {
              return prev;
            }
            return [...prev, "speed30"];
          });
        }
        if (
          testsDetails?.topWpm &&
          testsDetails?.topWpm >= 50 &&
          !achievements.speed50
        ) {
          dispatch(setCompletedAchievement("speed50"));
          setEarnedAchievements((prev) => {
            if (prev.includes("speed50")) {
              return prev;
            }
            return [...prev, "speed50"];
          });
        }
        if (
          testsDetails?.topWpm &&
          testsDetails?.topWpm >= 70 &&
          !achievements.speed70
        ) {
          dispatch(setCompletedAchievement("speed70"));
          setEarnedAchievements((prev) => {
            if (prev.includes("speed70")) {
              return prev;
            }
            return [...prev, "speed70"];
          });
        }
        if (
          testsDetails?.topWpm &&
          testsDetails?.topWpm >= 90 &&
          !achievements.speed90
        ) {
          dispatch(setCompletedAchievement("speed90"));
          setEarnedAchievements((prev) => {
            if (prev.includes("speed90")) {
              return prev;
            }
            return [...prev, "speed90"];
          });
        }
        if (
          testsDetails?.topWpm &&
          testsDetails?.topWpm >= 110 &&
          !achievements.speed110
        ) {
          dispatch(setCompletedAchievement("speed110"));
          setEarnedAchievements((prev) => {
            if (prev.includes("speed110")) {
              return prev;
            }
            return [...prev, "speed110"];
          });
        }
        if (
          testsDetails?.topWpm &&
          testsDetails?.topWpm >= 130 &&
          !achievements.speed130
        ) {
          dispatch(setCompletedAchievement("speed130"));
          setEarnedAchievements((prev) => {
            if (prev.includes("speed130")) {
              return prev;
            }
            return [...prev, "speed130"];
          });
        }
        if (
          testsDetails?.topWpm &&
          testsDetails?.topWpm >= 150 &&
          !achievements.speed150
        ) {
          dispatch(setCompletedAchievement("speed150"));
          setEarnedAchievements((prev) => {
            if (prev.includes("speed150")) {
              return prev;
            }
            return [...prev, "speed150"];
          });
        }
        if (
          testsDetails?.topWpm &&
          testsDetails?.topWpm >= 175 &&
          !achievements.speed175
        ) {
          dispatch(setCompletedAchievement("speed175"));
          setEarnedAchievements((prev) => {
            if (prev.includes("speed175")) {
              return prev;
            }
            return [...prev, "speed175"];
          });
        }
        if (
          testsDetails?.topWpm &&
          testsDetails?.topWpm >= 200 &&
          !achievements.speed200
        ) {
          dispatch(setCompletedAchievement("speed200"));
          setEarnedAchievements((prev) => {
            if (prev.includes("speed200")) {
              return prev;
            }
            return [...prev, "speed200"];
          });
        }
        if (
          testsDetails?.topWpm &&
          testsDetails?.topWpm >= 225 &&
          !achievements.speed225
        ) {
          dispatch(setCompletedAchievement("speed225"));
          setEarnedAchievements((prev) => {
            if (prev.includes("speed225")) {
              return prev;
            }
            return [...prev, "speed225"];
          });
        }
        if (
          testsDetails?.topWpm &&
          testsDetails?.topWpm >= 250 &&
          !achievements.speed250
        ) {
          dispatch(setCompletedAchievement("speed250"));
          setEarnedAchievements((prev) => {
            if (prev.includes("speed250")) {
              return prev;
            }
            return [...prev, "speed250"];
          });
        }
        if (
          testsDetails?.testCompleted &&
          testsDetails?.testCompleted >= 1 &&
          !achievements.matches1
        ) {
          dispatch(setCompletedAchievement("matches1"));
          setEarnedAchievements((prev) => {
            if (prev.includes("matches1")) {
              return prev;
            }
            return [...prev, "matches1"];
          });
        }
        if (
          testsDetails?.testCompleted &&
          testsDetails?.testCompleted >= 5 &&
          !achievements.matches5
        ) {
          dispatch(setCompletedAchievement("matches5"));
          setEarnedAchievements((prev) => {
            if (prev.includes("matches5")) {
              return prev;
            }
            return [...prev, "matches5"];
          });
        }
        if (
          testsDetails?.testCompleted &&
          testsDetails?.testCompleted >= 10 &&
          !achievements.matches10
        ) {
          dispatch(setCompletedAchievement("matches10"));
          setEarnedAchievements((prev) => {
            if (prev.includes("matches10")) {
              return prev;
            }
            return [...prev, "matches10"];
          });
        }
        if (
          testsDetails?.testCompleted &&
          testsDetails?.testCompleted >= 25 &&
          !achievements.matches25
        ) {
          dispatch(setCompletedAchievement("matches25"));
          setEarnedAchievements((prev) => {
            if (prev.includes("matches25")) {
              return prev;
            }
            return [...prev, "matches25"];
          });
        }
        if (
          testsDetails?.testCompleted &&
          testsDetails?.testCompleted >= 50 &&
          !achievements.matches50
        ) {
          dispatch(setCompletedAchievement("matches50"));
          setEarnedAchievements((prev) => {
            if (prev.includes("matches50")) {
              return prev;
            }
            return [...prev, "matches50"];
          });
        }
        if (
          testsDetails?.testCompleted &&
          testsDetails?.testCompleted >= 100 &&
          !achievements.matches100
        ) {
          dispatch(setCompletedAchievement("matches100"));
          setEarnedAchievements((prev) => {
            if (prev.includes("matches100")) {
              return prev;
            }
            return [...prev, "matches100"];
          });
        }
        if (
          testsDetails?.testCompleted &&
          testsDetails?.testCompleted >= 250 &&
          !achievements.matches250
        ) {
          dispatch(setCompletedAchievement("matches250"));
          setEarnedAchievements((prev) => {
            if (prev.includes("matches250")) {
              return prev;
            }
            return [...prev, "matches250"];
          });
        }
        if (
          testsDetails?.testCompleted &&
          testsDetails?.testCompleted >= 500 &&
          !achievements.matches500
        ) {
          dispatch(setCompletedAchievement("matches500"));
          setEarnedAchievements((prev) => {
            if (prev.includes("matches500")) {
              return prev;
            }
            return [...prev, "matches500"];
          });
        }
        if (
          testsDetails?.testCompleted &&
          testsDetails?.testCompleted >= 1000 &&
          !achievements.matches1000
        ) {
          dispatch(setCompletedAchievement("matches1000"));
          setEarnedAchievements((prev) => {
            if (prev.includes("matches1000")) {
              return prev;
            }
            return [...prev, "matches1000"];
          });
        }
        if (
          testsDetails?.testCompleted &&
          testsDetails?.testCompleted >= 2500 &&
          !achievements.matches2500
        ) {
          dispatch(setCompletedAchievement("matches2500"));
          setEarnedAchievements((prev) => {
            if (prev.includes("matches2500")) {
              return prev;
            }
            return [...prev, "matches2500"];
          });
        }
        if (
          testsDetails?.testCompleted &&
          testsDetails?.testCompleted >= 5000 &&
          !achievements.matches5000
        ) {
          dispatch(setCompletedAchievement("matches5000"));
          setEarnedAchievements((prev) => {
            if (prev.includes("matches5000")) {
              return prev;
            }
            return [...prev, "matches5000"];
          });
        }
        if (
          testsDetails?.testCompleted &&
          testsDetails?.testCompleted >= 10000 &&
          !achievements.matches10000
        ) {
          dispatch(setCompletedAchievement("matches10000"));
          setEarnedAchievements((prev) => {
            if (prev.includes("matches10000")) {
              return prev;
            }
            return [...prev, "matches10000"];
          });
        }

        if (
          testsDetails?.timeSpended &&
          testsDetails?.timeSpended.length === 5 &&
          Number(testsDetails?.timeSpended.slice(0, 2)) >= 1 &&
          !achievements.time1m
        ) {
          dispatch(setCompletedAchievement("time1m"));
          setEarnedAchievements((prev) => {
            if (prev.includes("time1m")) {
              return prev;
            }
            return [...prev, "time1m"];
          });
        }
        if (
          testsDetails?.timeSpended &&
          testsDetails?.timeSpended.length === 5 &&
          Number(testsDetails?.timeSpended.slice(0, 2)) >= 10 &&
          !achievements.time10m
        ) {
          dispatch(setCompletedAchievement("time10m"));
          setEarnedAchievements((prev) => {
            if (prev.includes("time10m")) {
              return prev;
            }
            return [...prev, "time10m"];
          });
        }
        if (
          testsDetails?.timeSpended &&
          testsDetails?.timeSpended.length === 5 &&
          Number(testsDetails?.timeSpended.slice(0, 2)) >= 30 &&
          !achievements.time30m
        ) {
          dispatch(setCompletedAchievement("time30m"));
          setEarnedAchievements((prev) => {
            if (prev.includes("time30m")) {
              return prev;
            }
            return [...prev, "time30m"];
          });
        }
        if (
          testsDetails?.timeSpended &&
          testsDetails?.timeSpended.length === 8 &&
          Number(testsDetails?.timeSpended.slice(0, 2)) >= 1 &&
          !achievements.time1h
        ) {
          dispatch(setCompletedAchievement("time1h"));
          setEarnedAchievements((prev) => {
            if (prev.includes("time1h")) {
              return prev;
            }
            return [...prev, "time1h"];
          });
        }
        if (
          testsDetails?.timeSpended &&
          testsDetails?.timeSpended.length === 8 &&
          Number(testsDetails?.timeSpended.slice(0, 2)) >= 6 &&
          !achievements.time6h
        ) {
          dispatch(setCompletedAchievement("time6h"));
          setEarnedAchievements((prev) => {
            if (prev.includes("time6h")) {
              return prev;
            }
            return [...prev, "time6h"];
          });
        }
        if (
          testsDetails?.timeSpended &&
          testsDetails?.timeSpended.length === 8 &&
          Number(testsDetails?.timeSpended.slice(0, 2)) >= 12 &&
          !achievements.time12h
        ) {
          dispatch(setCompletedAchievement("time12h"));
          setEarnedAchievements((prev) => {
            if (prev.includes("time12h")) {
              return prev;
            }
            return [...prev, "time12h"];
          });
        }
        if (
          testsDetails?.timeSpended &&
          testsDetails?.timeSpended.length === 8 &&
          Number(testsDetails?.timeSpended.slice(0, 2)) >= 24 &&
          !achievements.time1d
        ) {
          dispatch(setCompletedAchievement("time1d"));
          setEarnedAchievements((prev) => {
            if (prev.includes("time1d")) {
              return prev;
            }
            return [...prev, "time1d"];
          });
        }
        if (
          testsDetails?.timeSpended &&
          testsDetails?.timeSpended.length === 9 &&
          Number(testsDetails?.timeSpended.slice(0, 3)) >= 168 &&
          !achievements.time7d
        ) {
          dispatch(setCompletedAchievement("time7d"));
          setEarnedAchievements((prev) => {
            if (prev.includes("time7d")) {
              return prev;
            }
            return [...prev, "time7d"];
          });
        }
        if (
          testsDetails?.timeSpended &&
          testsDetails?.timeSpended.length === 9 &&
          Number(testsDetails?.timeSpended.slice(0, 3)) >= 336 &&
          !achievements.time14d
        ) {
          dispatch(setCompletedAchievement("time14d"));
          setEarnedAchievements((prev) => {
            if (prev.includes("time14d")) {
              return prev;
            }
            return [...prev, "time14d"];
          });
        }
        if (
          testsDetails?.timeSpended &&
          testsDetails?.timeSpended.length === 9 &&
          Number(testsDetails?.timeSpended.slice(0, 3)) >= 720 &&
          !achievements.time1month
        ) {
          dispatch(setCompletedAchievement("time1month"));
          setEarnedAchievements((prev) => {
            if (prev.includes("time1month")) {
              return prev;
            }
            return [...prev, "time1month"];
          });
        }
        if (
          testsDetails?.timeSpended &&
          testsDetails?.timeSpended.length === 10 &&
          Number(testsDetails?.timeSpended.slice(0, 4)) >= 2160 &&
          !achievements.time3month
        ) {
          dispatch(setCompletedAchievement("time3month"));
          setEarnedAchievements((prev) => {
            if (prev.includes("time3month")) {
              return prev;
            }
            return [...prev, "time3month"];
          });
        }
        if (
          testsDetails?.timeSpended &&
          testsDetails?.timeSpended.length === 10 &&
          Number(testsDetails?.timeSpended.slice(0, 4)) >= 4320 &&
          !achievements.time6month
        ) {
          dispatch(setCompletedAchievement("time6month"));
          setEarnedAchievements((prev) => {
            if (prev.includes("time6month")) {
              return prev;
            }
            return [...prev, "time6month"];
          });
        }
      }
    });
  }, [
    achievements.matches1,
    achievements.matches10,
    achievements.matches100,
    achievements.matches1000,
    achievements.matches10000,
    achievements.matches25,
    achievements.matches250,
    achievements.matches2500,
    achievements.matches5,
    achievements.matches50,
    achievements.matches500,
    achievements.matches5000,
    achievements.speed10,
    achievements.speed110,
    achievements.speed130,
    achievements.speed150,
    achievements.speed175,
    achievements.speed200,
    achievements.speed225,
    achievements.speed250,
    achievements.speed30,
    achievements.speed50,
    achievements.speed70,
    achievements.speed90,
    achievements.time10m,
    achievements.time12h,
    achievements.time14d,
    achievements.time1d,
    achievements.time1h,
    achievements.time1m,
    achievements.time1month,
    achievements.time30m,
    achievements.time3month,
    achievements.time6h,
    achievements.time6month,
    achievements.time7d,
    dispatch,
    isLoggedIn,
    testsDetails?.testCompleted,
    testsDetails?.timeSpended,
    testsDetails?.topWpm,
    userId,
  ]);

  return earnedAchievements;
};
