import React, { useState } from "react";
import { TypingEvent } from "../../hooks/useStopwatchTyping";
import s from "./RecordTypingModal.module.scss";

export function RecordTypingModal({
  setIsModalOpen,
  typingEvents,
}: {
  setIsModalOpen: (isOpen: boolean) => void;
  typingEvents: TypingEvent[];
}) {
  const [text, setText] = useState("");

  const handlePlayRecording = () => {
    typingEvents.forEach((event) => {
      setTimeout(() => {
        if (event.char === "Backspace") {
          setText((text) => text.slice(0, -1));
        } else if (event.char !== "Shift") {
          setText((text) => text + event.char);
        }
      }, event.timestamp - typingEvents[0].timestamp);
    });
  };

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
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handlePlayRecording}>Play Recording</button>
      </div>
    </div>
  );
}
