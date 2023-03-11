import React, { useState, useEffect } from "react";
import { FaPlay, FaRedo } from "react-icons/fa";
import { TypingEvent } from "../../hooks/useStopwatchTyping";
import GeneratedWords from "../GeneratedWords/GeneratedWords";
import UserTyping from "../UserTyping/UserTyping";
import s from "./RecordTypingModal.module.scss";

export function RecordTypingModal({
  setIsModalOpen,
  typingEvents,
  words,
}: {
  setIsModalOpen: (isOpen: boolean) => void;
  typingEvents: TypingEvent[];
  words: string;
}) {
  const [text, setText] = useState("");
  const [timeouts, setTimeouts] = useState<NodeJS.Timeout[]>([]);

  const handleStart = () => {
    typingEvents.forEach((event) => {
      const timeoutId = setTimeout(() => {
        if (event.char === "Backspace") {
          setText((text) => text.slice(0, -1));
        } else if (event.char !== "Shift" && event.char !== "Alt") {
          setText((text) => text + event.char);
        }
      }, event.timestamp - typingEvents[0].timestamp);

      setTimeouts((prevTimeouts) => [...prevTimeouts, timeoutId]);
    });
  };

  const handleRestartPlayback = () => {
    timeouts.forEach((timeoutId) => {
      clearTimeout(timeoutId);
    });
    setTimeouts([]);
    setText("");
  };

  useEffect(() => {
    const onEscClose = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", onEscClose);
    return () => {
      window.removeEventListener("keydown", onEscClose);
    };
  }, [setIsModalOpen]);

  return (
    <div
      onClick={(event: React.MouseEvent<HTMLElement>) => {
        if (event.target === event.currentTarget) {
          setIsModalOpen(false);
        }
      }}
      className={s.backdrop}
    >
      <div className={s.recordModal}>
        <div className={s.buttonsWrapper}>
          <button
            className={s.controllButton}
            disabled={timeouts.length === 0}
            onClick={handleRestartPlayback}
          >
            <FaRedo size={24} />
          </button>
          <button
            className={s.controllButton}
            disabled={timeouts.length > 0}
            onClick={handleStart}
          >
            <FaPlay size={24} />
          </button>
        </div>

        <div className={s.typingArea}>
          <GeneratedWords words={words} />
          <UserTyping words={words} userInput={text} />
        </div>
      </div>
    </div>
  );
}
