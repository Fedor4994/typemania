import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { ImCross } from "react-icons/im";
import { FaCheck, FaSignInAlt } from "react-icons/fa";
import s from "./LoginForm.module.scss";
import { useAppDispatch } from "../../redux/store";
import { login } from "../../redux/auth/auth-operations";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../../redux/auth/auth-selectors";

const LoginForm = () => {
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const dispatch = useAppDispatch();
  const notify = () => toast.error("Incorrect email or password");
  const isLoading = useSelector(selectIsLoading);

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Must be a valid email")
      .required("Email is a required field"),
    password: yup
      .string()
      .min(6, "Must be at least 6 characters")
      .max(20, "Must be at most 20 characters")
      .required("Password is a required field"),
  });

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(login(values)).then((data) => {
        if (data.meta.requestStatus === "rejected") {
          notify();
          resetForm({
            values: {
              email: values.email,
              password: "",
            },
          });
        }
      });
    },
  });

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className={s.loginForm}>
      <p className={s.formTitle}>login</p>

      <label className={s.loginLabel}>
        <input
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="email"
          onBlur={handleBlur}
          className={
            values.email
              ? errors.email
                ? s.invalidInput
                : s.validInput
              : s.emptyInput
          }
        />
        {values.email ? (
          errors.email ? (
            <motion.div
              onHoverStart={() => setEmailErrorMessage(errors.email || "")}
              onHoverEnd={() => setEmailErrorMessage("")}
              className={s.crossIcon}
            >
              <ImCross />
            </motion.div>
          ) : (
            <motion.div
              onHoverStart={() => setEmailErrorMessage("Email is valid!" || "")}
              onHoverEnd={() => setEmailErrorMessage("")}
              className={s.checkIcon}
            >
              <FaCheck />
            </motion.div>
          )
        ) : (
          ""
        )}

        {emailErrorMessage && values.email && (
          <motion.p
            initial={{
              opacity: 0,
              y: "-50%",
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: "-50%",
            }}
            transition={{
              duration: 0.4,
            }}
            className={s.tooltip}
          >
            {emailErrorMessage}
          </motion.p>
        )}
      </label>

      <label className={s.loginLabel}>
        <input
          value={values.password}
          onChange={handleChange}
          id="password"
          type="password"
          placeholder="password"
          onBlur={handleBlur}
          className={
            values.password
              ? errors.password
                ? s.invalidInput
                : s.validInput
              : s.emptyInput
          }
        />
        {values.password ? (
          errors.password ? (
            <motion.div
              onHoverStart={() =>
                setPasswordErrorMessage(errors.password || "")
              }
              onHoverEnd={() => setPasswordErrorMessage("")}
              className={s.crossIcon}
            >
              <ImCross />
            </motion.div>
          ) : (
            <motion.div
              onHoverStart={() =>
                setPasswordErrorMessage("Password is valid!" || "")
              }
              onHoverEnd={() => setPasswordErrorMessage("")}
              className={s.checkIcon}
            >
              <FaCheck />
            </motion.div>
          )
        ) : (
          ""
        )}

        {passwordErrorMessage && values.password && (
          <motion.p
            initial={{
              opacity: 0,
              y: "-50%",
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: "-50%",
            }}
            transition={{
              duration: 0.4,
            }}
            className={s.tooltip}
          >
            {passwordErrorMessage}
          </motion.p>
        )}
      </label>

      <button
        className={s.loginButton}
        disabled={
          values.email === "" || Object.values(errors).length !== 0 || isLoading
        }
      >
        <FaSignInAlt size={18} /> Sign-in
      </button>
    </form>
  );
};

export default LoginForm;
