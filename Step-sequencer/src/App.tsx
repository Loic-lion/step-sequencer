import "./css/app.css";
import Header from "./components/menu/header";
import StepSequencer from "./components/step-sequencer/StepSequencer";
import Mixer from "./components/menu/mixer/mixer";
import Option from "./components/menu/option/option";

export default function App() {

  return (
    <>
      <Header />
      <main>
        <Option />
        <StepSequencer numOfSteps={32} />
      </main>
      <Mixer />
    </>
  );
}
