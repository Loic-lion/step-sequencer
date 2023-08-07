import React, { useState, useEffect } from "react";
import * as Tone from "tone";

interface TremoloControlProps {
  synth: Tone.PolySynth | null;
}

const TremoloControl: React.FC<TremoloControlProps> = ({ synth }) => {
  const [tremolo, setTremolo] = useState<Tone.Tremolo | null>(null);
  const [tremoloOptions, setTremoloOptions] = useState({
    frequency: 5,
    depth: 0.5,
    spread: 180,
  });

  const handleTremoloChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTremoloOptions((prevOptions) => ({
      ...prevOptions,
      [name]: parseFloat(value),
    }));
  };

  useEffect(() => {
    if (tremolo) {
      tremolo.set(tremoloOptions);
    }
  }, [tremolo, tremoloOptions]);

  const initializeTremolo = () => {
    const newTremolo = new Tone.Tremolo().toDestination();
    setTremolo(newTremolo);
    synth?.connect(newTremolo);
  };

  if (synth && !tremolo) {
    initializeTremolo();
  }

  return (
    <div className="tremolo-control">
      <h2>Tremolo</h2>
      <div>
        <label>Frequency</label>
        <input
          type="range"
          name="frequency"
          min="0.1"
          max="20"
          step="0.1"
          value={tremoloOptions.frequency}
          onChange={handleTremoloChange}
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
          value={tremoloOptions.depth}
          onChange={handleTremoloChange}
        />
      </div>
      <div>
        <label>Spread</label>
        <input
          type="range"
          name="spread"
          min="0"
          max="360"
          step="1"
          value={tremoloOptions.spread}
          onChange={handleTremoloChange}
        />
      </div>
    </div>
  );
};

export default TremoloControl;
