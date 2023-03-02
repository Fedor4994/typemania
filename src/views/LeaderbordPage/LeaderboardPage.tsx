import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LeaderboardTable from "../../components/LeaderboardTable/LeaderboardTable";
import { selectIsLoggedIn } from "../../redux/auth/auth-selectors";
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
  const [place, setPlace] = useState(0);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userDetails = useSelector(selectTestsDetails);
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
    async function fetchCurrentPlace() {
      const { data } = await axios.get<{ place: number }>(
        "/users/leaderboard/place"
      );
      setPlace(data.place);
    }

    if (isLoggedIn) {
      fetchCurrentPlace();
      dispatch(getTestsDetails());
    }
  }, [dispatch, isLoggedIn]);

  return (
    <div className={s.leaderbordPage}>
      <LeaderboardTable leaderboard={leaderboard} />

      {isLoggedIn &&
        (userDetails?.testCompleted ? (
          <p className={s.yourPosition}>
            YOUR POSITION:{" "}
            {place > 10
              ? `${place}. Keep practicing to get to the top!`
              : `${place}. Congratulations, you're in the top!`}
          </p>
        ) : (
          <p className={s.yourPosition}>
            Complete your first test to be placed on the leaderboard
          </p>
        ))}
    </div>
  );
};

export default LeaderboardPage;
