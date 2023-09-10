import React, { useState } from "react";
import * as Tone from "tone";

function ButtonBPM() {
  const [bpm, setBpm] = useState<number>(120);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBpm = parseInt(e.target.value, 10);
    setBpm(newBpm);

    Tone.Transport.bpm.value = newBpm;
  };



  return (
    <>
    <span>BPM: </span>
    <input
      type="number"
      min="1"
      max="999"
      value={bpm}
      onChange={handleChange}
    />
    </>
  );
}

export default ButtonBPM;
