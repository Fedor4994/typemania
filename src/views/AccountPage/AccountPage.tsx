import { useEffect } from "react";
import { useSelector } from "react-redux";
import TestsHistory from "../../components/TestsHistory/TestsHistory";
import { useAppDispatch } from "../../redux/store";
import { fetchTests } from "../../redux/tests/tests-operations";
import { selectTests } from "../../redux/tests/tests-selectors";
import s from "./AccountPage.module.scss";

const AccountPage = () => {
  const dispatch = useAppDispatch();
  const tests = useSelector(selectTests);

  useEffect(() => {
    dispatch(fetchTests());
  }, [dispatch]);

  console.log(tests);

  return (
    <div className={s.accountPage}>
      <TestsHistory tests={tests} />
    </div>
  );
};

export default AccountPage;
