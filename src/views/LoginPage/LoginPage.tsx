import { useSelector } from "react-redux";
import { Watch } from "react-loader-spinner";
import LoginForm from "../../components/LoginForm/LoginForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { selectIsLoading } from "../../redux/auth/auth-selectors";
import s from "./LoginPage.module.scss";

const LoginPage = () => {
  const isLoading = useSelector(selectIsLoading);

  return (
    <>
      {isLoading && (
        <div className={s.loginLoading}>
          <Watch
            height="80"
            width="80"
            radius="48"
            ariaLabel="watch-loading"
            visible={true}
            color="#fff"
          />
        </div>
      )}
      <div className={s.loginPage}>
        <RegisterForm />
        <LoginForm />
      </div>
    </>
  );
};

export default LoginPage;
