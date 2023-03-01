import { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import s from "./AboutPage.module.scss";

export type AppDetails = {
  totalTests: number;
  totalUsers: number;
  totalTime: string;
};

const AboutPage = () => {
  const [info, setInfo] = useState<AppDetails>({
    totalTests: 0,
    totalUsers: 0,
    totalTime: "00:00:00",
  });

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get<AppDetails>("/details");
      setInfo(data);
    }
    fetchData();
  }, []);

  return (
    <div className={s.aboutPage}>
      <div className={s.aboutAuthor}>
        Created with
        <motion.div
          initial={{
            scale: 1.5,
          }}
          animate={{
            scale: 1,
          }}
          exit={{
            scale: 1.5,
          }}
          transition={{
            duration: 0.8,
            easings: "ease",
            repeat: Infinity,
          }}
          className={s.heartIcon}
        >
          <FaHeart />
        </motion.div>
        by Fedor Sosnin
      </div>
      <div className={s.appInfo}>
        <div className={s.infoWrapper}>
          Total completed tests:
          <p className={s.infoValue}>{info.totalTests}</p>
        </div>
        <div className={s.infoWrapper}>
          Total time typing:
          <p className={s.infoValue}>{info.totalTime}</p>
        </div>
        <div className={s.infoWrapper}>
          Total Typemania users:
          <p className={s.infoValue}>{info.totalUsers}</p>
        </div>
      </div>
      <p className={s.subTitle}>About</p>
      <p className={s.infoText}>
        Typemania is a minimalistic and customizable typing test. It features
        many test modes, an account system to save your typing speed history,
        and user-configurable features such as themes. Typemania attempts to
        emulate the experience of natural keyboard typing during a typing test,
        by unobtrusively presenting the text prompts and displaying typed
        characters in-place, providing straightforward, real-time feedback on
        typos, speed, and accuracy.
        <br /> Test yourself in various modes, track your progress and improve
        your speed.
      </p>
      <p className={s.subTitle}>Word set</p>
      <p className={s.infoText}>
        This website uses the most common 200 words in the English language to
        generate its tests. Also you can to type quotes of different lengths
        from famous people or from various popular films, computer games, books,
        and so on.
      </p>
      <p className={s.subTitle}>About terms.</p>
      <p className={s.infoText}>
        WPM (words per minute) - total amount of characters in the correctly
        typed words (including spaces), divided by 5 and normalised to 60
        seconds.
        <br /> Accuracy - percentage of correctly pressed keys. Closer to 100%
        is better. Calculated after the test has ended.
      </p>
      <p className={s.subTitle}>Results screen</p>
      <p className={s.infoText}>
        After completing a test you will be able to see your wpm, accuracy, test
        type and spended time. Try to strive for 100% accuracy, so that the
        circle with progress is filled completely. And of course, try to
        increase your speed with each test, and then you can track your progress
        in your profile.
      </p>
    </div>
  );
};

export default AboutPage;
