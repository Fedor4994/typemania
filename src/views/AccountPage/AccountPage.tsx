import { useEffect } from "react";
import { useSelector } from "react-redux";
import TestsHistory from "../../components/TestsHistory/TestsHistory";
import { useAppDispatch } from "../../redux/store";
import { fetchTests } from "../../redux/tests/tests-operations";
import {
  selectIsLoading,
  selectTests,
} from "../../redux/tests/tests-selectors";
import s from "./AccountPage.module.scss";

const AccountPage = () => {
  const dispatch = useAppDispatch();
  const tests = useSelector(selectTests);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchTests());
  }, [dispatch]);

  return (
    <div className={s.accountPage}>
      {isLoading ? <p>Loading...</p> : <TestsHistory tests={tests} />}
    </div>
  );
};

export default AccountPage;
