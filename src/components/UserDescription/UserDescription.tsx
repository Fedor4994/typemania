import { useEffect, useState } from "react";
import { FaLink, FaPencilAlt } from "react-icons/fa";
import { TestsDetails } from "../../types/test";
import s from "./UserDescription.module.scss";
import { formatPercentage } from "../../utils/helpers";
import { User, UserInfo } from "../../types/auth";
import { useLocation } from "react-router-dom";
import { getLeaderboardPlace } from "../../redux/auth/auth-operations";
import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { selectLeaderboardPlace } from "../../redux/auth/auth-selectors";
import { toast } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import UserEditModal from "../UserEditModal/UserEditModal";
import Avatar from "../Avatar/Avatar";

const UserDescription = ({
  details,
  currentUser,
}: {
  details: TestsDetails | null;
  currentUser: UserInfo;
}) => {
  const dispatch = useAppDispatch();
  const notify = () =>
    toast.success("Public URL copied to clipboard", {
      toastId: "linkId",
    });

  const { pathname } = useLocation();
  const isProfile = pathname.slice(0, 8) === "/profile";
  const place = useSelector(selectLeaderboardPlace);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getLeaderboardPlace(currentUser._id));
  }, [currentUser._id, dispatch]);

  return (
    <div className={s.userInfo}>
      <div className={s.mainWrapper}>
        <div className={s.userWrapper}>
          <Avatar size="big" user={currentUser as User} />

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

          {!isProfile && (
            <button
              onClick={() => setIsModalOpen(true)}
              className={s.editButton}
            >
              <FaPencilAlt size={20} />
            </button>
          )}

          <button
            className={`${s.linkButton} ${isProfile ? s.maxHigh : ""}`}
            onClick={() => {
              navigator.clipboard.writeText(
                `https://typemania.vercel.app/profile/${currentUser._id}`
              );
              notify();
            }}
          >
            <FaLink size={20} />
          </button>
        </div>
      </div>

      {isModalOpen && (
        <AnimatePresence>
          <UserEditModal setIsModalOpen={setIsModalOpen} />
        </AnimatePresence>
      )}

      <div className={s.highestsResults}>
        <div className={s.timerHighestsResults}>
          <div className={s.statsWrapper}>
            <span className={s.statsValue}>15 seconds</span>
            {details?.timerFifteenTopWpm
              ? details?.timerFifteenTopWpm + " wpm"
              : "-"}
          </div>
          <div className={s.statsWrapper}>
            <span className={s.statsValue}>30 seconds</span>
            {details?.timerThirtyTopWpm
              ? details?.timerThirtyTopWpm + " wpm"
              : "-"}
          </div>
          <div className={s.statsWrapper}>
            <span className={s.statsValue}>60 seconds</span>
            {details?.timerSixtyTopWpm
              ? details?.timerSixtyTopWpm + " wpm"
              : "-"}
          </div>
          <div className={s.statsWrapper}>
            <span className={s.statsValue}>120 seconds</span>
            {details?.timerTwoMinuteTopWpm
              ? details?.timerTwoMinuteTopWpm + " wpm"
              : "-"}
          </div>
        </div>

        <div className={s.wordsHighestsResults}>
          <div className={s.statsWrapper}>
            <span className={s.statsValue}>10 words</span>
            {details?.wordsTenTopWpm ? details?.wordsTenTopWpm + " wpm" : "-"}
          </div>
          <div className={s.statsWrapper}>
            <span className={s.statsValue}>25 words</span>
            {details?.wordsTwenyFiveTopWpm
              ? details?.wordsTwenyFiveTopWpm + " wpm"
              : "-"}
          </div>
          <div className={s.statsWrapper}>
            <span className={s.statsValue}>50 words</span>
            {details?.wordsFiftyTopWpm
              ? details?.wordsFiftyTopWpm + " wpm"
              : "-"}
          </div>
          <div className={s.statsWrapper}>
            <span className={s.statsValue}>100 words</span>
            {details?.wordsHungredTopWpm
              ? details?.wordsHungredTopWpm + " wpm"
              : "-"}
          </div>
        </div>
      </div>

      {isProfile && (
        <div className={s.sideProfile}>
          All-Time English Leaderboards place: {place}
        </div>
      )}
    </div>
  );
};

export default UserDescription;
