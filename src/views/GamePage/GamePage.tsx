import { Link, useParams } from "react-router-dom";
import s from "./GamePage.module.scss";
import { useEffect, useState } from "react";
import socket from "../../utils/socketConfig";
import { Game } from "../../types/games";
import axios, { AxiosError } from "axios";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/auth-selectors";
import { User } from "../../types/auth";
import GeneratedWords from "../../components/GeneratedWords/GeneratedWords";
import UserTyping from "../../components/UserTyping/UserTyping";
import { useGameTyping } from "../../hooks/useGameTyping";
import { Test } from "../../types/test";
import { FaCrown, FaUserPlus } from "react-icons/fa";
import { RecordTypingModal } from "../../components/RecordTyping/RecordTypingModal";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { toast } from "react-toastify";
import { formatPercentage } from "../../utils/helpers";
import useWords from "../../hooks/useWords";

const GamePage = () => {
  const [gameState, setGameState] = useState<Game>({
    _id: "",
    createdAt: "",
    isOpen: false,
    isOver: false,
    players: [],
    updatedAt: "",
    words: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usersList, setUsersList] = useState<User[]>([]);
  const [showButton, setShowButton] = useState(true);
  const [countDown, setCountDown] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [playerResults, setPlayerResults] = useState<
    {
      userResults: Test;
      userId: string;
    }[]
  >([]);
  const { words, updateWords } = useWords();

  const { gameId } = useParams();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const currentUser = useSelector(selectUser);

  const { typed, onRestart } = useGameTyping(
    gameState,
    usersList.find((user) => user._id === currentUser._id),
    countDown
  );

  const notify = () =>
    toast.success("Invite code copied to clipboard", {
      toastId: "linkId",
    });

  const getUserById = async (userId: string) => {
    const { data } = await axios.get<User>(`users/leaderboard/list/${userId}`);
    return data;
  };

  useEffect(() => {
    socket.on("UPDATE_GAME", (game: Game) => {
      if (game.isOpen && !game.isOver) {
        socket.emit("NEXT_GAME_SECONDARY");
        updateWords();
        setPlayerResults([]);
        setCountDown("");
        setShowButton(true);
        onRestart();
      }
      setGameState(game);
    });

    socket.on("TIMER", (seconds: string) => {
      setCountDown(seconds);
    });

    socket.on("UPDATE_PLAYER", (user: User) => {
      const updatedUsersList = usersList.map((player) => {
        if (player._id === user._id) {
          return {
            ...player,
            currentWordIndex: user.currentWordIndex,
          };
        } else {
          return player;
        }
      });

      setUsersList(updatedUsersList);
    });

    socket.on("PLAYER_FINISH", (data) => {
      setPlayerResults((prev) => [...prev, data]);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, [gameState._id, onRestart, updateWords, usersList, words]);

  useEffect(() => {
    if (gameState.isOpen) {
      setUsersList([]);

      gameState.players.forEach(async (playerId) => {
        const user = await getUserById(playerId);

        setUsersList((prev) => [...prev, user]);
      });
    }
  }, [gameState.players, gameState.isOpen]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get<Game>(`/games/${gameId}`);
        setGameState(data);
      } catch (error) {
        const err = error as AxiosError;
        const errorMessage = err.response?.data as { message: string };
        setErrorMessage(errorMessage.message || "");
      }
    };

    if (isLoggedIn) {
      fetchData();
    }
  }, [gameId, isLoggedIn]);

  const startGameHandler = () => {
    socket.emit("TIMER", { userId: currentUser._id, gameID: gameId });
    setShowButton(false);
  };

  return (
    <div className={s.gamePage}>
      {gameState.isOpen && (
        <p className={s.gameSubTitle}>
          Private game <br />
          <span
            className={s.gameCode}
            onClick={() => {
              navigator.clipboard.writeText(gameId || "");
              notify();
            }}
          >
            Сlick to copy the code to invite friends <FaUserPlus />
          </span>
        </p>
      )}

      {!gameState.isOpen && !errorMessage ? (
        gameState.isOver ? (
          <p className={s.gameSubTitle}>
            All players finish typing. Game is over!
          </p>
        ) : (
          <p className={s.gameSubTitle}>Game is started. Let's type!</p>
        )
      ) : (
        <></>
      )}

      <div className={s.typingArea}>
        <GeneratedWords words={gameState.words.join(" ")} />
        <UserTyping words={gameState.words.join(" ")} userInput={typed} />
      </div>

      <h2>{errorMessage && "The game has already started :("}</h2>

      <div className={s.playersList}>
        {usersList.map((player) => (
          <div className={s.playerCard} key={player._id}>
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
                {playerResults.map(
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
              showButton && (
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
        ))}
      </div>

      {playerResults.length !== 0 && (
        <table className={s.transactionHistory}>
          <thead>
            <tr>
              <th className={s.place}>Place</th>
              <th className={s.nameCol}>Name</th>
              <th>WPM</th>
              <th>Accuracy</th>
            </tr>
          </thead>

          {playerResults.map((elem, index) => {
            const finishedUser = usersList.find(
              (user) => user._id === elem.userId
            );
            return (
              <tbody key={elem.userId}>
                <tr
                  className={`${s.tr} 
               ${elem.userId === currentUser._id ? s.userBody : ""}`}
                >
                  <td>
                    {index === 0 ? <FaCrown className={s.crown} /> : index + 1}{" "}
                  </td>

                  <td>
                    <Link
                      className={s.profileLink}
                      to={`/profile/${elem.userId}`}
                    >
                      <div className={s.tableNameWrapper}>
                        <div className={s.avatar}>
                          <img
                            className={s.avatarImage}
                            src={
                              finishedUser?.avatarURL &&
                              finishedUser?.avatarURL?.length > 100
                                ? finishedUser?.avatarURL
                                : `https://typemania.fly.dev/${finishedUser?.avatarURL}`
                            }
                            alt="avatar"
                          />
                        </div>

                        {finishedUser?.name}
                      </div>
                    </Link>
                  </td>
                  <td>{elem.userResults.wpm}</td>
                  <td>{formatPercentage(elem.userResults.accuracy)}</td>
                </tr>
              </tbody>
            );
          })}
        </table>
      )}

      {countDown && gameState.isOpen && (
        <div className={s.backdrop}>
          <div className={s.timerModal}>
            Seconds left:{" "}
            <span className={s.timerNumber}>{Number(countDown) + 1}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePage;
