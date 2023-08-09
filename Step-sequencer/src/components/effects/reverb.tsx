import React, { useState, useEffect } from "react";
import * as Tone from "tone";

interface ReverbControlProps {
  synth: Tone.PolySynth | null;
}

const ReverbControl: React.FC<ReverbControlProps> = ({ synth }) => {
  const [reverb, setReverb] = useState<Tone.Reverb | null>(null);
  const [reverbOptions, setReverbOptions] = useState({
    wet: 0.5,
    decay: 3,
    preDelay: 0.01,
    roomSize: 0.7,
    dampening: 3000,
  });
  const [isReverbActive, setIsReverbActive] = useState(true); // Initial state set to true

  const handleReverbChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setReverbOptions((prevOptions) => ({
      ...prevOptions,
      [name]: parseFloat(value),
    }));
  };

  useEffect(() => {
    if (reverb) {
      reverb.set(reverbOptions);
      if (isReverbActive) {
        reverb.wet.value = reverbOptions.wet; // Set wetness explicitly
      } else {
        reverb.wet.value = 0; // Disable reverb by setting wetness to 0
      }
    }
  }, [reverb, reverbOptions, isReverbActive]);

  const initializeReverb = () => {
    const newReverb = new Tone.Reverb().toDestination();
    setReverb(newReverb);
    synth?.connect(newReverb);
  };

  if (synth && !reverb) {
    initializeReverb();
  }

  const toggleReverb = () => {
    setIsReverbActive(!isReverbActive);
  };

  return (
    <div className="reverb-control">
      <h2>Reverb</h2>
      <div>
        <button onClick={toggleReverb}>{isReverbActive ? "ON" : "OFF"}</button>
      </div>
      <div>
        <label>Wetness</label>
        <input
          type="range"
          name="wet"
          min="0"
          max="1"
          step="0.01"
          value={reverbOptions.wet}
          onChange={handleReverbChange}
        />
      </div>
      <div>
        <label>Decay Time</label>
        <input
          type="range"
          name="decay"
          min="0.1"
          max="10"
          step="0.1"
          value={reverbOptions.decay}
          onChange={handleReverbChange}
        />
      </div>
      <div>
        <label>Pre-delay</label>
        <input
          type="range"
          name="preDelay"
          min="0.001"
          max="0.1"
          step="0.001"
          value={reverbOptions.preDelay}
          onChange={handleReverbChange}
        />
      </div>
      <div>
        <label>Room Size</label>
        <input
          type="range"
          name="roomSize"
          min="0"
          max="1"
          step="0.01"
          value={reverbOptions.roomSize}
          onChange={handleReverbChange}
        />
      </div>
      <div>
        <label>Dampening</label>
        <input
          type="range"
          name="dampening"
          min="0"
          max="10000"
          step="10"
          value={reverbOptions.dampening}
          onChange={handleReverbChange}
        />
      </div>
    </div>
  );
};

export default ReverbControl;
