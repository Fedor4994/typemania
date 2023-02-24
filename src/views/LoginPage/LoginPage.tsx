import LoginForm from "../../components/LoginForm/LoginForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import s from "./LoginPage.module.scss";

const LoginPage = () => {
  return (
    <div className={s.loginPage}>
      <RegisterForm />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
