import s from "./LeaderboardTable.module.scss";
import { LeaderboardPosition } from "../../views/LeaderbordPage/LeaderboardPage";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/auth-selectors";
import { FaCrown } from "react-icons/fa";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";

const LeaderboardTable = ({
  leaderboard,
}: {
  leaderboard: LeaderboardPosition[];
}) => {
  const currentUser = useSelector(selectUser);

  return (
    <table className={s.transactionHistory}>
      <thead>
        <tr>
          <th className={s.place}>Place</th>
          <th className={s.nameCol}>Name</th>
          <th>Top WPM</th>
          <th>Joined</th>
        </tr>
      </thead>

      {leaderboard.map(
        (position, index) =>
          position.bestsRecord &&
          position.user.verify && (
            <tbody key={position.user._id}>
              <tr
                className={`${s.tr} 
               ${position.user.email === currentUser.email ? s.userBody : ""}`}
              >
                <td>
                  {index === 0 ? <FaCrown className={s.crown} /> : index + 1}{" "}
                </td>

                <td>
                  <Link
                    className={s.profileLink}
                    to={`/profile/${position.user._id}`}
                  >
                    <div className={s.nameWrapper}>
                      <Avatar user={position.user} />

                      {position.user.name}
                    </div>
                  </Link>
                </td>
                <td>{position.bestsRecord}</td>
                <td>
                  {new Date(position.user.createdAt).toUTCString().slice(5, 16)}
                </td>
              </tr>
            </tbody>
          )
      )}
    </table>
  );
};

export default LeaderboardTable;
