import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { User, UserInfo } from "../../types/auth";
import s from "./ProfilePage.module.scss";
import { useAppDispatch } from "../../redux/store";
import { getTestsDetails } from "../../redux/tests/tests-operations";
import { useSelector } from "react-redux";
import { selectTestsDetails } from "../../redux/tests/tests-selectors";
import UserDescription from "../../components/UserDescription/UserDescription";
import { ThreeDots } from "react-loader-spinner";
import AchievementsList from "../../components/AchievementsList/AchievementsList";
import { getUserAchievements } from "../../redux/auth/auth-operations";
import { selectAchievements } from "../../redux/auth/auth-selectors";

const ProfilePage = () => {
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const userDetails = useSelector(selectTestsDetails);
  const achievements = useSelector(selectAchievements);

  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get<User>(
        `users/leaderboard/list/${userId}`
      );
      setUser(data);
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    if (user?._id) {
      dispatch(getTestsDetails(user._id));
      dispatch(getUserAchievements(user._id));
    }
  }, [dispatch, user?._id]);

  return (
    <div className={s.profilePage}>
      {user ? (
        <>
          <UserDescription
            details={userDetails}
            currentUser={user as UserInfo}
          />
          <AchievementsList achievements={achievements} />;
        </>
      ) : (
        <div className={s.profileLoader}>
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
      )}
    </div>
  );
};

export default ProfilePage;
