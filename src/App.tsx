import CountdownTimer from "./components/CountdownTimer/CountdownTimer";
import { faker } from "@faker-js/faker";
import GeneratedWords from "./components/GeneratedWords/GeneratedWords";
import RestartButton from "./components/RestartButton/RestartButton";
import Results from "./components/Results/Results";
import UserTyping from "./components/UserTyping/UserTyping";
// import useEngine from "./hooks/useEngine";
import { calculateAccurancyPercentage } from "./utils/helpers";

function App() {
  // const { state, words, timeLeft, typed, total, restart, errors } = useEngine();
  const words = faker.random.words(20).toLowerCase();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
        background: "rgb(30, 41, 59)",
      }}
    >
      <div>
        <Results
          accurancyPercentage={calculateAccurancyPercentage(0, 0)}
          errors={0}
          total={0}
        />
        <CountdownTimer timeLeft={30} />
      </div>

      <div
        style={{
          position: "relative",
          display: "flex",
          width: "50%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <GeneratedWords words={words} />
        <UserTyping words={words} userInput={"qweqweqw"} />
      </div>

      <RestartButton onRestart={() => {}} />
    </div>
  );
}

export default App;
