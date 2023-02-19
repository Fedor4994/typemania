import { Outlet } from "react-router-dom";
import EscapeClue from "../../components/EscapeClue/EscapeClue";
import ThemeSwitcher from "../../components/ThemeSwitcher/ThemeSwitcher";
import s from "./Layout.module.scss";

const Layout = () => {
  return (
    <>
      <div className={s.content}>
        <header className={s.header}>Header</header>
        <main>
          <Outlet />
        </main>
        <EscapeClue />
      </div>
      <footer className={s.footer}>
        <span>Footer</span>
        <ThemeSwitcher />
      </footer>
    </>
  );
};

export default Layout;
