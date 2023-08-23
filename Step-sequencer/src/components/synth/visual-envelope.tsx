import { useRef, useEffect } from "react";

interface OptionsSynth {
  attack: number;
  decay: number;
  sustain: number;
  release: number;
}

interface CanvasGraphProps {
  envelope: OptionsSynth;
}

export default function VisualEnvelope({ envelope }: CanvasGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        const graphWidth = canvas.width;
        const graphHeight = canvas.height;

        const total = envelope.attack + envelope.decay + envelope.release;
        let current = 30;

        context.clearRect(0, 0, graphWidth, graphHeight);
        context.beginPath();

        context.moveTo(30, 120);
        context.lineTo(current + (envelope.attack / total) * 290, 20);
        current += (envelope.attack / total) * 290;

        context.lineTo(
          current + (envelope.decay / total) * 290,
          120 - envelope.sustain * 100
        );
        current += (envelope.decay / total) * 290;

        context.lineTo(current + 60, 120 - envelope.sustain * 100);
        current += 60;

        context.lineTo(current + (envelope.release / total) * 290, 120);
        current += (envelope.release / total) * 290;

        context.lineWidth = 4;
        context.strokeStyle = "rgb(212, 135, 34)";
        context.stroke();
      }
    }
  }, [envelope]);

  return (
    <canvas ref={canvasRef} id="envelope" width={415} height={130}>
      Visual envelope not supported by your browser
    </canvas>
  );
}
