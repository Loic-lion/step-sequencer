import { useEffect, useRef } from "react";
import * as Tone from "tone";

interface VisualFrequenciesProps {
  synth: Tone.PolySynth | null;
}

export default function VisualFrequencies({ synth }: VisualFrequenciesProps) {
  const canvasRefFrequencies = useRef<HTMLCanvasElement | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const minDecibels = -120;
  const maxDecibels = 0;

  useEffect(() => {
    const canvas = canvasRefFrequencies.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    const fftSize = 512;
    const fft = new Tone.FFT(fftSize);

    if (synth) {
      synth.connect(fft);
    }

    function draw() {
      if (!ctx) return;

      const dataArray = fft.getValue();
      if (!canvas) return;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();

      ctx.moveTo(0, height);

      for (let i = 0; i < dataArray.length; i++) {
        const frequency = i * (Tone.context.sampleRate / fftSize);
        const value = dataArray[i];
        const normalizedValue =
          (value - minDecibels) / (maxDecibels - minDecibels);
        const x = (frequency / (Tone.context.sampleRate / 2)) * width;
        const y = (1 - normalizedValue) * height;

        ctx.lineTo(x, y);
      }

      ctx.lineTo(width, height);
      ctx.closePath();

      ctx.fillStyle = "rgba(212, 135, 34, 0.4)";
      ctx.fill();

      animationIdRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      if (synth) {
        synth.disconnect(fft);
      }
      if (animationIdRef.current !== null) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [synth]);

  return (
    <canvas
      id="frequencies"
      ref={canvasRefFrequencies}
      width={415}
      height={130}
    >
      Visual frequencies not supported by your browser
    </canvas>
  );
}
