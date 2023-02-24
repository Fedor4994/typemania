import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { motion } from "framer-motion";
import { ImCross } from "react-icons/im";
import { FaCheck, FaUserPlus } from "react-icons/fa";
import s from "./RegisterForm.module.scss";
import { useAppDispatch } from "../../redux/store";
import { register } from "../../redux/auth/auth-operations";

const RegisterForm = () => {
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const dispatch = useAppDispatch();

  const NAME_REGEX = /^[A-Za-z0-9 А-Яа-я]+$/;

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, "Must be at least 3 characters")
      .max(20, "Must be at most 20 characters")
      .matches(NAME_REGEX, "Only letters and numbers allowed")
      .required("Username is a required field"),
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
      name: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(register(values));
    },
  });

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className={s.registerForm}>
      <p className={s.formTitle}>register</p>

      <label className={s.registerLabel}>
        <input
          value={values.name}
          onChange={handleChange}
          id="name"
          placeholder="username"
          onBlur={handleBlur}
          className={
            values.name
              ? errors.name
                ? s.invalidInput
                : s.validInput
              : s.emptyInput
          }
        />
        {values.name ? (
          errors.name ? (
            <motion.div
              onHoverStart={() => setNameErrorMessage(errors.name || "")}
              onHoverEnd={() => setNameErrorMessage("")}
              className={s.crossIcon}
            >
              <ImCross />
            </motion.div>
          ) : (
            <motion.div
              onHoverStart={() =>
                setNameErrorMessage("Username is valid!" || "")
              }
              onHoverEnd={() => setNameErrorMessage("")}
              className={s.checkIcon}
            >
              <FaCheck />
            </motion.div>
          )
        ) : (
          ""
        )}

        {nameErrorMessage && values.name !== "" && (
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
            {nameErrorMessage}
          </motion.p>
        )}
      </label>

      <label className={s.registerLabel}>
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

        {emailErrorMessage && values.email !== "" && (
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

      <label className={s.registerLabel}>
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
        className={s.registerButton}
        disabled={values.email === "" || Object.values(errors).length !== 0}
      >
        <FaUserPlus size={18} /> Sign-up
      </button>
    </form>
  );
};

export default RegisterForm;
