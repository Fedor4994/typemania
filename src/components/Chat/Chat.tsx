import { useState } from "react";
import s from "./Chat.module.scss";
import { User } from "../../types/auth";
import { useChatScroll } from "../../hooks/useChatScroll";
import { FaAngleDoubleRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/auth-selectors";
import socket from "../../utils/socketConfig";
import { Game } from "../../types/games";

const Chat = ({
  messageList,
  usersList,
  gameState,
}: {
  messageList: { user: User; message: string }[];
  usersList: User[];
  gameState: Game;
}) => {
  const [message, setMessage] = useState("");

  const currentUser = useSelector(selectUser);

  const ref = useChatScroll(messageList);

  return (
    <div ref={ref} className={s.chatWrapper}>
      <ul className={s.messagesList}>
        <li className={s.chatTitle}>Chat</li>
        {usersList.map((user, index) => (
          <li key={index} className={s.joinedUserWrapper}>
            <FaAngleDoubleRight /> {`${user.name} has joined the lobby.`}
          </li>
        ))}

        {messageList.map((message, index) => {
          const { message: messageText, user } = message;
          return (
            <li key={index} className={s.messageWrapper}>
              <div className={s.avatar}>
                <img
                  className={s.avatarImage}
                  src={
                    user?.avatarURL && user?.avatarURL?.length > 100
                      ? user?.avatarURL
                      : `https://typemania.fly.dev/${user?.avatarURL}`
                  }
                  alt="avatar"
                />
              </div>
              <div className={s.messageInfo}>
                <p>
                  {user.name} {user._id === currentUser._id ? "(you)" : ""}
                </p>
                <p className={s.message}>{messageText}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          socket.emit("CHAT_MESSAGE", {
            user: currentUser,
            gameID: gameState._id,
            message,
          });
          setMessage("");
        }}
      >
        <input
          className={s.chatInput}
          type="text"
          name="message"
          placeholder="Enter a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Chat;
