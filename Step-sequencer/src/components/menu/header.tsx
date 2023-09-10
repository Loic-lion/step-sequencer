import ButtonPlayStop from "./buttons/ButtonPlayStop";
import React from "react";
import ButtonStepSequencer from "./buttons/ButtonStepSequencer";
import ButtonSynth from "./buttons/ButtonSynth";
import ButtonReadingTrack from "./buttons/ButtonReadingTrack";
import ButtonBPM from "./buttons/ButtonBPM";
import "../../css/header.css";

function Header() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  console.log(isPlaying);
  return (
    <header>
      <h1> DAW Project</h1>
      <section className="container_menu">
        <ButtonPlayStop setIsPlaying={setIsPlaying} />
        <ButtonBPM />
        <ButtonReadingTrack />
        <ButtonSynth />
        <ButtonStepSequencer />
      </section>
    </header>
  );
}
export default Header;
