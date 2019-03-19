import seedrandom from 'seedrandom'
import { seedrandomBetween } from '../shared/helperFunctions'

class Nebula {
  constructor(position, size, seedstring, colorRange) {
    this.size = size / 2;
    this.minCircles = this.size / 6;
    this.maxCircles = this.size / 3;
    this.position = position;
    this.circles = [];
    Math.seedrandom('initialDistance' + seedstring);
    for (var i = 0; i < this.size; i = i + this.size / this.maxCircles + (this.size / this.minCircles - this.size / this.maxCircles) * Math.random()) {
      this.circles.push(new Circle(i, this.size, seedstring + i, colorRange))
      Math.seedrandom('distance' + i + seedstring);
    }
  }
}

class Circle {
  constructor(distance, nebulaSize, seedstring, colorRange) {
    Math.seedrandom('angle' + seedstring);
    this.angle = Math.PI * 2 * Math.random();
    const minCircleSize = 40;
    if (distance > nebulaSize - minCircleSize) { distance = nebulaSize - minCircleSize }
    this.distance = distance;
    const maxCircleSize = nebulaSize - distance
    Math.seedrandom('size' + seedstring);
    this.size = minCircleSize + Math.random() * (maxCircleSize - minCircleSize);
    const r = seedrandomBetween(colorRange.rMin, colorRange.rMax, 'r' + seedstring)
    const g = seedrandomBetween(colorRange.gMin, colorRange.gMax, 'g' + seedstring)
    const b = seedrandomBetween(colorRange.bMin, colorRange.bMax, 'b' + seedstring)
    const a = seedrandomBetween(colorRange.aMin, colorRange.aMax, 'a' + seedstring)
    this.color = { r, g, b, a }
  }
}

export default Nebula