import React, { useState, useEffect } from "react";
import * as Tone from "tone";

interface ChorusControlProps {
  synth: Tone.PolySynth | null;
}

const ChorusControl: React.FC<ChorusControlProps> = ({ synth }) => {
  const [chorus, setChorus] = useState<Tone.Chorus | null>(null);
  const [chorusOptions, setChorusOptions] = useState({
    frequency: 1.5,
    delayTime: 2.5,
    depth: 0.7,
    spread: 180,
    wet: 0.3,
  });
  const [isChorusActive, setIsChorusActive] = useState(true);

  const handleChorusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setChorusOptions((prevOptions) => ({
      ...prevOptions,
      [name]: parseFloat(value),
    }));
  };

  useEffect(() => {
    if (chorus) {
      chorus.set(chorusOptions);
      chorus.wet.value = chorusOptions.wet;
    }
  }, [chorus, chorusOptions]);

  useEffect(() => {
    const newChorus = new Tone.Chorus().toDestination();
    setChorus(newChorus);
    synth?.connect(newChorus);

    return () => {
      newChorus.dispose();
    };
  }, [synth]);

  useEffect(() => {
    if (chorus && synth) {
      if (isChorusActive) {
        synth.connect(chorus);
      } else {
        synth.disconnect(chorus);
      }
    }
  }, [synth, chorus, isChorusActive]);

  const toggleChorus = () => {
    setIsChorusActive(!isChorusActive);
  };

  return (
    <div className="chorus-control">
      <h2>Chorus</h2>
      <div>
        <button onClick={toggleChorus}>{isChorusActive ? "ON" : "OFF"}</button>
      </div>
      <div>
        <label>Wetness</label>
        <input
          type="range"
          name="wet"
          min="0"
          max="1"
          step="0.01"
          value={chorusOptions.wet}
          onChange={handleChorusChange}
        />
      </div>
      <div>
        <label>Frequency</label>
        <input
          type="range"
          name="frequency"
          min="0.1"
          max="10"
          step="0.1"
          value={chorusOptions.frequency}
          onChange={handleChorusChange}
        />
      </div>
      <div>
        <label>Delay Time</label>
        <input
          type="range"
          name="delayTime"
          min="0.1"
          max="8"
          step="0.1"
          value={chorusOptions.delayTime}
          onChange={handleChorusChange}
        />
      </div>
      <div>
        <label>Depth</label>
        <input
          type="range"
          name="depth"
          min="0"
          max="1"
          step="0.01"
          value={chorusOptions.depth}
          onChange={handleChorusChange}
        />
      </div>
      <div>
        <label>Spread</label>
        <input
          type="range"
          name="spread"
          min="0"
          max="180"
          step="1"
          value={chorusOptions.spread}
          onChange={handleChorusChange}
        />
      </div>
    </div>
  );
};

export default ChorusControl;
