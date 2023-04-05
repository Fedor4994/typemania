import { useCallback, useEffect, useRef, useState } from "react";
import keypress from "../data/sound.wav";
import { TypingEvent } from "./useStopwatchTyping";
import {
  calculateAccurancyPercentage,
  calculateWordsPerMinute,
  countErrors,
  isKeyboardAllowed,
} from "../utils/helpers";
import { State } from "./useTimerTyping";
import useStopwatch from "./useStopwatch";
import socket from "../utils/socketConfig";

import { Game } from "../types/games";
import { User } from "../types/auth";

export const useGameTyping = (
  gameState: Game,
  currentUser: User | undefined,
  countDown: string
) => {
  const words = gameState.words.join(" ") || "a";
  const { isOpen, isOver } = gameState;
  const gameId = gameState._id;

  const [typingEvents, setTypingEvents] = useState<TypingEvent[]>([]);
  const [state, setState] = useState<State>("start");
  const [typed, setTyped] = useState("");
  const [totalTyped, setTotalTyped] = useState(0);
  const [errors, setErrors] = useState(0);
  const [isStopwatchStarted, setIsStopWatchStarted] = useState(false);

  const totalTypedRef = useRef(0);

  const { secondsPassed, startStopwatch, resetStopwatch } = useStopwatch();

  useEffect(() => {
    // Finish words

    if (typed.length === words.length) {
      setTotalTyped(totalTypedRef.current);
      setErrors(countErrors(typed, words));
      resetStopwatch();
      if (totalTyped !== 0) {
        socket.emit(
          "FINISH_GAME",
          {
            wpm: calculateWordsPerMinute(totalTyped - errors, secondsPassed),
            accuracy: calculateAccurancyPercentage(errors, totalTyped),
            time: secondsPassed,
            language: localStorage.getItem("language") || "english",
            text: words,
            record: typingEvents,
          },
          gameId,
          currentUser?._id
        );
      }

      setState("finish");
    }
  }, [
    resetStopwatch,
    secondsPassed,
    totalTyped,
    typed,
    typingEvents,
    words,
    errors,
    currentUser,
    gameId,
  ]);

  const onRestart = useCallback(() => {
    totalTypedRef.current = 0;
    setIsStopWatchStarted(false);
    setTyped("");
    setTotalTyped(0);
    setErrors(0);
    setTypingEvents([]);
    setState("start");
  }, []);

  const keydownHandler = useCallback(
    ({ key, code }: KeyboardEvent) => {
      const audio = new Audio(keypress);

      const timestamp = Date.now();
      const char = key;
      const typingEvent: TypingEvent = { timestamp, char };
      setTypingEvents((prevEvents) => [...prevEvents, typingEvent]);

      const allowed = isKeyboardAllowed(code);
      if (
        !allowed ||
        state === "finish" ||
        currentUser?.currentWordIndex === words.length
      ) {
        return;
      }
      if (state === "start") {
        setState("run");
      }
      switch (key) {
        case "Backspace":
          if (localStorage.getItem("isSound") === "true") {
            audio.play();
          }

          setTyped((typed) => typed.slice(0, -1));
          totalTypedRef.current -= 1;
          socket.emit(
            "UPDATE_INPUT",
            totalTypedRef.current,
            currentUser?._id,
            gameId
          );

          break;
        default:
          if (localStorage.getItem("isSound") === "true") {
            audio.play();
          }

          setTyped((typed) => typed.concat(key));
          totalTypedRef.current += 1;
          socket.emit(
            "UPDATE_INPUT",
            totalTypedRef.current,
            currentUser?._id,
            gameId
          );
          break;
      }
    },
    [
      currentUser?._id,
      currentUser?.currentWordIndex,
      gameId,

      state,
      words.length,
    ]
  );

  useEffect(() => {
    if (countDown === "0" && !isStopwatchStarted) {
      setTimeout(() => {
        startStopwatch();
      }, 1000);
      setIsStopWatchStarted(true);
    }
  }, [countDown, startStopwatch, isStopwatchStarted]);

  useEffect(() => {
    if (!isOpen && !isOver) {
      window.addEventListener("keydown", keydownHandler);
    }
    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [keydownHandler, isOpen, isOver]);

  return {
    typed,
    onRestart,
  };
};
