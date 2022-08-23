import { p5InstanceExtensions } from "p5";

const scale = 30;
let xscale = 0,
  yscale = 0;

let placedPoint: Points[] = [];

interface Points {
  x: number;
  y: number;
  h: number;
  w: number;
  localized?: false;
  number?: number;
}
let points: Points[] = [];

let neighboors: Points[] = [];
let currentExpansion: Points[] = [];
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
      const show = Math.random() > 0.99;
      show && points.push({ x: i, y: j, h: scale, w: scale });

      const other = Math.random() > 0.9995;
      const needsPlacedPoints = !show && placedPoint.length < 5 && other;
      needsPlacedPoints && placedPoint.push({ x: i, y: j, h: scale, w: scale });
      // context.rect(i, j, scale, scale);
    }
  }

  // Starter point
  const starterPoint = { x: 0, y: 0, h: scale, w: scale, number: 1 };
  currentExpansion.push(starterPoint);
  neighboors.push(starterPoint);
};

const draw = (context: p5InstanceExtensions) => {
  context.background(0);

  neighboors.forEach(({ x, y, h, w, number }) => {
    context.stroke(0, 0, 150);
    context.fill(0, 0, 150);

    context.rect(x, y, w, h);
    context.fill(255);
    number && context.text(number, x + 4, y + 15);
  });

  placedPoint.forEach(({ x, y, h, w }) => {
    context.stroke(150, 0, 0);
    context.fill(150, 0, 0);

    context.rect(x, y, w, h);
  });

  const newExpansion: Points[] = [];
  const maxNumber = neighboors[neighboors.length - 1]?.number || 0;
  currentExpansion.forEach(({ x, y, h, w, number }) => {
    context.stroke(0, 150, 0);
    context.fill(0, 150, 0);

    context.rect(x, y, w, h);

    const xscaled = x + scale;
    const yscaled = y + scale;

    const itsXPushed = newExpansion.some((xpoints) => xpoints.x === xscaled);
    const itsYPushed = newExpansion.some((ypoints) => ypoints.y === yscaled);

    const existPointX = points.some(
      (point) => point.x === xscaled && point.y === y
    );
    const existPointY = points.some(
      (point) => point.y === yscaled && point.x === x
    );

    if (xscaled < context.windowWidth && !itsXPushed && !existPointX) {
      newExpansion.push({
        x: x + scale,
        y,
        h,
        w,
        number: maxNumber + 1,
      });
    }
    if (yscaled < context.windowHeight && !itsYPushed && !existPointY) {
      newExpansion.push({
        x,
        y: y + scale,
        h,
        w,
        number: maxNumber + 1,
      });
    }
  });

  context.stroke(255, 255, 255);
  context.fill(255, 255, 255);
  points.forEach(({ x, y, h, w }) => {
    context.rect(x, y, w, h);
  });

  const shouldStopReplacin = neighboors.length
    ? newExpansion.length !== 0
    : true;
  if (shouldStopReplacin) {
    // console.log(newExpansion);
    currentExpansion = newExpansion;
    neighboors = [...neighboors, ...newExpansion];
  }
};

const DijkstraSetup = {
  setup,
  draw,
};

export default DijkstraSetup;
