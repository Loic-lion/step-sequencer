import React from "react";
import * as Tone from "tone";
import "./app.css";
import Synthetizer from "./components/synth/synth";

type Props = {
  samples: { url: string; name: string }[];
  numOfSteps: number;
};
export default function App({ samples, numOfSteps }: Props) {
  const trackIds = [...Array(samples.length).keys()] as const;
  const stepIds = [...Array(numOfSteps).keys()] as const;
  const [isPlaying, setIsPlaying] = React.useState(false);

  return (
    <>
      <section className="container">
        <div className="container__player">
          <button className="container__player__onoff">
            {isPlaying ? "■" : "▶"}
          </button>
        </div>
        <div className="container__flex">
          <div className="container__flex__list">
            {trackIds.map((trackId) => (
              <div key={trackId} className="container__flex__list__row">
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
                      />
                      <div
                        className={`container__flex__list__row__cell__content ${bgColorClass}`}
                      />
                    </label>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="App">
        <Synthetizer />
      </div>
    </>
  );
}
