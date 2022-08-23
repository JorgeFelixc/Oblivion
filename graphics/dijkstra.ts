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

  context.frameRate(45);
  context.background(0);
  for (let i = 0; i < context.windowWidth - scale; i += scale) {
    for (let j = 0; j < context.windowHeight - scale; j += scale) {
      if (i < scale * 3 && j < scale * 3) continue;
      const show = Math.random() > 0.9;
      show && points.push({ x: i, y: j, h: scale, w: scale });

      const other = Math.random() > 0.995;
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
    number && context.text(number, x + 7, y + 18);
  });

  placedPoint.forEach(({ x, y, h, w }) => {
    context.stroke(150, 0, 0);
    context.fill(150, 0, 0);

    context.rect(x, y, w, h);
  });

  const newExpansion: Points[] = [];
  const maxNumber = neighboors[neighboors.length - 1]?.number || 0;
  currentExpansion.forEach((point) => {
    const { x, y, h, w } = point;
    context.stroke(0, 150, 0);
    context.fill(0, 150, 0);

    context.rect(x, y, w, h);

    const xscaled = x + scale;
    const yscaled = y + scale;

    const xnegative = x - scale;
    const ynegative = y - scale;

    const itsXPushed = newExpansion.some((p) => p.x === xscaled && p.y === y);
    const itsXNegPushed = newExpansion.some(
      (p) => p.x === xnegative && p.y === y
    );

    const itsYPushed = newExpansion.some((p) => p.y === yscaled && p.x === x);
    const itsYNegPushed = newExpansion.some(
      (p) => p.y === ynegative && p.x === x
    );

    // X POSITIVE
    const existPointX = points.some((p) => p.x === xscaled && p.y === y);
    const isXPosPlaced = neighboors.some((n) => n.x === xscaled && n.y === y);
    const isXPositive = !itsXPushed && !existPointX && !isXPosPlaced;
    if (xscaled < context.windowWidth && isXPositive) {
      newExpansion.push({
        ...point,
        x: x + scale,
        number: maxNumber + 1,
      });
    }

    // Y POSITIVE
    const existPointY = points.some((p) => p.y === yscaled && p.x === x);
    const isYPosPlaced = neighboors.some((n) => n.y === yscaled && n.x === x);
    const isYPositive = !itsYPushed && !existPointY && !isYPosPlaced;
    if (yscaled < context.windowHeight && isYPositive) {
      newExpansion.push({
        ...point,
        y: y + scale,
        number: maxNumber + 1,
      });
    }

    // X NEGATIVE
    const existPointXQ = points.some((p) => p.x === xnegative && p.y === y);
    const isXNegPlaced = neighboors.some((n) => n.x === xnegative && n.y === y);
    const isXNegative = !isXNegPlaced && !existPointXQ && !itsXNegPushed;
    if (xnegative > -1 && isXNegative) {
      newExpansion.push({
        ...point,
        x: x - scale,
        number: maxNumber + 1,
      });
    }

    // Y NEGATIVE
    const existPointYQ = points.some((p) => p.y === ynegative && p.x === x);
    const isYNegPlaced = neighboors.some((n) => n.y === ynegative && n.x === x);
    const isYNegative = !existPointYQ && !isYNegPlaced && !itsYNegPushed;
    if (ynegative > -1 && isYNegative) {
      newExpansion.push({
        ...point,
        y: y - scale,
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
    currentExpansion = newExpansion;
    neighboors = [...neighboors, ...newExpansion];
  }
};

const DijkstraSetup = {
  setup,
  draw,
};

export default DijkstraSetup;
