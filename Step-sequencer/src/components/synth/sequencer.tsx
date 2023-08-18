import React from "react";
import * as Tone from "tone";

type SynthSequencerProps = {
  synth: Tone.PolySynth | null;
};

export default function SynthSequencer({ synth }: SynthSequencerProps) {
  const numOfSteps = 32;

  const stepIds = [...Array(numOfSteps).keys()] as const;

  const [currentStep, setCurrentStep] = React.useState<number>(0);
  const [selectedOctaves, setSelectedOctaves] = React.useState<number[]>([4]);

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

  const seqRef = React.useRef<Tone.Sequence | null>(null);

  const handleOctaveToggle = (octave: number) => {
    if (selectedOctaves.includes(octave)) {
      setSelectedOctaves(selectedOctaves.filter((o) => o !== octave));
    } else {
      setSelectedOctaves([...selectedOctaves, octave]);
    }
  };

  React.useEffect(() => {
    if (!synth) return;

    seqRef.current = new Tone.Sequence(
      (time, step) => {
        setCurrentStep(step);

        octaveNotes.forEach((note, trackId) => {
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
  }, [synth, selectedOctaves]);

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
                    currentStep === stepId ? "active" : ""
                  }`}
                />
              </label>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
