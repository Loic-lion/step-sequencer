import React, { useState, useEffect } from "react";
import * as Tone from "tone";
import PatternControlsSynth from "./pattern-control-synth";

type SynthSequencerProps = {
  synth: Tone.PolySynth | null;
};

export default function SynthSequencer({ synth }: SynthSequencerProps) {
  const numOfSteps = 32;

  const stepIds = [...Array(numOfSteps).keys()] as const;

  const [activeSteps, setActiveSteps] = React.useState<number[]>([]);
  const stepRefs = React.useRef<Array<Array<HTMLInputElement>>>([]);
  const notes = [
    "C4",
    "C#4",
    "D4",
    "D#4",
    "E4",
    "F4",
    "F#4",
    "G4",
    "G#4",
    "A4",
    "A#4",
    "B4",
  ];

  const [noteDurations, setNoteDurations] = React.useState<number[][]>(
    Array.from({ length: notes.length }, () =>
      Array.from({ length: numOfSteps }, () => 16)
    )
  );

  const seqRef = React.useRef<Tone.Sequence | null>(null);

  const [patterns, setPatterns] = useState<boolean[][][]>([
    Array(notes.length)
      .fill(false)
      .map(() => Array(numOfSteps).fill(false)),
  ]);

  const [currentPatternIndex, setCurrentPatternIndex] = useState<number>(0);

  useEffect(() => {
    if (!synth) return;

    seqRef.current = new Tone.Sequence(
      (time, step) => {
        setActiveSteps([step]);

        notes.forEach((note, trackId) => {
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
  }, [synth, noteDurations]);

  const onDeletePattern = (index: number) => {
    if (patterns.length === 1) return; 
    const updatedPatterns = [...patterns];
    updatedPatterns.splice(index, 1);
    setPatterns(updatedPatterns);
    if (index === currentPatternIndex) {
      setCurrentPatternIndex((prevIndex) =>
        prevIndex >= updatedPatterns.length ? 0 : prevIndex
      );
    }
  };

  return (
    <>
      <PatternControlsSynth
        patterns={patterns}
        currentPatternIndex={currentPatternIndex}
        onCreatePattern={() => {
          const newPattern = Array(notes.length)
            .fill(false)
            .map(() => Array(numOfSteps).fill(false));
          setPatterns([...patterns, newPattern]);
          setCurrentPatternIndex(patterns.length);
        }}
        onSelectPattern={(index) => setCurrentPatternIndex(index)}
        onDeletePattern={onDeletePattern}
      />
      <div className="synth__sequencer__container">
        {notes.map((note, trackId) => (
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
                  checked={!!patterns[currentPatternIndex]?.[trackId]?.[stepId]}
                  onChange={(e) => {
                    const updatedPatterns = [...patterns];
                    updatedPatterns[currentPatternIndex][trackId][stepId] =
                      e.target.checked;
                    setPatterns(updatedPatterns);
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
