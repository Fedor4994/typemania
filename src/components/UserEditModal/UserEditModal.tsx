import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import * as yup from "yup";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useAppDispatch } from "../../redux/store";
import s from "./UserEditModal.module.scss";
import { useFormik } from "formik";
import { updateUserName } from "../../redux/auth/auth-operations";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/auth-selectors";
import { toast } from "react-toastify";

const NAME_REGEX = /^[A-Za-z0-9 А-Яа-я]+$/;

const UserEditModal = ({
  setIsModalOpen,
}: {
  setIsModalOpen: (isOpen: boolean) => void;
}) => {
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const currentUser = useSelector(selectUser);
  const notifyError = () =>
    toast.error("A user with the same name already exists");
  const notifySuccess = () => toast.success("User updated!");

  const dispatch = useAppDispatch();

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, "Must be at least 3 characters")
      .max(20, "Must be at most 20 characters")
      .matches(NAME_REGEX, "Only letters and numbers allowed")
      .required("Username is a required field"),
  });

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: currentUser.name,
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(updateUserName(values.name)).then((data) => {
        if (data.meta.requestStatus === "rejected") {
          notifyError();
          resetForm({
            values: {
              name: "",
            },
          });
        } else {
          setIsModalOpen(false);
          notifySuccess();
        }
      });
    },
  });

  useEffect(() => {
    const onEscClose = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", onEscClose);
    return () => {
      window.removeEventListener("keydown", onEscClose);
    };
  }, [setIsModalOpen]);

  return (
    <div
      onClick={(event: React.MouseEvent<HTMLElement>) => {
        if (event.target === event.currentTarget) {
          setIsModalOpen(false);
        }
      }}
      className={s.backdrop}
    >
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            ease: "easeOut",
            duration: 0.15,
          },
        }}
        exit={{
          opacity: 0,
          transition: {
            ease: "easeIn",
            duration: 0.15,
          },
        }}
        className={s.userEditModal}
      >
        <p className={s.formTitle}>Edit Profile</p>
        <form onSubmit={handleSubmit} autoComplete="off" className={s.editForm}>
          <p className={s.formSubTitle}>Edit name</p>

          <label className={s.editLabel}>
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

          <button
            disabled={values.name === "" || Object.values(errors).length !== 0}
            className={s.saveButton}
            type="submit"
          >
            save
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default UserEditModal;
