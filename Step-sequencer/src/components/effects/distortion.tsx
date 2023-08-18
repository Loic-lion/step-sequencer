import React, { useState, useEffect } from "react";
import * as Tone from "tone";


interface DistortionControlProps {
  synth: Tone.PolySynth | null;
}

const DistortionControl: React.FC<DistortionControlProps> = ({ synth }) => {
  const [distortion, setDistortion] = useState<Tone.Distortion | null>(null);
  const [distortionOptions, setDistortionOptions] = useState({
    distortion: 0.4,
    oversample: "2x" as OverSampleType, 
    wet: 0.3,
  });
  const [isDistortionActive, setIsDistortionActive] = useState(true);

  const handleDistortionChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    
    setDistortionOptions((prevOptions) => ({
      ...prevOptions,
      [name]: name === "oversample" ? (value as OverSampleType) : parseFloat(value),
    }));
  };

  useEffect(() => {
    if (distortion) {
      distortion.set(distortionOptions);
      distortion.wet.value = distortionOptions.wet;
    }
  }, [distortion, distortionOptions]);

  useEffect(() => {
    const newDistortion = new Tone.Distortion().toDestination();
    setDistortion(newDistortion);
    synth?.connect(newDistortion);

    return () => {
      newDistortion.dispose();
    };
  }, [synth]);

  useEffect(() => {
    if (distortion && synth) {
      if (isDistortionActive) {
        synth.connect(distortion);
      } else {
        synth.disconnect(distortion);
      }
    }
  }, [synth, distortion, isDistortionActive]);

  const toggleDistortion = () => {
    setIsDistortionActive(!isDistortionActive);
  };

  return (
    <div className="distortion-control">
      <h2>Distortion</h2>
      <div>
        <button onClick={toggleDistortion}>
          {isDistortionActive ? "ON" : "OFF"}
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
          value={distortionOptions.wet}
          onChange={handleDistortionChange}
        />
      </div>
      <div>
        <label>Dist. Amount</label>
        <input
          type="range"
          name="distortion"
          min="0"
          max="1"
          step="0.01"
          value={distortionOptions.distortion}
          onChange={handleDistortionChange}
        />
      </div>
      <div>
        <label>Oversample</label>
        <select
          name="oversample"
          value={distortionOptions.oversample}
          onChange={handleDistortionChange}
        >
          <option value="none">None</option>
          <option value="2x">2x</option>
          <option value="4x">4x</option>
        </select>
      </div>
    </div>
  );
};

export default DistortionControl;
