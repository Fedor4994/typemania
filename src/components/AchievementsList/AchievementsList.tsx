import { Achievements } from "../../types/auth";
import s from "./AchievementsList.module.scss";
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

const AchievementsList = ({ achievements }: { achievements: Achievements }) => {
  return (
    <div className={s.achievementsList}>
      <h2 className={s.achievementsTitle}>Personal Best</h2>
      <div className={s.speedList}>
        <div
          className={`${s.achievementWrapper} ${
            achievements.speed10 ? s.completed : s.notCompleted
          }`}
        >
          <img
            className={s.achievementImage}
            src={speed10}
            alt="speed achievement"
          />
          <span>Get 10 WPM</span>
        </div>
        <div
          className={`${s.achievementWrapper} ${
            achievements.speed30 ? s.completed : s.notCompleted
          }`}
        >
          <img
            className={s.achievementImage}
            src={speed30}
            alt="speed achievement"
          />
          <span>Get 30 WPM</span>
        </div>
        <div
          className={`${s.achievementWrapper} ${
            achievements.speed50 ? s.completed : s.notCompleted
          }`}
        >
          <img
            className={s.achievementImage}
            src={speed50}
            alt="speed achievement"
          />
          <span>Get 50 WPM</span>
        </div>
        <div
          className={`${s.achievementWrapper} ${
            achievements.speed70 ? s.completed : s.notCompleted
          }`}
        >
          <img
            className={s.achievementImage}
            src={speed70}
            alt="speed achievement"
          />
          <span>Get 70 WPM</span>
        </div>
        <div
          className={`${s.achievementWrapper} ${
            achievements.speed90 ? s.completed : s.notCompleted
          }`}
        >
          <img
            className={s.achievementImage}
            src={speed90}
            alt="speed achievement"
          />
          <span>Get 90 WPM</span>
        </div>
        <div
          className={`${s.achievementWrapper} ${
            achievements.speed110 ? s.completed : s.notCompleted
          }`}
        >
          <img
            className={s.achievementImage}
            src={speed110}
            alt="speed achievement"
          />
          <span>Get 110 WPM</span>
        </div>
        <div
          className={`${s.achievementWrapper} ${
            achievements.speed130 ? s.completed : s.notCompleted
          }`}
        >
          <img
            className={s.achievementImage}
            src={speed130}
            alt="speed achievement"
          />
          <span>Get 130 WPM</span>
        </div>
        <div
          className={`${s.achievementWrapper} ${
            achievements.speed150 ? s.completed : s.notCompleted
          }`}
        >
          <img
            className={s.achievementImage}
            src={speed150}
            alt="speed achievement"
          />
          <span>Get 150 WPM</span>
        </div>
        <div
          className={`${s.achievementWrapper} ${
            achievements.speed175 ? s.completed : s.notCompleted
          }`}
        >
          <img
            className={s.achievementImage}
            src={speed175}
            alt="speed achievement"
          />
          <span>Get 175 WPM</span>
        </div>
        <div
          className={`${s.achievementWrapper} ${
            achievements.speed200 ? s.completed : s.notCompleted
          }`}
        >
          <img
            className={s.achievementImage}
            src={speed200}
            alt="speed achievement"
          />
          <span>Get 200 WPM</span>
        </div>
        <div
          className={`${s.achievementWrapper} ${
            achievements.speed225 ? s.completed : s.notCompleted
          }`}
        >
          <img
            className={s.achievementImage}
            src={speed225}
            alt="speed achievement"
          />
          <span>Get 225 WPM</span>
        </div>
        <div
          className={`${s.achievementWrapper} ${
            achievements.speed250 ? s.completed : s.notCompleted
          }`}
        >
          <img
            className={s.achievementImage}
            src={speed250}
            alt="speed achievement"
          />
          <span>Get 250 WPM</span>
        </div>
      </div>

      <h2 className={s.achievementsTitle}>Tests Completed</h2>
      <div className={s.speedList}>
        <div
          className={`${s.achievementMatchesWrapper} ${
            achievements.matches1 ? s.completed : s.notCompleted
          }`}
        >
          <img
            className={s.achievementImage}
            src={matches1}
            alt="speed achievement"
          />
          <span>Complete 1 test</span>
        </div>
        <div
          className={`${s.achievementMatchesWrapper} ${
            achievements.matches5 ? s.completed : s.notCompleted
          }`}
        >
          <img
            className={s.achievementImage}
            src={matches5}
            alt="speed achievement"
          />
          <span>Complete 5 tests</span>
        </div>
        <div
          className={`${s.achievementMatchesWrapper} ${
            achievements.matches10 ? s.completed : s.notCompleted
          }`}
        >
          <img
            className={s.achievementImage}
            src={matches10}
            alt="speed achievement"
          />
          <span>Complete 10 tests</span>
        </div>
        <div
          className={`${s.achievementMatchesWrapper} ${
            achievements.matches25 ? s.completed : s.notCompleted
          }`}
        >
          <img
            className={s.achievementImage}
            src={matches25}
            alt="speed achievement"
          />
          <span>Complete 25 tests</span>
        </div>
        <div
          className={`${s.achievementMatchesWrapper} ${
            achievements.matches50 ? s.completed : s.notCompleted
          }`}
        >
          <img
            className={s.achievementImage}
            src={matches50}
            alt="speed achievement"
          />
          <span>Complete 50 tests</span>
        </div>
        <div
          className={`${s.achievementMatchesWrapper} ${
            achievements.matches100 ? s.completed : s.notCompleted
          }`}
        >
          <img
            className={s.achievementImage}
            src={matches100}
            alt="speed achievement"
          />
          <span>Complete 100 tests</span>
        </div>
        <div
          className={`${s.achievementMatchesWrapper} ${
            achievements.matches250 ? s.completed : s.notCompleted
          }`}
        >
          <img
            className={s.achievementImage}
            src={matches250}
            alt="speed achievement"
          />
          <span>Complete 250 tests</span>
        </div>
        <div
          className={`${s.achievementMatchesWrapper} ${
            achievements.matches500 ? s.completed : s.notCompleted
          }`}
        >
          <img
            className={s.achievementImage}
            src={matches500}
            alt="speed achievement"
          />
          <span>Complete 500 tests</span>
        </div>
        <div
          className={`${s.achievementMatchesWrapper} ${
            achievements.matches1000 ? s.completed : s.notCompleted
          }`}
        >
          <img
            className={s.achievementImage}
            src={matches1000}
            alt="speed achievement"
          />
          <span>Complete 1000 tests</span>
        </div>
        <div
          className={`${s.achievementMatchesWrapper} ${
            achievements.matches2500 ? s.completed : s.notCompleted
          }`}
        >
          <img
            className={s.achievementImage}
            src={matches2500}
            alt="speed achievement"
          />
          <span>Complete 2500 tests</span>
        </div>
        <div
          className={`${s.achievementMatchesWrapper} ${
            achievements.matches5000 ? s.completed : s.notCompleted
          }`}
        >
          <img
            className={s.achievementImage}
            src={matches5000}
            alt="speed achievement"
          />
          <span>Complete 5000 tests</span>
        </div>
        <div
          className={`${s.achievementMatchesWrapper} ${
            achievements.matches10000 ? s.completed : s.notCompleted
          }`}
        >
          <img
            className={s.achievementImage}
            src={matches10000}
            alt="speed achievement"
          />
          <span>Complete 10000 tests</span>
        </div>
      </div>

      <h2 className={s.achievementsTitle}>Total Playtime</h2>
      <div className={s.speedList}>
        <div
          className={`${s.achievementMatchesWrapper} ${
            achievements.time1m ? s.completed : s.notCompleted
          }`}
        >
          <img
            className={s.achievementImage}
            src={time1m}
            alt="speed achievement"
          />
          <span>1 Minute of Play</span>
        </div>
        <div
          className={`${s.achievementMatchesWrapper} ${
            achievements.time10m ? s.completed : s.notCompleted
          }`}
        >
          <img
            className={s.achievementImage}
            src={time10m}
            alt="speed achievement"
          />
          <span>10 Minute of Play</span>
        </div>
        <div
          className={`${s.achievementMatchesWrapper} ${
            achievements.time30m ? s.completed : s.notCompleted
          }`}
        >
          <img
            className={s.achievementImage}
            src={time30m}
            alt="speed achievement"
          />
          <span>30 Minute of Play</span>
        </div>
        <div
          className={`${s.achievementMatchesWrapper} ${
            achievements.time1h ? s.completed : s.notCompleted
          }`}
        >
          <img
            className={s.achievementImage}
            src={time1h}
            alt="speed achievement"
          />
          <span>1 Hour of Play</span>
        </div>
        <div
          className={`${s.achievementMatchesWrapper} ${
            achievements.time6h ? s.completed : s.notCompleted
          }`}
        >
          <img
            className={s.achievementImage}
            src={time6h}
            alt="speed achievement"
          />
          <span>6 Hours of Play</span>
        </div>
        <div
          className={`${s.achievementMatchesWrapper} ${
            achievements.time12h ? s.completed : s.notCompleted
          }`}
        >
          <img
            className={s.achievementImage}
            src={time12h}
            alt="speed achievement"
          />
          <span>12 Hours of Play</span>
        </div>
        <div
          className={`${s.achievementMatchesWrapper} ${
            achievements.time1d ? s.completed : s.notCompleted
          }`}
        >
          <img
            className={s.achievementImage}
            src={time1d}
            alt="speed achievement"
          />
          <span>1 Day of Play</span>
        </div>
        <div
          className={`${s.achievementMatchesWrapper} ${
            achievements.time7d ? s.completed : s.notCompleted
          }`}
        >
          <img
            className={s.achievementImage}
            src={time7d}
            alt="speed achievement"
          />
          <span>7 Days of Play</span>
        </div>
        <div
          className={`${s.achievementMatchesWrapper} ${
            achievements.time14d ? s.completed : s.notCompleted
          }`}
        >
          <img
            className={s.achievementImage}
            src={time14d}
            alt="speed achievement"
          />
          <span>14 Days of Play</span>
        </div>
        <div
          className={`${s.achievementMatchesWrapper} ${
            achievements.time1month ? s.completed : s.notCompleted
          }`}
        >
          <img
            className={s.achievementImage}
            src={time1month}
            alt="speed achievement"
          />
          <span>1 Month of Play</span>
        </div>
        <div
          className={`${s.achievementMatchesWrapper} ${
            achievements.time3month ? s.completed : s.notCompleted
          }`}
        >
          <img
            className={s.achievementImage}
            src={time3month}
            alt="speed achievement"
          />
          <span>3 Months of Play</span>
        </div>
        <div
          className={`${s.achievementMatchesWrapper} ${
            achievements.time6month ? s.completed : s.notCompleted
          }`}
        >
          <img
            className={s.achievementImage}
            src={time6month}
            alt="speed achievement"
          />
          <span>6 Months of Play</span>
        </div>
      </div>
    </div>
  );
};

export default AchievementsList;
