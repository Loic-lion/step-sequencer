import React from "react";
import * as Tone from "tone";

const ButtonPlayStop = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handleStartClick = async () => {
    try {
      console.log("User clicked the play/stop button.");
      await Tone.start();
      Tone.context.resume();
      if (Tone.Transport.state === "started") {
        Tone.Transport.stop();
        setIsPlaying(false);
      } else {
        Tone.Transport.start();
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
