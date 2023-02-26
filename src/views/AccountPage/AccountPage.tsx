import { useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
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
      {isLoading ? (
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
      ) : (
        <TestsHistory tests={tests} />
      )}
    </div>
  );
};

export default AccountPage;
