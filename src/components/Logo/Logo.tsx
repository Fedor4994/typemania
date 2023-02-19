import { TiKeyboard } from "react-icons/ti";
import { Link } from "react-router-dom";
import s from "./Logo.module.scss";

const Logo = () => {
  return (
    <Link to="/" className={s.logo}>
      <TiKeyboard size={50} className={s.logoIcon} />
      <span className={s.logoText}>TYPEMANIA</span>
    </Link>
  );
};

export default Logo;
