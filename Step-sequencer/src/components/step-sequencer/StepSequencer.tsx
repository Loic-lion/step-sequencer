import { useState, useEffect, useRef } from "react";
import * as Tone from "tone";
import SampleButton from "./SampleButton";
import AudioFileUploader from "./AudioFileUploader";
import Synthetizer from "../synth/synth";
import useOptionStore from "../Store/option-store";
import PatternControls from "./Pattern-controls";

const NOTE = "C4";

type Props = {
  numOfSteps: number;
};

type Sample = {
  url: string;
  name: string;
};

type Track = {
  id: number;
  sampler: Tone.Sampler;
};

export default function StepSequencer({ numOfSteps }: Props) {
  const { activeSequencer } = useOptionStore() as { activeSequencer: boolean };

  const sequencerClass = activeSequencer ? "active__sequencer" : "";

  const initialSamples: Sample[] = [
    {
      url: "/Hit.wav",
      name: "Hit",
    },
    {
      url: "/Kick.wav",
      name: "Kick",
    },
    {
      url: "/Snare.wav",
      name: "Snare",
    },
    {
      url: "/Rim-click.wav",
      name: "Rim click",
    },
  ];

  const [samples, setSamples] = useState<Sample[]>(initialSamples);
  const trackIds = [...Array(samples.length).keys()] as const;
  const stepIds = [...Array(numOfSteps).keys()] as const;
  const [currentStep, setCurrentStep] = useState<number>(0);
  const tracksRef = useRef<Track[]>([]);
  const stepRef = useRef<HTMLInputElement[][]>([[]]);
  const seqRef = useRef<Tone.Sequence | null>(null);
  const [patterns, setPatterns] = useState<Array<boolean[][]>>([
    Array(numOfSteps)
      .fill(false)
      .map(() => Array(samples.length).fill(false)),
  ]);
  const [currentPatternIndex, setCurrentPatternIndex] = useState<number>(0);

  useEffect(() => {
    tracksRef.current = samples.map((sample, i) => ({
      id: i,
      sampler: new Tone.Sampler({
        urls: {
          [NOTE]: sample.url,
        },
      }).toDestination(),
    }));
    seqRef.current = new Tone.Sequence(
      (time, step) => {
        setCurrentStep(step);
        tracksRef.current.forEach((trk) => {
          if (stepRef.current[trk.id]?.[step]?.checked) {
            trk.sampler.triggerAttack(NOTE, time);
          }
        });
      },
      [...stepIds],
      "16n"
    ).start(0);
    return () => {
      seqRef.current?.dispose();
      tracksRef.current.forEach((trk) => trk.sampler.dispose());
    };
  }, [samples, numOfSteps, currentPatternIndex]);

  const handleFileUpload = (file: File) => {
    const name = prompt("Please enter the name for the sample:");
    if (!name) return;
    const newSample = {
      url: URL.createObjectURL(file),
      name: name,
    };
    setSamples((prevSamples) => [...prevSamples, newSample]);
  };

  const handleCreatePattern = () => {
    const newPattern = Array(numOfSteps)
      .fill(false)
      .map(() => Array(samples.length).fill(false));
    setPatterns([...patterns, newPattern]);
  };

  const handleSelectPattern = (index: number) => {
    setCurrentPatternIndex(index);
  };

  const handleDeletePattern = (index: number) => {
    const updatedPatterns = [...patterns];
    updatedPatterns.splice(index, 1);
    setPatterns(updatedPatterns);
    if (index === currentPatternIndex) {
      setCurrentPatternIndex(0);
    }
  };

  return (
    <>
      <section className={`container ${sequencerClass}`}>
        <div className="container__player">
          <AudioFileUploader onFileUpload={handleFileUpload} />
        </div>
        <div className="container__flex">
          <div className="container__flex__list">
            {trackIds.map((trackId) => (
              <div key={trackId} className="container__flex__list__row">
                <SampleButton
                  sampleName={samples[trackId]?.name || "No sample"}
                />
                {stepIds.map((stepId) => {
                  const id = trackId + "-" + stepId;
                  const groupIndex = Math.floor(stepId / 4);
                  const bgColorClass =
                    groupIndex % 2 === 0 ? "gray-bg" : "red-bg";
                  const isActive = currentStep === stepId;

                  return (
                    <label
                      key={id}
                      className={`container__flex__list__row__cell ${
                        isActive ? "active" : ""
                      }`}
                    >
                      <input
                        id={id}
                        type="checkbox"
                        className="container__flex__list__row__cell__input"
                        ref={(elm) => {
                          if (!elm) return;
                          if (!stepRef.current[trackId]) {
                            stepRef.current[trackId] = [];
                          }
                          stepRef.current[trackId][stepId] = elm;
                        }}
                        checked={patterns[currentPatternIndex][stepId][trackId]}
                        onChange={(e) => {
                          const updatedPatterns = [...patterns];
                          updatedPatterns[currentPatternIndex][stepId][
                            trackId
                          ] = e.target.checked;
                          setPatterns(updatedPatterns);
                        }}
                      />
                      <div
                        className={`container__flex__list__row__cell__content ${bgColorClass} ${
                          isActive ? "active" : ""
                        }`}
                      />
                    </label>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <PatternControls
          patterns={patterns}
          onCreatePattern={handleCreatePattern}
          onSelectPattern={handleSelectPattern}
          onDeletePattern={handleDeletePattern}
        />
      </section>

      <div className="App">
        <Synthetizer />
      </div>
    </>
  );
}
