import { useSelector } from "react-redux";
import { User } from "../../types/auth";
import s from "./PlayerCard.module.scss";
import { selectUser } from "../../redux/auth/auth-selectors";
import { Test } from "../../types/test";
import { FaCrown } from "react-icons/fa";
import { Game } from "../../types/games";
import socket from "../../utils/socketConfig";
import ProgressBar from "../ProgressBar/ProgressBar";
import { useState } from "react";
import { RecordTypingModal } from "../RecordTyping/RecordTypingModal";

interface PlayerCardProps {
  player: User;
  playersResults: {
    userResults: Test;
    userId: string;
  }[];
  gameState: Game;
  words: string;
  showStartButton: boolean;
  setShowButton: (isShow: boolean) => void;
}

const PlayerCard = ({
  player,
  playersResults,
  gameState,
  words,
  showStartButton,
  setShowButton,
}: PlayerCardProps) => {
  const currentUser = useSelector(selectUser);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const startGameHandler = () => {
    socket.emit("TIMER", { userId: currentUser._id, gameID: gameState._id });
    setShowButton(false);
  };

  return (
    <div className={s.playerCard}>
      <div className={s.profileWrapper}>
        <div className={s.nameWrapper}>
          <a
            className={s.profileLink}
            href={`/profile/${player._id}`}
            target="_blank"
            rel="noreferrer"
          >
            <div className={s.avatar}>
              <img
                className={s.avatarImage}
                src={
                  player.avatarURL && player.avatarURL?.length > 100
                    ? player.avatarURL
                    : `https://typemania.fly.dev/${player.avatarURL}`
                }
                alt="avatar"
              />
            </div>
            {player.name} {currentUser._id === player._id && "(you)"}
          </a>

          {player.isPartyLeader && <FaCrown />}
          {playersResults.map(
            (playerResult, index) =>
              playerResult.userId === player._id && (
                <div className={s.userResults} key={index}>
                  <p>Time spend: {playerResult.userResults.time}s</p>

                  {currentUser._id === player._id && (
                    <>
                      <button
                        className={s.replayButton}
                        onClick={() => {
                          setIsModalOpen(true);
                        }}
                      >
                        Watch replay
                      </button>
                      {isModalOpen && (
                        <RecordTypingModal
                          words={gameState.words.join(" ")}
                          typingEvents={playerResult.userResults.record}
                          setIsModalOpen={setIsModalOpen}
                        />
                      )}
                    </>
                  )}
                </div>
              )
          )}
        </div>
      </div>

      {player.isPartyLeader &&
        player._id === currentUser._id &&
        showStartButton && (
          <button className={s.startButton} onClick={startGameHandler}>
            Start game
          </button>
        )}

      {player.isPartyLeader &&
        player._id === currentUser._id &&
        gameState.isOver && (
          <button
            className={s.nextGameButton}
            onClick={() => {
              socket.emit("NEXT_GAME", gameState._id, words);
            }}
          >
            Next game
          </button>
        )}

      {!player.isPartyLeader &&
        player._id === currentUser._id &&
        gameState.isOpen && (
          <p className={s.startNotify}>
            Only leader of party can start the game
          </p>
        )}

      {player.currentWordIndex ? (
        <ProgressBar
          wordIndex={player.currentWordIndex}
          words={gameState.words.join(" ")}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default PlayerCard;
