import React, { useState, useEffect } from "react";
import * as Tone from "tone";
import "../../../css/master.css";

function Master() {
  const [volume, setVolume] = useState<number>(0);
  const [mute, setMute] = useState<boolean>(false);
  const [volumeColor, setVolumeColor] = useState<string>("green");

  const toggleMute = () => {
    setMute(!mute);
    Tone.Master.mute = !mute;
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const volumeValue = parseFloat(event.target.value);
    setVolume(volumeValue);
    Tone.Master.volume.value = volumeValue;
  };

  useEffect(() => {
    Tone.start();

    const volumeUpdater = setInterval(() => {
      const level = Tone.Master.volume.value;
      setVolume(level);

      if (level > 3) {
        setVolumeColor("red");
      } else {
        setVolumeColor("green");
      }
    }, 2000);

    return () => {
      clearInterval(volumeUpdater);
    };
  }, []);

  return (
    <div className="container__master">
      <h3>Master</h3>
      <div
        style={{
          width: "20px",
          height: "20px",
          backgroundColor: volumeColor,
          transition: "background-color 0.2s",
        }}
      ></div>
      <input
        type="range"
        min="-60"
        max="6"
        step="0.1"
        value={volume}
        onChange={handleVolumeChange}
      />

      <br />
      <button onClick={toggleMute}>{mute ? "Unmute" : "Mute"}</button>
    </div>
  );
}

export default Master;
