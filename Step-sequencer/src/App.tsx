import "./css/app.css";
import Header from "./components/menu/header";
import StepSequencer from "./components/step-sequencer/StepSequencer";

export default function App() {
  return (
    <>
      <Header />
      <main>
      <StepSequencer numOfSteps={32} />
      </main>
    </>
  );
}
