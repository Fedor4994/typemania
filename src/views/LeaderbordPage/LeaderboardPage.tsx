import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/auth-selectors";
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
    }
  }, [isLoggedIn]);

  return (
    <div className={s.leaderbordPage}>
      <ul>
        {leaderboard.map((position) => (
          <li key={position.user._id}>
            <span>{position.user.name}</span>
            <span>{position.bestsRecord ? position.bestsRecord : " 0"}</span>
          </li>
        ))}
      </ul>

      {isLoggedIn && <p>YOUR POSITION: {place}</p>}
    </div>
  );
};

export default LeaderboardPage;
