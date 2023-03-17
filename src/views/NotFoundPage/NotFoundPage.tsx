import s from "./NotFoundPage.module.scss";
import notfound from "../../assets/notfoundimage.webp";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className={s.notFoundPage}>
      <img className={s.errorImage} src={notfound} alt="notfound" />
      <div className={s.infoWrapper}>
        <span className={s.statusCode}>404</span>
        <p
          style={{
            textAlign: "center",
          }}
        >
          Ooops! Looks like you found a page that doesn't exist.
        </p>
        <Link className={s.gohomeButton} to="/">
          <FaHome /> Go home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
