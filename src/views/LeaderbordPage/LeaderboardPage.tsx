import axios from "axios";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LeaderboardTable from "../../components/LeaderboardTable/LeaderboardTable";
import { getLeaderboardPlace } from "../../redux/auth/auth-operations";
import {
  selectIsLoggedIn,
  selectLeaderboardPlace,
  selectUser,
} from "../../redux/auth/auth-selectors";
import { useAppDispatch } from "../../redux/store";
import { getTestsDetails } from "../../redux/tests/tests-operations";
import { selectTestsDetails } from "../../redux/tests/tests-selectors";
import { User } from "../../types/auth";
import s from "./LeaderboardPage.module.scss";

export type LeaderboardPosition = {
  bestsRecord: number;
  user: User;
};

const LeaderboardPage = () => {
  const [leaderboard, setLeaderBoard] = useState<LeaderboardPosition[]>([]);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userDetails = useSelector(selectTestsDetails);
  const currentUser = useSelector(selectUser);
  const place = useSelector(selectLeaderboardPlace);

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get<LeaderboardPosition[]>(
        "/users/leaderboard"
      );
      setLeaderBoard(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (isLoggedIn && currentUser.verify) {
      dispatch(getLeaderboardPlace(currentUser._id));
      dispatch(getTestsDetails(currentUser._id));
    }
  }, [currentUser._id, currentUser.verify, dispatch, isLoggedIn]);

  return (
    <div className={s.leaderbordPage}>
      {leaderboard.length === 0 ? (
        <div className={s.leaderboardLoader}>
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="var(--main-color)"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            visible={true}
          />
        </div>
      ) : (
        <>
          <h1 className={s.leaderboardTitle}>All time English leaderboard</h1>
          <LeaderboardTable leaderboard={leaderboard} />

          {isLoggedIn ? (
            currentUser.verify ? (
              userDetails?.testCompleted ? (
                <p className={s.yourPosition}>
                  Your place:{" "}
                  {place > 10
                    ? `${place}. Keep practicing to get to the top!`
                    : `${place}. Congratulations, you're in the top!`}
                </p>
              ) : (
                <p className={s.yourPosition}>
                  Complete your first test to be placed on the leaderboard
                </p>
              )
            ) : (
              <p className={s.yourPosition}>
                Verify your accout to be placed on the leaderboard
              </p>
            )
          ) : (
            <p className={s.yourPosition}>
              {
                <Link className={s.signupLink} to="/login">
                  Sing up
                </Link>
              }
              and start typing to be placed on the leaderboard
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default LeaderboardPage;
