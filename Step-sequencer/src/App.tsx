import "./css/app.css";
import Header from "./components/menu/header";
import StepSequencer from "./components/step-sequencer/StepSequencer";
import Mixer from "./components/menu/mixer/Mixer";

export default function App() {
  
  return (
    <>
      <Header />
      <main>
      <StepSequencer numOfSteps={32} />
      </main>
      <Mixer/>
    </>
  );
}
