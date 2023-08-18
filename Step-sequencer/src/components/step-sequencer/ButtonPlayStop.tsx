import React, { Dispatch, SetStateAction } from "react";
import * as Tone from "tone";

interface ButtonPlayStopProps {
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
}

const ButtonPlayStop: React.FC<ButtonPlayStopProps> = ({ setIsPlaying }) => {
  const [isPlaying, setIsPlayingLocal] = React.useState(false);

  const handleStartClick = async () => {
    try {
      console.log("User clicked the play/stop button.");
      await Tone.start();
      Tone.context.resume();
      if (Tone.Transport.state === "started") {
        Tone.Transport.stop();
        setIsPlayingLocal(false);
        setIsPlaying(false); 
      } else {
        Tone.Transport.start();
        setIsPlayingLocal(true);
        setIsPlaying(true); 
      }
    } catch (error) {
      console.error("Impossible de démarrer l'AudioContext : ", error);
    }
  };

  return (
    <button className="container__player__onoff" onClick={handleStartClick}>
      {isPlaying ? "☐" : "▶"}
    </button>
  );
};

export default ButtonPlayStop;
