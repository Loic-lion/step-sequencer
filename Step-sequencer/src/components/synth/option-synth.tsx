import React, { useState } from "react";
import * as Tone from "tone";

interface SynthOptionsProps {
  synth: Tone.PolySynth | null;
}

const SynthOptions: React.FC<SynthOptionsProps> = ({ synth }) => {
  const [synthOptions, setSynthOptions] = useState({
    detune: 0,
    volume: 0,
    portamento: 0,
    oscillator: {
      type: "sine" as Tone.ToneOscillatorType,
    },
    envelope: {
      attack: 0.1,
      decay: 0.2,
      sustain: 0.5,
      release: 1,
    },
  });

  const handleSynthOptionChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    if (name.includes(".")) {
      const [parentKey, childKey] = name.split(".");
      setSynthOptions((prevOptions) => ({
        ...prevOptions,
        [parentKey]: {
          ...prevOptions[parentKey],
          [childKey]: parseFloat(value) || value,
        },
      }));
    } else {
      setSynthOptions((prevOptions) => ({
        ...prevOptions,
        [name]: parseFloat(value) || value,
      }));
    }

    if (synth) {
      synth.set(synthOptions);
    }
  };

  return (
    <div className="synth__head__options">
      <div>
        <label>Detune</label>
        <input
          type="range"
          name="detune"
          min="-100"
          max="100"
          value={synthOptions.detune}
          onChange={handleSynthOptionChange}
        />
      </div>
      <div>
        <label>Volume</label>
        <input
          type="range"
          name="volume"
          min="-50"
          max="0"
          value={synthOptions.volume}
          onChange={handleSynthOptionChange}
        />
      </div>
      <div>
        <label>Portamento</label>
        <input
          type="range"
          name="portamento"
          min="0"
          max="1"
          step="0.01"
          value={synthOptions.portamento}
          onChange={handleSynthOptionChange}
        />
      </div>
      <div>
        <label>Oscillator Type</label>
        <select
          name="oscillator.type"
          value={synthOptions.oscillator.type}
          onChange={handleSynthOptionChange}
        >
          <option value="sine">Sine</option>
          <option value="square">Square</option>
          <option value="triangle">Triangle</option>
          <option value="sawtooth">Sawtooth</option>
        </select>
      </div>
      <div>
        <label>Envelope Attack</label>
        <input
          type="range"
          name="envelope.attack"
          min="0"
          max="1"
          step="0.01"
          value={synthOptions.envelope.attack}
          onChange={handleSynthOptionChange}
        />
      </div>
      <div>
        <label>Envelope Decay</label>
        <input
          type="range"
          name="envelope.decay"
          min="0"
          max="1"
          step="0.01"
          value={synthOptions.envelope.decay}
          onChange={handleSynthOptionChange}
        />
      </div>
      <div>
        <label>Envelope Sustain</label>
        <input
          type="range"
          name="envelope.sustain"
          min="0"
          max="1"
          step="0.01"
          value={synthOptions.envelope.sustain}
          onChange={handleSynthOptionChange}
        />
      </div>
      <div>
        <label>Envelope Release</label>
        <input
          type="range"
          name="envelope.release"
          min="0"
          max="1"
          step="0.01"
          value={synthOptions.envelope.release}
          onChange={handleSynthOptionChange}
        />
      </div>
    </div>
  );
};

export default SynthOptions;