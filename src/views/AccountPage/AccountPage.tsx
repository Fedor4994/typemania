import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useSelector } from "react-redux";
import TestsHistory from "../../components/TestsHistory/TestsHistory";
import UserInfo from "../../components/UserInfo/UserInfo";
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
  const [page, setPage] = useState(1);
  const [sortValue, setSortValue] = useState(-1);

  useEffect(() => {
    dispatch(fetchTests({ page, sort: sortValue }));
    dispatch(getTestsDetails());
  }, [dispatch, page, sortValue]);

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
      <UserInfo details={testsDetails} />

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
