import { useSelector } from "react-redux";
import { User } from "../../types/auth";
import { Test } from "../../types/test";
import s from "./GameResultsTable.module.scss";
import { selectUser } from "../../redux/auth/auth-selectors";
import { FaCrown } from "react-icons/fa";
import { formatPercentage } from "../../utils/helpers";

const GameResultsTable = ({
  playersResults,
  usersList,
}: {
  playersResults: {
    userResults: Test;
    userId: string;
  }[];
  usersList: User[];
}) => {
  const currentUser = useSelector(selectUser);

  return (
    <table className={s.transactionHistory}>
      <thead>
        <tr>
          <th className={s.place}>Place</th>
          <th className={s.nameCol}>Name</th>
          <th>WPM</th>
          <th>Accuracy</th>
        </tr>
      </thead>

      {playersResults.map((elem, index) => {
        const finishedUser = usersList.find((user) => user._id === elem.userId);
        return (
          <tbody key={elem.userId}>
            <tr
              className={`${s.tr} 
               ${elem.userId === currentUser._id ? s.userBody : ""}`}
            >
              <td>
                {index === 0 ? <FaCrown className={s.crown} /> : index + 1}{" "}
              </td>

              <td>
                <a
                  className={s.profileLink}
                  href={`/profile/${elem.userId}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className={s.tableNameWrapper}>
                    <div className={s.avatar}>
                      <img
                        className={s.avatarImage}
                        src={
                          finishedUser?.avatarURL &&
                          finishedUser?.avatarURL?.length > 100
                            ? finishedUser?.avatarURL
                            : `https://typemania.fly.dev/${finishedUser?.avatarURL}`
                        }
                        alt="avatar"
                      />
                    </div>

                    {finishedUser?.name}
                  </div>
                </a>
              </td>
              <td>{elem.userResults.wpm}</td>
              <td>{formatPercentage(elem.userResults.accuracy)}</td>
            </tr>
          </tbody>
        );
      })}
    </table>
  );
};

export default GameResultsTable;
