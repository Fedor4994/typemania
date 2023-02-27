import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useSelector } from "react-redux";
import TestsHistory from "../../components/TestsHistory/TestsHistory";
import { useAppDispatch } from "../../redux/store";
import { fetchTests } from "../../redux/tests/tests-operations";
import {
  selectIsLoading,
  selectTests,
} from "../../redux/tests/tests-selectors";
import { clearTests } from "../../redux/tests/testsSlice";
import s from "./AccountPage.module.scss";

const AccountPage = () => {
  const dispatch = useAppDispatch();
  const tests = useSelector(selectTests);
  const isLoading = useSelector(selectIsLoading);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchTests({ page }));
  }, [dispatch, page]);

  useEffect(() => {
    return () => {
      dispatch(clearTests());
    };
  }, [dispatch]);

  return (
    <div className={s.accountPage}>
      {tests.length !== 0 && <TestsHistory tests={tests} />}

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

      <button onClick={() => setPage((prevPage) => prevPage + 1)}>
        LOAD MORE
      </button>
    </div>
  );
};

export default AccountPage;
