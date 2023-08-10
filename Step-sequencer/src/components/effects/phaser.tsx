import React, { useState, useEffect } from "react";
import * as Tone from "tone";

interface PhaserControlProps {
  synth: Tone.PolySynth | null;
}

const PhaserControl: React.FC<PhaserControlProps> = ({ synth }) => {
  const [phaser, setPhaser] = useState<Tone.Phaser | null>(null);
  const [phaserOptions, setPhaserOptions] = useState({
    frequency: 0.5,
    octaves: 3,
    stages: 10,
    Q: 10,
    baseFrequency: 500,
    wet: 0.3,
  });
  const [isPhaserActive, setIsPhaserActive] = useState(true);

  const handlePhaserChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setPhaserOptions((prevOptions) => ({
      ...prevOptions,
      [name]: name === "oversample" ? value : parseFloat(value),
    }));
  };

  useEffect(() => {
    if (phaser) {
      phaser.set(phaserOptions);
      phaser.wet.value = phaserOptions.wet;
    }
  }, [phaser, phaserOptions]);

  useEffect(() => {
    const newPhaser = new Tone.Phaser().toDestination();
    setPhaser(newPhaser);
    synth?.connect(newPhaser);

    return () => {
      newPhaser.dispose();
    };
  }, [synth]);

  useEffect(() => {
    if (phaser && synth) {
      if (isPhaserActive) {
        synth.connect(phaser);
      } else {
        synth.disconnect(phaser);
      }
    }
  }, [synth, phaser, isPhaserActive]);

  const togglePhaser = () => {
    setIsPhaserActive(!isPhaserActive);
  };

  return (
    <div className="phaser-control">
      <h2>Phaser</h2>
      <div>
        <button onClick={togglePhaser}>{isPhaserActive ? "ON" : "OFF"}</button>
      </div>
      <div>
        <label>Wetness</label>
        <input
          type="range"
          name="wet"
          min="0"
          max="1"
          step="0.01"
          value={phaserOptions.wet}
          onChange={handlePhaserChange}
        />
      </div>
      <div>
        <label>Frequency</label>
        <input
          type="range"
          name="frequency"
          min="0"
          max="100"
          step="0.01"
          value={phaserOptions.frequency}
          onChange={handlePhaserChange}
        />
      </div>
      <div>
        <label>Octaves</label>
        <input
          type="range"
          name="octaves"
          min="0"
          max="10"
          step="1"
          value={phaserOptions.octaves}
          onChange={handlePhaserChange}
        />
      </div>
      <div>
        <label>Stages</label>
        <input
          type="range"
          name="stages"
          min="1"
          max="12"
          step="1"
          value={phaserOptions.stages}
          onChange={handlePhaserChange}
        />
      </div>
      <div>
        <label>Q</label>
        <input
          type="range"
          name="Q"
          min="0"
          max="20"
          step="0.01"
          value={phaserOptions.Q}
          onChange={handlePhaserChange}
        />
      </div>
      <div>
        <label>Base Freq.</label>
        <input
          type="range"
          name="baseFrequency"
          min="100"
          max="1000"
          step="1"
          value={phaserOptions.baseFrequency}
          onChange={handlePhaserChange}
        />
      </div>
    </div>
  );
};

export default PhaserControl;
