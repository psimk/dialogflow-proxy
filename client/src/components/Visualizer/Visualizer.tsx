import React from 'react';
import useCanvas, { TDrawer } from '../../hooks/useCanvas';
import theme from '../../constants/theme';

const CANVAS_HEIGHT = 200;
const CANVAS_WIDTH = 200;

const createDrawer = (analyser: AnalyserNode): TDrawer => {
  analyser.fftSize = 1024;

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  return (ctx, canvas) => {
    if (!ctx || !canvas) return;
    const context = ctx as CanvasRenderingContext2D;

    analyser.getByteFrequencyData(dataArray);

    context.fillStyle = theme.accentBackgroundColor;

    context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    context.lineWidth = 3;
    context.strokeStyle = '#FFFFFF';

    context.beginPath();

    const barWidth = CANVAS_WIDTH / bufferLength * 2.5;
    let barHeight;
    let x = 0;

    for (var i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];

      context.fillStyle = `rgba(255, 255, 255, ${barHeight / CANVAS_HEIGHT})`;
      context.fillRect(x, CANVAS_HEIGHT - barHeight / 2, barWidth, barHeight / 2);

      x += barWidth + 1;
    }

    context.lineTo(canvas.width, canvas.height / 2);

    context.stroke();

    context.closePath();
  };
};

interface IProps {
  analyser: AnalyserNode;
}

export default ({ analyser }: IProps) => {
  const canvasRef = useCanvas(createDrawer(analyser));

  if (canvasRef.current) canvasRef.current.setAttribute('viewBox', '0 0 255 255');

  return <canvas ref={canvasRef} height={CANVAS_HEIGHT} width={CANVAS_WIDTH} />;
};
