import { Outlet } from "react-router-dom";
import ThemeSwitcher from "../../components/ThemeSwitcher/ThemeSwitcher";
import s from "./Layout.module.scss";

const Layout = () => {
  return (
    <>
      <div className={s.content}>
        <header>Header</header>
        <main>
          <Outlet />
        </main>
      </div>
      <footer className={s.footer}>
        <span>Footer</span>
        <ThemeSwitcher />
      </footer>
    </>
  );
};

export default Layout;
