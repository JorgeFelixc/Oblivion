import { p5InstanceExtensions } from "p5";

const scale = 10;
let xscale = 0,
  yscale = 0;

let placedPoint: Points[] = [];

interface Points {
  x: number;
  y: number;
  h: number;
  w: number;
  localized?: false;
}
let points: Points[] = [];

// let j;

const setup = (
  context: p5InstanceExtensions,
  canvasRef: React.RefObject<HTMLDivElement>
) => {
  if (!canvasRef.current) return;
  canvasRef.current.innerHTML = "";

  const { windowWidth, windowHeight } = context;
  context.createCanvas(windowWidth, windowHeight).parent(canvasRef.current);

  xscale = windowWidth / scale;
  yscale = windowHeight / scale;

  context.background(0);
  for (let i = 0; i < context.windowWidth - scale; i += scale) {
    for (let j = 0; j < context.windowHeight - scale; j += scale) {
      if (i < scale * 3 && j < scale * 3) continue;
      const show = Math.random() > 0.95;
      show && points.push({ x: i, y: j, h: scale, w: scale });

      const other = Math.random() > 0.9995;
      const needsPlacedPoints = !show && placedPoint.length < 5 && other;
      needsPlacedPoints && placedPoint.push({ x: i, y: j, h: scale, w: scale });
      // context.rect(i, j, scale, scale);
    }
  }
};

const draw = (context: p5InstanceExtensions) => {
  context.background(0);
  context.stroke(255, 255, 255);
  context.fill(255, 255, 255);
  points.forEach(({ x, y, h, w }) => {
    context.rect(x, y, w, h);
  });

  placedPoint.forEach(({ x, y, h, w }) => {
    context.stroke(150, 0, 0);
    context.fill(150, 0, 0);

    context.rect(x, y, w, h);
  });
};

const DijkstraSetup = {
  setup,
  draw,
};

export default DijkstraSetup;
