import ButtonPlayStop from "./buttons/ButtonPlayStop";
import React from "react";
import ButtonStepSequencer from "./buttons/ButtonStepSequencer";
import ButtonSynth from "./buttons/ButtonSynth";
import ButtonReadingTrack from "./buttons/ButtonReadingTrack";
import ButtonBPM from "./buttons/ButtonBPM";
import ButtonMixer from "./buttons/ButtonMixer";
import ButtonOption from "./buttons/ButtonOption";
import "../../css/header.css";

function Header() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  console.log(isPlaying);
  return (
    <header>
      
      <h1>DAW Project 
        <span>eosguegvczfpnvpqffaencb
          </span>
          </h1>
      <nav className="container_menu">
        <ul>
          <li>
          <ButtonOption />
          </li>
          
          <li>
            <ButtonPlayStop setIsPlaying={setIsPlaying} />
          </li>
         
          <li>
            <ButtonBPM />
          </li>
          <li>
            <ButtonReadingTrack />
          </li>
          <li>
            <ButtonSynth />
          </li>
          <li>
            <ButtonStepSequencer />
          </li>
          <li>
            <ButtonMixer />
          </li>
       
        </ul>
      </nav>
  
    </header>
    
  );
}
export default Header;
