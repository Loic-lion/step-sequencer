import React, { useState } from "react";

function PlayNote({ synth, note, isBlackKey = false }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const playNote = () => {
    if (synth && !isPlaying) {
      synth.triggerAttack(note + "4");
      setIsPlaying(true);
    }
  };

  const stopNote = () => {
    if (synth && isPlaying) {
      synth.triggerRelease();
      setIsPlaying(false);
    }
  };

  const keyClassName = isBlackKey ? "black__key" : "white__key";

  return (
    <div
      className={`key ${keyClassName} ${isPlaying ? "active" : ""}`}
      onMouseDown={playNote}
      onMouseUp={stopNote}
      onMouseLeave={stopNote} // Arrêter la note si la souris quitte la touche
    ></div>
  );
}

export default PlayNote;
