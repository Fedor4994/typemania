import s from "./JoinGame.module.scss";
import { UserInfo } from "../../types/auth";
import socket from "../../utils/socketConfig";
import { useState } from "react";

const JoinGame = ({ currentUser }: { currentUser: UserInfo }) => {
  const [gameID, setGameID] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <>
      <h2 className={s.joinGameTitle}>Enter Game ID:</h2>

      <label>
        <input
          className={s.joinInput}
          type="text"
          value={gameID}
          onChange={(e) => setGameID(e.target.value)}
        />
      </label>

      <button
        disabled={!gameID}
        className={s.joinGameButton}
        onClick={() => {
          socket.emit("JOIN_GAME", {
            userId: currentUser._id,
            gameID,
          });
          setGameID("");

          setTimeout(() => {
            setErrorMessage(
              "Game ID is wrong, or the game has already started :("
            );
          }, 500);
        }}
      >
        JOIN GAME
      </button>
      <p className={s.errorMessage}>{errorMessage}</p>
    </>
  );
};

export default JoinGame;
