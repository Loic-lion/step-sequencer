import React from "react";
import * as Tone from "tone";

import ButtonPlayStop from "./ButtonPlayStop";
import { StepIndicator } from "./StepIndicator";
import SampleButton from "./SampleButton";
import AudioFileUploader from "./AudioFileUploader";

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

export default function App({ numOfSteps }: Props) {
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

  const [samples, setSamples] = React.useState<Sample[]>(initialSamples);
  const trackIds = [...Array(samples.length).keys()] as const;
  const stepIds = [...Array(numOfSteps).keys()] as const;

  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState<number>(0);

  const tracksRef = React.useRef<Track[]>([]);
  const stepRef = React.useRef<HTMLInputElement[][]>([[]]);
  const seqRef = React.useRef<Tone.Sequence | null>(null);

  React.useEffect(() => {
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
  }, [samples, numOfSteps]);

  const handleFileUpload = (file: File) => {
    const name = prompt("Please enter the name for the sample:");
    if (!name) return;
    const newSample = {
      url: URL.createObjectURL(file),
      name: name,
    };
    setSamples((prevSamples) => [...prevSamples, newSample]);
  };

  return (
    <>
      <section className="container">
        <div className="container__player">
          <ButtonPlayStop setIsPlaying={setIsPlaying} />
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
                  return (
                    <label
                      key={id}
                      className="container__flex__list__row__cell"
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
                      />
                      <div
                        className={`container__flex__list__row__cell__content ${bgColorClass}`}
                      />
                    </label>
                  );
                })}
              </div>
            ))}
            <StepIndicator currentStep={currentStep} numOfSteps={numOfSteps} />
          </div>
        </div>
      </section>
    </>
  );
}
