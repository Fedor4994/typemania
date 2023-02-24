import { Link, Outlet } from "react-router-dom";
import { FaInfo, FaCrown, FaKeyboard, FaUserAlt, FaCode } from "react-icons/fa";
import { AiTwotoneSetting } from "react-icons/ai";
import { IoMdMail } from "react-icons/io";
import Logo from "../../components/Logo/Logo";
import ThemeSwitcher from "../../components/ThemeSwitcher/ThemeSwitcher";
import s from "./Layout.module.scss";
import Clue from "../../components/EscapeClue/Clue";

const Layout = () => {
  return (
    <>
      <div className={s.content}>
        <header className={s.header}>
          <div className={s.headerNav}>
            <Logo />
            <ul className={s.iconsList}>
              <li>
                <Link to="/">
                  <FaKeyboard className={s.infoIcon} size={18} />
                </Link>
              </li>
              <li>
                <Link to="/leaderbord">
                  <FaCrown className={s.infoIcon} size={20} />
                </Link>
              </li>
              <li>
                <Link to="/about">
                  <FaInfo className={s.infoIcon} size={18} />
                </Link>
              </li>
              <li>
                <Link to="/settings">
                  <AiTwotoneSetting className={s.infoIcon} size={18} />
                </Link>
              </li>
            </ul>
          </div>
          <div className={s.loginIcon}>
            <Link to="/login">
              <FaUserAlt className={s.infoIcon} size={18} />
            </Link>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
        <div className={s.clueWrapper}>
          <Clue keyboardButton="Escape" text="restart test" />
          <Clue keyboardButton="Right Arrow" text="next test" />
        </div>
      </div>
      <footer className={s.footer}>
        <ul className={s.footerList}>
          <li>
            <a
              href="https://github.com/Fedor4994/typemania"
              target="_blank"
              rel="noopender noreferrer"
              className={s.footerIcon}
            >
              <FaCode size={16} />
              <span>GitHub</span>
            </a>
          </li>
          <li>
            <Link className={s.footerIcon} to="/contacts">
              <IoMdMail size={18} />
              <span>Contacts</span>
            </Link>
          </li>
        </ul>
        <ThemeSwitcher />
      </footer>
    </>
  );
};

export default Layout;
