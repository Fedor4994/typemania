import s from "./CreateGame.module.scss";
import { UserInfo } from "../../types/auth";
import socket from "../../utils/socketConfig";
import useWords from "../../hooks/useWords";
import { FaLanguage } from "react-icons/fa";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useState } from "react";

export const languages = [
  "english",
  "ukrainian",
  "russian",
  "javascript",
  "twitch emotes",
];

const CreateGame = ({ currentUser }: { currentUser: UserInfo }) => {
  const { words, setWordsCount, wordsCount } = useWords();
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "english"
  );

  return (
    <>
      <div className={s.settingsWrapper}>
        <div className={s.settingsTitleWraper}>
          <div className={s.settingsTitle}>
            <FaLanguage />
            <p>language</p>
          </div>
          <p className={s.settingsSubTitle}>
            Change in which language you want to type.
          </p>
        </div>
        <Dropdown
          controlClassName={s.dropdownInput}
          menuClassName={s.dropdown}
          arrowClassName={s.arrow}
          options={languages}
          onChange={(option) => {
            setLanguage(option.value);
            localStorage.setItem("language", option.value);
          }}
          value={language}
          placeholder="Select an language"
        />
      </div>

      <h2 className={s.createGameTitle}>Set words count:</h2>

      <ul className={s.navigationList}>
        <li
          onClick={() => {
            localStorage.setItem("wordsOption", "10");
            setWordsCount(10);
          }}
          className={`${s.navigationIcon} ${
            wordsCount === 10 ? s.activeOption : ""
          }`}
        >
          10
        </li>
        <li
          onClick={() => {
            localStorage.setItem("wordsOption", "25");
            setWordsCount(25);
          }}
          className={`${s.navigationIcon} ${
            wordsCount === 25 ? s.activeOption : ""
          }`}
        >
          25
        </li>
        <li
          onClick={() => {
            localStorage.setItem("wordsOption", "50");
            setWordsCount(50);
          }}
          className={`${s.navigationIcon} ${
            wordsCount === 50 ? s.activeOption : ""
          }`}
        >
          50
        </li>
        <li
          onClick={() => {
            localStorage.setItem("wordsOption", "100");
            setWordsCount(100);
          }}
          className={`${s.navigationIcon} ${
            wordsCount === 100 ? s.activeOption : ""
          }`}
        >
          100
        </li>
      </ul>

      <button
        className={s.createGameButton}
        onClick={() => {
          socket.emit("CREATE_GAME", {
            userId: currentUser._id,
            words: words.split(" "),
          });
        }}
      >
        create private game
      </button>
    </>
  );
};

export default CreateGame;
