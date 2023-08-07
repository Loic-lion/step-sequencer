import React, { useState, useEffect } from "react";
import * as Tone from "tone";
import ReverbControl from "./reverb";
import TremoloControl from "./tremolo";

const Synthetizer: React.FC = () => {
  const [synth, setSynth] = useState<Tone.PolySynth | null>(null);
  const [activeNotes, setActiveNotes] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    const newSynth = new Tone.PolySynth().toDestination();
    setSynth(newSynth);

    return () => {
      newSynth.dispose();
    };
  }, []);

  const keyNoteMap: { [key: string]: string } = {
    q: "C4",
    z: "C#4",
    s: "D4",
    e: "D#4",
    d: "E4",
    f: "F4",
    t: "F#4",
    g: "G4",
    y: "G#4",
    h: "A4",
    u: "A#4",
    j: "B4",
    k: "C5",
    o: "C#5",
    l: "D5",
    p: "D#5",
    m: "E5",
    ù: "F5",
    "²": "F#5",
    Enter: "G5",
    "3": "G#5",
    è: "A5",
    a: "A#5",
    w: "B5",
    x: "C6",
    é: "C#6",
    c: "D6",
    v: "D#6",
    b: "E6",
    n: "F6",
    ",": "F#6",
    ";": "G6",
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const key = event.key;
    if (keyNoteMap.hasOwnProperty(key)) {
      const note = keyNoteMap[key];
      if (!activeNotes[note]) {
        setActiveNotes((prevActiveNotes) => ({
          ...prevActiveNotes,
          [note]: true,
        }));
        synth?.triggerAttack(note);
      }
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    const key = event.key;
    if (keyNoteMap.hasOwnProperty(key)) {
      const note = keyNoteMap[key];
      if (activeNotes[note]) {
        setActiveNotes((prevActiveNotes) => ({
          ...prevActiveNotes,
          [note]: false,
        }));
        synth?.triggerRelease(note);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [synth, activeNotes]);

  return (
    <section className="synth">
      <div className="synth__head">
        <h1>Synth</h1>
      </div>
      <div className="synth__effect">
        <ReverbControl synth={synth} />
        <TremoloControl synth={synth} />
        <TremoloControl synth={synth} />
        <TremoloControl synth={synth} />
      </div>
      <div>clavier</div>
    </section>
  );
};

export default Synthetizer;
