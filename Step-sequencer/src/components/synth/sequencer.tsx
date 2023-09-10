import React from "react";
import * as Tone from "tone";

type SynthSequencerProps = {
  synth: Tone.PolySynth | null;
};

export default function SynthSequencer({ synth }: SynthSequencerProps) {
  const numOfSteps = 32;

  const stepIds = [...Array(numOfSteps).keys()] as const;

  const [selectedOctaves, setSelectedOctaves] = React.useState<number[]>([4]);
  const [activeSteps, setActiveSteps] = React.useState<number[]>([]);
  

  const stepRefs = React.useRef<Array<Array<HTMLInputElement>>>([]);
  const notes = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];

  const octaveNotes = selectedOctaves.flatMap((octave) =>
    notes.map((note) => `${note}${octave}`)
  );
  const [noteDurations, setNoteDurations] = React.useState<number[][]>(
    Array.from({ length: octaveNotes.length }, () =>
      Array.from({ length: numOfSteps }, () => 16)
    )
  );

  const seqRef = React.useRef<Tone.Sequence | null>(null);

  const handleOctaveToggle = (octave: number) => {
    if (selectedOctaves.includes(octave)) {
      setSelectedOctaves(selectedOctaves.filter((o) => o !== octave));
    } else {
      setSelectedOctaves([...selectedOctaves, octave]);
    }
    setNoteDurations((prevDurations) =>
      prevDurations.map((durations) => [
        ...durations,
        ...Array(numOfSteps - durations.length).fill(16),
      ])
    );
  };

  React.useEffect(() => {
    if (!synth) return;

    seqRef.current = new Tone.Sequence(
      (time, step) => {
        setActiveSteps([step]);

        octaveNotes.forEach((note, trackId) => {
          if (stepRefs.current[trackId][step]?.checked) {
            synth.triggerAttackRelease(
              note,
              `${noteDurations[trackId][step]}n`,
              time
            );
          }
        });
      },
      [...stepIds],
      "16n"
    ).start(0);

    return () => {
      seqRef.current?.dispose();
    };
  }, [synth, selectedOctaves, noteDurations]);

  return (
    <>
      <div className="synth__sequencer__selector">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((octave) => (
          <button
            key={octave}
            onClick={() => handleOctaveToggle(octave)}
            className={selectedOctaves.includes(octave) ? "selected" : ""}
          >
            {octave}
          </button>
        ))}
      </div>
      <div className="synth__sequencer__container">
        {octaveNotes.map((note, trackId) => (
          <div key={note} className="synth__sequencer__container__track">
            <span className="synth__sequencer__container__track__note">
              {note}
            </span>
            {stepIds.map((stepId) => (
              <label
                key={stepId}
                className="synth__sequencer__container__track__step"
              >
                <input
                  type="checkbox"
                  ref={(elm) => {
                    if (!elm) return;
                    if (!stepRefs.current[trackId]) {
                      stepRefs.current[trackId] = [];
                    }
                    stepRefs.current[trackId][stepId] = elm;
                  }}
                />
                <div
                  className={`synth__sequencer__container__track__step__content ${
                    activeSteps.includes(stepId) ? "active" : ""
                  }`}
                />
                <select
                  value={noteDurations[trackId][stepId]}
                  onChange={(e) => {
                    const updatedDurations = [...noteDurations];
                    updatedDurations[trackId][stepId] = parseInt(
                      e.target.value,
                      10
                    );
                    setNoteDurations(updatedDurations);
                  }}
                >
                  <option value={16}>16n</option>
                  <option value={8}>8n</option>
                  <option value={4}>4n</option>
                  <option value={2}>2n</option>
                </select>
                
              </label>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
