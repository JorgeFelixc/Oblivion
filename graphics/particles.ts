/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
import { p5InstanceExtensions } from "p5";

// const fw = 100;
// const fh = 50;

let xoff = 0;
let yoff = 1000;
let zoff = 9999;
// let xoff = 0.001;
// let sum = 0.05;

const setup = (context: p5InstanceExtensions, canvasRef: any) => {
  if (!canvasRef.current) return;
  const { windowWidth, windowHeight } = context;
  context
    .createCanvas(windowWidth, windowHeight, context.WEBGL)
    .parent(canvasRef.current);
};

const draw = (context: p5InstanceExtensions) => {
  const { map, noise, height, width } = context;
  context.background(0);
  for (let i = 0; i < width; i++) {
    // const xoffAdjusted = xoff + i * 200;
    // const xnoise = map(noise(xoffAdjusted), 0, 1, 0, width * 1.5);

    const yoffAdjusted = yoff + i * 2000;
    const ynoise = map(noise(yoffAdjusted), 0, 1, 0, height * 2);

    const zoffAdjusted = zoff + i * 2000;
    const znoise = map(noise(zoffAdjusted), 0, 1, 0, 10);

    context.ellipse(i, ynoise, znoise, znoise);
  }

  xoff += 0.001;
  yoff += 0.001;
  zoff += 0.02;
};

const ParticleSetup = {
  setup,
  draw,
};

export default ParticleSetup;
