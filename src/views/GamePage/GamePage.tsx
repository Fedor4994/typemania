import { useParams } from "react-router-dom";
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
import { FaUserPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import useWords from "../../hooks/useWords";
import TimerModal from "../../components/TimerModal/TimerModal";
import GameResultsTable from "../../GameResultsTable/GameResultsTable";
import PlayerCard from "../../components/PlayerCard/PlayerCard";

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

      <h2 className={s.gameSubTitle}>
        {errorMessage && "This game has already started :("}
      </h2>

      <div className={s.playersList}>
        {usersList.map((player) => (
          <PlayerCard
            key={player._id}
            player={player}
            gameState={gameState}
            playersResults={playerResults}
            words={words}
            showStartButton={showButton}
            setShowButton={setShowButton}
          />
        ))}
      </div>

      {playerResults.length !== 0 && (
        <GameResultsTable
          playersResults={playerResults}
          usersList={usersList}
        />
      )}

      {countDown && gameState.isOpen && <TimerModal countDown={countDown} />}
    </div>
  );
};

export default GamePage;
