import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useSelector } from "react-redux";
import TestsHistory from "../../components/TestsHistory/TestsHistory";
import UserDescription from "../../components/UserDescription/UserDescription";
import { selectUser } from "../../redux/auth/auth-selectors";
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
  const [page, setPage] = useState(1);
  const [sortValue, setSortValue] = useState(-1);

  useEffect(() => {
    dispatch(fetchTests({ page, sort: sortValue }));
    dispatch(getTestsDetails(currentUser._id));
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

  return (
    <div className={s.accountPage}>
      <UserDescription details={testsDetails} currentUser={currentUser} />

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
    </div>
  );
};

export default AccountPage;
