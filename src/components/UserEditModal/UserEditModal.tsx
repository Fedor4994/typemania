import { motion } from "framer-motion";
import s from "./UserEditModal.module.scss";

const UserEditModal = ({
  setIsModalOpen,
}: {
  setIsModalOpen: (isOpen: boolean) => void;
}) => {
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
        Edit Profile
      </motion.div>
    </div>
  );
};

export default UserEditModal;
