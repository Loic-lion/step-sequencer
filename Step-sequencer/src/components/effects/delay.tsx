import React, { useState, useEffect } from "react";
import * as Tone from "tone";

interface FeedbackDelayControlProps {
  synth: Tone.PolySynth | null;
}

const FeedbackDelayControl: React.FC<FeedbackDelayControlProps> = ({
  synth,
}) => {
  const [delay, setFeedbackDelay] = useState<Tone.FeedbackDelay | null>(null);
  const [delayOptions, setFeedbackDelayOptions] = useState({
    frequency: 1.5,
    delayTime: 0.5,
    wet: 0.3,
  });
  const [isFeedbackDelayActive, setIsFeedbackDelayActive] = useState(true);

  const handleFeedbackDelayChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setFeedbackDelayOptions((prevOptions) => ({
      ...prevOptions,
      [name]: parseFloat(value),
    }));
  };

  useEffect(() => {
    if (delay) {
      delay.set(delayOptions);
      delay.wet.value = delayOptions.wet;
    }
  }, [delay, delayOptions]);

  useEffect(() => {
    const newFeedbackDelay = new Tone.FeedbackDelay().toDestination();
    setFeedbackDelay(newFeedbackDelay);
    synth?.connect(newFeedbackDelay);

    return () => {
      newFeedbackDelay.dispose();
    };
  }, [synth]);

  useEffect(() => {
    if (delay && synth) {
      if (isFeedbackDelayActive) {
        synth.connect(delay);
      } else {
        synth.disconnect(delay);
      }
    }
  }, [synth, delay, isFeedbackDelayActive]);

  const toggleFeedbackDelay = () => {
    setIsFeedbackDelayActive(!isFeedbackDelayActive);
  };

  return (
    <div className="delay-control">
      <h2>Delay</h2>
      <div>
        <button onClick={toggleFeedbackDelay}>
          {isFeedbackDelayActive ? "ON" : "OFF"}
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
          value={delayOptions.wet}
          onChange={handleFeedbackDelayChange}
        />
      </div>
      <div>
        <label>Frequency</label>
        <input
          type="range"
          name="frequency"
          min="20"
          max="2000"
          step="1"
          value={delayOptions.frequency}
          onChange={handleFeedbackDelayChange}
        />
      </div>
      <div>
        <label>Delay Time</label>
        <input
          type="range"
          name="delayTime"
          min="0.01"
          max="1"
          step="0.01"
          value={delayOptions.delayTime}
          onChange={handleFeedbackDelayChange}
        />
      </div>
    </div>
  );
};

export default FeedbackDelayControl;
