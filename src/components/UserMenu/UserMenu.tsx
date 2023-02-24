import { FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../../redux/auth/auth-operations";
import { selectUser } from "../../redux/auth/auth-selectors";
import { useAppDispatch } from "../../redux/store";
import s from "./UserMenu.module.scss";

const UserMenu = () => {
  const { name } = useSelector(selectUser);
  const dispatch = useAppDispatch();

  return (
    <div className={s.userMenu}>
      <Link className={s.accountLink} to="/account">
        <FaUserAlt className={s.userIcon} size={18} />
        <span>{name}</span>
      </Link>
      <button
        className={s.logoutIcon}
        onClick={() => {
          dispatch(logOut());
        }}
      >
        <FaSignOutAlt size={20} />
      </button>
    </div>
  );
};

export default UserMenu;
