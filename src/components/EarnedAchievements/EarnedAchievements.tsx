import s from "./EarnedAchievements.module.scss";
import { motion } from "framer-motion";
import speed10 from "../../assets/MAX_WPM_10.png";
import speed30 from "../../assets/MAX_WPM_30.png";
import speed50 from "../../assets/MAX_WPM_50.png";
import speed70 from "../../assets/MAX_WPM_70.png";
import speed90 from "../../assets/MAX_WPM_90.png";
import speed110 from "../../assets/MAX_WPM_110.png";
import speed130 from "../../assets/MAX_WPM_130.png";
import speed150 from "../../assets/MAX_WPM_150.png";
import speed175 from "../../assets/MAX_WPM_175.png";
import speed200 from "../../assets/MAX_WPM_200.png";
import speed225 from "../../assets/MAX_WPM_225.png";
import speed250 from "../../assets/MAX_WPM_250.png";
import matches1 from "../../assets/MATCHES_PLAYED_1.png";
import matches5 from "../../assets/MATCHES_PLAYED_5.png";
import matches10 from "../../assets/MATCHES_PLAYED_10.png";
import matches25 from "../../assets/MATCHES_PLAYED_25.png";
import matches50 from "../../assets/MATCHES_PLAYED_50.png";
import matches100 from "../../assets/MATCHES_PLAYED_100.png";
import matches250 from "../../assets/MATCHES_PLAYED_250.png";
import matches500 from "../../assets/MATCHES_PLAYED_500.png";
import matches1000 from "../../assets/MATCHES_PLAYED_1000.png";
import matches2500 from "../../assets/MATCHES_PLAYED_2500.png";
import matches5000 from "../../assets/MATCHES_PLAYED_5000.png";
import matches10000 from "../../assets/MATCHES_PLAYED_10000.png";
import time1m from "../../assets/TOTAL_PLAYTIME_1.png";
import time10m from "../../assets/TOTAL_PLAYTIME_10.png";
import time30m from "../../assets/TOTAL_PLAYTIME_30.png";
import time1h from "../../assets/TOTAL_PLAYTIME_60.png";
import time6h from "../../assets/TOTAL_PLAYTIME_360.png";
import time12h from "../../assets/TOTAL_PLAYTIME_720.png";
import time1d from "../../assets/TOTAL_PLAYTIME_1440.png";
import time7d from "../../assets/TOTAL_PLAYTIME_10080.png";
import time14d from "../../assets/TOTAL_PLAYTIME_20160.png";
import time1month from "../../assets/TOTAL_PLAYTIME_40320.png";
import time3month from "../../assets/TOTAL_PLAYTIME_120960.png";
import time6month from "../../assets/TOTAL_PLAYTIME_241920.png";

const EarnedAchievements = ({ list }: { list: String[] }) => {
  return (
    <div className={s.list}>
      {list.map((achieve, index) => (
        <motion.img
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: index * 0.5,
          }}
          className={s.achieveImage}
          key={index}
          src={`${achieve === "speed10" ? speed10 : ""}${
            achieve === "speed30" ? speed30 : ""
          }${achieve === "speed50" ? speed50 : ""}${
            achieve === "speed70" ? speed70 : ""
          }${achieve === "speed90" ? speed90 : ""}${
            achieve === "speed110" ? speed110 : ""
          }${achieve === "speed130" ? speed130 : ""}${
            achieve === "speed150" ? speed150 : ""
          }${achieve === "speed175" ? speed175 : ""}${
            achieve === "speed200" ? speed200 : ""
          }${achieve === "speed225" ? speed225 : ""}${
            achieve === "speed250" ? speed250 : ""
          }${achieve === "matches1" ? matches1 : ""}${
            achieve === "matches5" ? matches5 : ""
          }${achieve === "matches10" ? matches10 : ""}${
            achieve === "matches25" ? matches25 : ""
          }${achieve === "matches50" ? matches50 : ""}${
            achieve === "matches100" ? matches100 : ""
          }${achieve === "matches250" ? matches250 : ""}${
            achieve === "matches500" ? matches500 : ""
          }${achieve === "matches1000" ? matches1000 : ""}${
            achieve === "matches2500" ? matches2500 : ""
          }${achieve === "matches5000" ? matches5000 : ""}${
            achieve === "matches10000" ? matches10000 : ""
          }${achieve === "time1m" ? time1m : ""}${
            achieve === "time10m" ? time10m : ""
          }${achieve === "time30m" ? time30m : ""}${
            achieve === "time1h" ? time1h : ""
          }${achieve === "time6h" ? time6h : ""}${
            achieve === "time12h" ? time12h : ""
          }${achieve === "time1d" ? time1d : ""}${
            achieve === "time7d" ? time7d : ""
          }${achieve === "time14d" ? time14d : ""}${
            achieve === "time1month" ? time1month : ""
          }${achieve === "time3month" ? time3month : ""}${
            achieve === "time6month" ? time6month : ""
          }`}
          alt="achievement"
        />
      ))}
    </div>
  );
};

export default EarnedAchievements;
