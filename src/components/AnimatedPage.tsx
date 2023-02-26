import { motion } from "framer-motion";

const animations = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const AnimatedPage = ({ children }: { children: JSX.Element }) => {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        duration: 0.6,
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
