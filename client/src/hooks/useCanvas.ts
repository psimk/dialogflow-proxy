import { useRef, useEffect } from 'react';

enum CONTEXT_TYPE {
  TwoDimensional = '2d',
  ThreeDimensional = '3d',
  WebGL = 'webgl2',
}

export type TDrawer = (
  context: CanvasRenderingContext2D | WebGLRenderingContext | null,
  canvas: HTMLCanvasElement | null,
) => void;

export default (draw: TDrawer, contextType: CONTEXT_TYPE = CONTEXT_TYPE.TwoDimensional) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const context = canvasRef.current!.getContext(contextType);

    let animationFrameId = 0;

    const renderFrame = () => {
      draw(context, canvasRef.current);
      animationFrameId = requestAnimationFrame(renderFrame);
    };

    renderFrame();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return canvasRef;
};
