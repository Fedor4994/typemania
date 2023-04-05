import s from "./MultiplayerPage.module.scss";
import { useEffect, useState } from "react";
import socket from "../../utils/socketConfig";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/auth-selectors";
import { Game } from "../../types/games";
import { useNavigate } from "react-router-dom";
import CreateGame from "../../components/CreateGame/CreateGame";
import JoinGame from "../../components/JoinGame/JoinGame";
import custom from "../../assets/custom.svg";
import { FaUserLock, FaUserPlus } from "react-icons/fa";

const MultiplayerPage = () => {
  const [openModal, setOpenModal] = useState("");
  const [gameState, setGameState] = useState<Game>({
    _id: "",
    createdAt: "",
    isOpen: false,
    isOver: false,
    players: [],
    updatedAt: "",
    words: [],
  });

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const currentUser = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("UPDATE_GAME", (game: Game) => {
      setGameState(game);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    navigate(`${gameState._id}`);
  }, [gameState._id, navigate]);

  useEffect(() => {
    const onEscClose = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        setOpenModal("");
      }
    };

    window.addEventListener("keydown", onEscClose);
    return () => {
      window.removeEventListener("keydown", onEscClose);
    };
  }, [setOpenModal]);

  return (
    <div className={s.multiplayerPage}>
      {isLoggedIn ? (
        currentUser.verify ? (
          <div className={s.privateGameWrapper}>
            <div className={s.privateTitle}>
              Private Custom PvP
              <img src={custom} alt="custom" />
            </div>

            <p className={s.privateSubTitle}>
              Play with your friends and family
            </p>

            <div className={s.buttonsWrapper}>
              <button
                className={s.privateButton}
                onClick={() => {
                  setOpenModal("create");
                }}
              >
                Create game <FaUserLock />
              </button>
              <button
                className={s.privateButton}
                onClick={() => setOpenModal("join")}
              >
                Join game <FaUserPlus />
              </button>
            </div>
            {openModal && (
              <div
                onClick={(event: React.MouseEvent<HTMLElement>) => {
                  if (event.target === event.currentTarget) {
                    setOpenModal("");
                  }
                }}
                className={s.backdrop}
              >
                <div className={s.recordModal}>
                  {openModal === "create" ? (
                    <>
                      <CreateGame currentUser={currentUser} />
                    </>
                  ) : (
                    <JoinGame currentUser={currentUser} />
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p>PLEASE VERIFY YOUR ACCOUNT TO USE MULTIPLAYER MODE</p>
        )
      ) : (
        <p>LOGIN TO USE MULTIPLAYER MODE</p>
      )}
    </div>
  );
};

export default MultiplayerPage;
