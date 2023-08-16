import React from "react";
import * as Tone from "tone";

type SynthSequencerProps = {
  synth: Tone.PolySynth | null;
  numOfSteps: number;
};

export default function SynthSequencer({
  synth,
  numOfSteps,
}: SynthSequencerProps) {
  const stepIds = [...Array(numOfSteps).keys()] as const;

  const [currentStep, setCurrentStep] = React.useState<number>(0);

  const stepRefs = React.useRef<Array<Array<HTMLInputElement>>>([]);
  const notes = [
  "C0", "C#0", "D0", "D#0", "E0", "F0", "F#0", "G0", "G#0", "A0", "A#0", "B0",
  "C1", "C#1", "D1", "D#1", "E1", "F1", "F#1", "G1", "G#1", "A1", "A#1", "B1",
  "C2", "C#2", "D2", "D#2", "E2", "F2", "F#2", "G2", "G#2", "A2", "A#2", "B2",
  "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3",
  "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4",
  "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5",
  "C6", "C#6", "D6", "D#6", "E6", "F6", "F#6", "G6", "G#6", "A6", "A#6", "B6",
  "C7", "C#7", "D7", "D#7", "E7", "F7", "F#7", "G7", "G#7", "A7", "A#7", "B7",
  "C8", "C#8", "D8", "D#8", "E8", "F8", "F#8", "G8", "G#8", "A8", "A#8", "B8",
];


  const seqRef = React.useRef<Tone.Sequence | null>(null);

  React.useEffect(() => {
    if (!synth) return;

    seqRef.current = new Tone.Sequence(
      (time, step) => {
        setCurrentStep(step);

        notes.forEach((note, trackId) => {
          if (stepRefs.current[trackId][step]?.checked) {
            synth.triggerAttackRelease(note, "16n", time);
          }
        });
      },
      [...stepIds],
      "16n"
    ).start(0);

    return () => {
      seqRef.current?.dispose();
    };
  }, [synth, numOfSteps]);

  return (
    <div className="synth__sequencer">
      {notes.map((note, trackId) => (
        <div key={note} className="synth__sequencer__track">
          <span className="synth__sequencer__note">{note}</span>
          {stepIds.map((stepId) => (
            <label key={stepId} className="synth__sequencer__step">
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
                className={`synth__sequencer__step__content ${
                  currentStep === stepId ? "active" : ""
                }`}
              />
            </label>
          ))}
        </div>
      ))}
    </div>
  );
}
