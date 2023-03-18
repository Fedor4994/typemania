import axios from "axios";
import { useEffect, useState } from "react";
import { TbMailFast } from "react-icons/tb";
import { ThreeDots } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import AchievementsList from "../../components/AchievementsList/AchievementsList";
import TestsHistory from "../../components/TestsHistory/TestsHistory";
import UserDescription from "../../components/UserDescription/UserDescription";
import { getUserAchievements } from "../../redux/auth/auth-operations";
import {
  selectAchievements,
  selectUser,
} from "../../redux/auth/auth-selectors";
import { useAppDispatch } from "../../redux/store";
import {
  fetchTests,
  getTestsDetails,
} from "../../redux/tests/tests-operations";
import {
  selectIsLoading,
  selectTests,
  selectTestsDetails,
} from "../../redux/tests/tests-selectors";
import { clearTests } from "../../redux/tests/testsSlice";
import s from "./AccountPage.module.scss";

const AccountPage = () => {
  const dispatch = useAppDispatch();
  const tests = useSelector(selectTests);
  const testsDetails = useSelector(selectTestsDetails);
  const isLoading = useSelector(selectIsLoading);
  const currentUser = useSelector(selectUser);
  const achievements = useSelector(selectAchievements);

  const [isTestHistory, setIsTestHistory] = useState(true);
  const [page, setPage] = useState(1);
  const [sortValue, setSortValue] = useState(-1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    dispatch(fetchTests({ page, sort: sortValue }));
    dispatch(getTestsDetails(currentUser._id));
    dispatch(getUserAchievements(currentUser._id));
  }, [currentUser._id, dispatch, page, sortValue]);

  useEffect(() => {
    return () => {
      dispatch(clearTests());
    };
  }, [dispatch]);

  const handleSortChange = (value: number) => {
    dispatch(clearTests());
    setPage(1);
    setSortValue(value);
  };

  const resendEmail = async (email: string) => {
    try {
      await axios.post("/users/verify", { email });
      toast.success("Verification email sent successfully!");
    } catch (error) {
      toast.error("Email sent fails. Try again later.");
      console.log(error);
    }
  };

  return (
    <div className={s.accountPage}>
      {currentUser.verify ? (
        <>
          <UserDescription details={testsDetails} currentUser={currentUser} />

          <div className={s.navigationButtonsWrapper}>
            <button
              className={`${s.navigationButton} ${
                isTestHistory ? s.activeButton : ""
              }`}
              onClick={() => setIsTestHistory(true)}
            >
              Tests history
            </button>
            <button
              className={`${s.navigationButton} ${
                isTestHistory ? "" : s.activeButton
              }`}
              onClick={() => setIsTestHistory(false)}
            >
              Achievements
            </button>
          </div>

          {isTestHistory ? (
            <>
              {tests.length !== 0 && (
                <TestsHistory
                  onSortChange={handleSortChange}
                  tests={tests}
                  sortValue={sortValue}
                />
              )}

              {isLoading && (
                <div className={s.accountLoader}>
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

              {tests.length !== testsDetails?.testCompleted && !isLoading && (
                <button
                  className={s.loadMoreButton}
                  onClick={() => setPage((prevPage) => prevPage + 1)}
                >
                  load more
                </button>
              )}
            </>
          ) : (
            <AchievementsList achievements={achievements} />
          )}
        </>
      ) : (
        <div className={s.verifyWrapper}>
          Your account is not verified. <br /> To use the account statistics,
          you need to verify it. <br /> If you already verified, reload the
          window.
          <button
            disabled={isButtonDisabled}
            className={s.verifyButton}
            onClick={() => {
              resendEmail(currentUser.email);
              setIsButtonDisabled(true);
            }}
          >
            <TbMailFast size={28} /> Send the verification email again.
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
