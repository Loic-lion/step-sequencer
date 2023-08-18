import { useState, useEffect } from "react";
import * as Tone from "tone";
import ReverbControl from "../effects/reverb";
import TremoloControl from "../effects/tremolo";
import ChorusControl from "../effects/chorus";
import SynthOptions from "./option-synth";
import DistortionControl from "../effects/distortion";
import FeedbackDelayControl from "../effects/delay";
import PhaserControl from "../effects/phaser";
import Piano from "./piano";
import SynthSequencer from "./sequencer";

export default function Synthetizer() {
  const [synth, setSynth] = useState<Tone.PolySynth | null>(null);
  const [activeNotes, setActiveNotes] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [divSizes, setDivSizes] = useState({
    synthEffectHeight: "200px",
    pianoHeight: "100px",
  });

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

  const toggleDivSizes = () => {
    setDivSizes((prevSizes) => ({
      synthEffectHeight:
        prevSizes.synthEffectHeight === "200px" ? "0px" : "200px",
      pianoHeight: prevSizes.pianoHeight === "100px" ? "0px" : "100px",
    }));
  };

  return (
    <section className="synth">
      <div className="synth__head">
        <h1>PolySynth</h1>
        <SynthOptions synth={synth} />
        <button className="synth__head__show__effects" onClick={toggleDivSizes}>
          Afficher/Cacher Sequencer
        </button>
      </div>

      <hr />
      <div
        className="synth__effect"
        style={{ height: divSizes.synthEffectHeight }}
      >
        <ReverbControl synth={synth} />
        <TremoloControl synth={synth} />
        <ChorusControl synth={synth} />
        <DistortionControl synth={synth} />
        <FeedbackDelayControl synth={synth} />
        <PhaserControl synth={synth} />
      </div>
      <div className="synth__piano" style={{ height: divSizes.pianoHeight }}>
        <Piano synth={synth} />
      </div>
      <div className="synth__sequencer">
        <SynthSequencer synth={synth} />
      </div>
    </section>
  );
}
