/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
import { p5InstanceExtensions, Vector } from "p5";
import Particle from "./Entities/particle";

let xoff = 0;
let yoff = 1000;
let zoff = 9999;

let col = 0;
let row = 0;
const scale = 15;

const inc = 0.01;
let flowfield: any = [];
const particles: any = [];

const particlesNumber = 600;

const setup = (
  context: p5InstanceExtensions,
  canvasRef: React.RefObject<HTMLDivElement>
) => {
  if (!canvasRef.current) return;
  canvasRef.current.innerHTML = "";

  const { windowWidth, windowHeight } = context;
  context.createCanvas(windowWidth, windowHeight).parent(canvasRef.current);

  col = Math.floor(windowWidth / scale);
  row = Math.floor(windowHeight / scale);

  flowfield = new Array(col * row);

  for (let i = 0; i < particlesNumber; i++) {
    particles[i] = new Particle(context);
  }
};

const draw = (context: p5InstanceExtensions) => {
  const { noise } = context;
  context.background(0);

  yoff = 0;
  for (let i = 0; i < col; i++) {
    xoff = 0;
    for (let j = 0; j < row; j++) {
      const index = i + j * col;
      const angle = noise(xoff, yoff, zoff) * context.TWO_PI * 4;
      const vector = Vector.fromAngle(angle);
      vector.setMag(0.05);
      flowfield[index] = vector;
      xoff += inc;
      context.stroke(255, 50);
      // context.push();
      // context.translate(i * scale, j * scale);
      // context.rotate(vector.heading());
      // context.strokeWeight(1);
      // context.line(0, 0, scale, 0);
      // context.pop();
    }
    yoff += inc;
    zoff += 0.00003;
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield, scale, col);
    particles[i].update();
    particles[i].edges();
    particles[i].show(context);
  }
};

const FlowSetup = {
  setup,
  draw,
};

export default FlowSetup;
