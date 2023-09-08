import { useEffect, useRef } from "react";
import * as Tone from "tone";

interface VisualFrequenciesProps {
  synth: Tone.PolySynth | null;
}

export default function VisualFrequencies({ synth }: VisualFrequenciesProps) {
  const canvasRefWaveform = useRef<HTMLCanvasElement | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas :any = canvasRefWaveform.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx || !synth) return;

    const audioContext = Tone.context;
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    synth.connect(analyser);

    function draw() {
      if (!ctx) return;

      const bufferLength = analyser.fftSize;
      const dataArray = new Uint8Array(bufferLength);

      analyser.getByteTimeDomainData(dataArray);

      const width = canvas.width;
      const height = canvas.height;
      const sliceWidth = (width * 1.0) / bufferLength;
      let x = 0;

      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(212, 135, 34, 0.8)";
      ctx.beginPath();

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      animationIdRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      synth.disconnect(analyser);
      if (animationIdRef.current !== null) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [synth]);

  return (
    <canvas id="wavefrom" ref={canvasRefWaveform} width={415} height={130}>
      Waveform not supported by your browser
    </canvas>
  );
}
