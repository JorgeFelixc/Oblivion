/* eslint-disable operator-assignment */
/* eslint-disable lines-between-class-members */
import { p5InstanceExtensions, Vector } from "p5";

export default class Particle {
  position: Vector;
  pos: Vector;
  vel: Vector;
  acc: Vector;
  prevPos: Vector;

  public maxspeed = 2;
  public h = 0;
  public width = 2;
  public height = 2;

  constructor(context: p5InstanceExtensions) {
    const { createVector, height, width } = context;
    const vecWidth = Math.random() * width + 1;
    const vecHeight = Math.random() * height + 1;

    this.position = createVector(0, 0);
    this.pos = createVector(vecWidth, vecHeight);
    this.vel = createVector(1, 1);
    this.acc = createVector(0, 0);

    this.prevPos = this.pos.copy();
    this.height = height;
    this.width = width;
  }

  public update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  follow(vector: any, scl: any, cols: any) {
    const x = Math.floor(this.pos.x / scl);
    const y = Math.floor(this.pos.y / scl);
    const index = x + y * cols;
    const force = vector[index];
    this.applyForce(force);
  }

  applyForce(force: any) {
    this.acc.add(force);
  }

  show(context: p5InstanceExtensions) {
    context.stroke(50, 255, 255, 100);
    // this.h = this.h + 1;
    // if (this.h > 255) {
    //   this.h = 0;
    // }
    context.strokeWeight(4);
    context.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
  }
  updatePrev() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  edges() {
    if (this.pos.x > this.width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = this.width;
      this.updatePrev();
    }
    if (this.pos.y > this.height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = this.height;
      this.updatePrev();
    }
  }
}
