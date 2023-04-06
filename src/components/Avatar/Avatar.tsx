import { User } from "../../types/auth";
import s from "./Avatar.module.scss";

type AvatarSize = "small" | "medium" | "big";

const Avatar = ({
  user,
  size = "small",
}: {
  user: User;
  size?: AvatarSize;
}) => {
  return (
    <div
      className={
        size === "big"
          ? s.avatarBig
          : size === "medium"
          ? s.avatarMedium
          : s.avatar
      }
    >
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
  );
};

export default Avatar;
