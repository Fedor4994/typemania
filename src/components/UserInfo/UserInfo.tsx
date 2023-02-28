import { TestsDetails } from "../../types/test";
import s from "./UserInfo.module.scss";

const UserInfo = ({ details }: { details: TestsDetails | null }) => {
  return (
    <div className={s.userInfo}>
      <p>{details?.averageAccuracy} averageAccuracy</p>
      <p>{details?.averageWpm} averageWpm</p>
      <p>{details?.testCompleted} testCompleted</p>
      <p>{details?.timeSpended.days} days</p>
      <p>{details?.timeSpended.hours} hours</p>
      <p>{details?.timeSpended.minutes} minutes</p>
      <p>{details?.timeSpended.seconds} seconds</p>
      <p>{details?.timerFifteenTopWpm} timerFifteenTopWpm</p>
      <p>{details?.timerSixtyTopWpm} timerSixtyTopWpm</p>
      <p>{details?.timerThirtyTopWpm} timerThirtyTopWpm</p>
      <p>{details?.timerTwoMinuteTopWpm} timerTwoMinuteTopWpm</p>
      <p>{details?.topWpm} topWpm</p>
      <p>{details?.wordsFiftyTopWpm} wordsFiftyTopWpm</p>
      <p>{details?.wordsHungredTopWpm} wordsHungredTopWpm</p>
      <p>{details?.wordsTenTopWpm} wordsTenTopWpm</p>
      <p>{details?.wordsTwenyFiveTopWpm} wordsTwenyFiveTopWpm</p>
    </div>
  );
};

export default UserInfo;
