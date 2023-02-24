import { useFormik } from "formik";
import s from "./LoginForm.module.scss";

const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form autoComplete="off" className={s.loginForm}>
      <label htmlFor="email">Email</label>
      <input
        value={formik.values.email}
        onChange={formik.handleChange}
        id="email"
        type="email"
        placeholder="Enter your email"
      />

      <label htmlFor="password">password</label>
      <input
        value={formik.values.password}
        onChange={formik.handleChange}
        id="password"
        type="password"
        placeholder="Enter your password"
      />
      <button>SUMBIT</button>
    </form>
  );
};

export default LoginForm;
