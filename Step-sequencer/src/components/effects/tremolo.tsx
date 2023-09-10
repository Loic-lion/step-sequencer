import React, { useState, useEffect } from "react";
import * as Tone from "tone";

interface TremoloControlProps {
  synth: Tone.PolySynth | null;
}

const TremoloControl: React.FC<TremoloControlProps> = ({ synth }) => {
  const [tremolo, setTremolo] = useState<Tone.Tremolo | null>(null);
  const [tremoloOptions, setTremoloOptions] = useState({
    frequency: 5,
    type: "sine" as Tone.ToneOscillatorType,
    depth: 0.5,
    spread: 180,
    wet: 0.5,
  });
  const [isTremoloActive, setIsTremoloActive] = useState(true);

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
      tremolo.wet.value = tremoloOptions.wet;
    }
  }, [tremolo, tremoloOptions]);

  useEffect(() => {
    const newTremolo = new Tone.Tremolo().toDestination();
    setTremolo(newTremolo);
    synth?.connect(newTremolo);

    return () => {
      newTremolo.dispose();
    };
  }, [synth]);

  useEffect(() => {
    if (tremolo && synth) {
      if (isTremoloActive) {
        synth.connect(tremolo);
      } else {
        synth.disconnect(tremolo);
      }
    }
  }, [synth, tremolo, isTremoloActive]);

  const toggleTremolo = () => {
    setIsTremoloActive(!isTremoloActive);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setTremoloOptions((prevOptions) => ({
      ...prevOptions,
      type: value as Tone.ToneOscillatorType,
    }));
  };

  return (
    <div className="tremolo-control">
      <h2>Tremolo</h2>
      <div>
        <button onClick={toggleTremolo}>
          {isTremoloActive ? "ON" : "OFF"}
        </button>
      </div>
      <div>
        <label>Wetness</label>
        <input
          type="range"
          name="wet"
          min="0"
          max="1"
          step="0.01"
          value={tremoloOptions.wet}
          onChange={handleTremoloChange}
        />
      </div>
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

      <div>
        <label>Type</label>
        <select
          name="type"
          value={tremoloOptions.type}
          onChange={handleTypeChange}
        >
          <option value="sine">Sine</option>
          <option value="square">Square</option>
          <option value="triangle">Triangle</option>
          <option value="sawtooth">Sawtooth</option>
        </select>
      </div>
    </div>
  );
};

export default TremoloControl;
