import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { selectUser } from "../../redux/auth/auth-selectors";
import { TestsDetails } from "../../types/test";
import s from "./UserInfo.module.scss";
import { formatPercentage } from "../../utils/helpers";

const UserInfo = ({ details }: { details: TestsDetails | null }) => {
  const currentUser = useSelector(selectUser);

  return (
    <div className={s.userInfo}>
      <div className={s.mainWrapper}>
        <div className={s.userWrapper}>
          <div className={s.avatar}>
            <FaUserCircle size="100%" />
          </div>
          <div>
            <p className={s.username}>{currentUser.name}</p>
            <p className={s.joined}>
              Joined{" "}
              {new Date(currentUser.createdAt).toUTCString().slice(5, 17)}
            </p>
          </div>
        </div>

        <div className={s.divide} />

        <div className={s.userStats}>
          <div className={s.statsWrapper}>
            <span className={s.statsValue}>Time typing: </span>
            {details?.timeSpended}
          </div>

          <div className={s.statsWrapper}>
            <span className={s.statsValue}>Tests completed: </span>
            {details?.testCompleted}
          </div>

          <div className={s.statsWrapper}>
            <span className={s.statsValue}>Highest WPM: </span>
            {details?.topWpm ? details?.topWpm : "-"}
          </div>

          <div className={s.statsWrapper}>
            <span className={s.statsValue}>Average WPM: </span>
            {details?.averageWpm ? details?.averageWpm : "-"}
          </div>

          <div className={s.statsWrapper}>
            <span className={s.statsValue}>Average accuracy: </span>
            {formatPercentage(details?.averageAccuracy || 0)}
          </div>
        </div>
      </div>

      <div className={s.highestsResults}>
        <div className={s.timerHighestsResults}>
          <div className={s.statsWrapper}>
            <span className={s.statsValue}>15 seconds</span>
            {details?.timerFifteenTopWpm
              ? details?.timerFifteenTopWpm + " WPM"
              : "-"}
          </div>
          <div className={s.statsWrapper}>
            <span className={s.statsValue}>30 seconds</span>
            {details?.timerThirtyTopWpm
              ? details?.timerThirtyTopWpm + " WPM"
              : "-"}
          </div>
          <div className={s.statsWrapper}>
            <span className={s.statsValue}>60 seconds</span>
            {details?.timerSixtyTopWpm
              ? details?.timerSixtyTopWpm + " WPM"
              : "-"}
          </div>
          <div className={s.statsWrapper}>
            <span className={s.statsValue}>120 seconds</span>
            {details?.timerTwoMinuteTopWpm
              ? details?.timerTwoMinuteTopWpm + " WPM"
              : "-"}
          </div>
        </div>

        <div className={s.wordsHighestsResults}>
          <div className={s.statsWrapper}>
            <span className={s.statsValue}>10 words</span>
            {details?.wordsTenTopWpm ? details?.wordsTenTopWpm + " WPM" : "-"}
          </div>
          <div className={s.statsWrapper}>
            <span className={s.statsValue}>25 words</span>
            {details?.wordsTwenyFiveTopWpm
              ? details?.wordsTwenyFiveTopWpm + " WPM"
              : "-"}
          </div>
          <div className={s.statsWrapper}>
            <span className={s.statsValue}>50 words</span>
            {details?.wordsFiftyTopWpm
              ? details?.wordsFiftyTopWpm + " WPM"
              : "-"}
          </div>
          <div className={s.statsWrapper}>
            <span className={s.statsValue}>100 words</span>
            {details?.wordsHungredTopWpm
              ? details?.wordsHungredTopWpm + " WPM"
              : "-"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
