import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { motion } from "framer-motion";
import { ImCross } from "react-icons/im";
import { FaCheck, FaSignInAlt } from "react-icons/fa";
import s from "./LoginForm.module.scss";

const LoginForm = () => {
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Must be a valid email")
      .required("Email is a required field"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be at most 20 characters")
      .required("Password is a required field"),
  });

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
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
            <FaCheck className={s.checkIcon} />
          )
        ) : (
          ""
        )}

        {emailErrorMessage && (
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
            <FaCheck className={s.checkIcon} />
          )
        ) : (
          ""
        )}

        {passwordErrorMessage && (
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
        disabled={values.email === "" || Object.values(errors).length !== 0}
      >
        <FaSignInAlt size={18} /> Sign-in
      </button>
    </form>
  );
};

export default LoginForm;
