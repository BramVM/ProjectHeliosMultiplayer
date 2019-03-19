import seedrandom from 'seedrandom'
import { seedrandomBetween } from '../shared/helperFunctions'

function calculateColor(colorRange, seedstring) {
  const r = seedrandomBetween(colorRange.rMin, colorRange.rMax, 'r' + seedstring)
  const g = seedrandomBetween(colorRange.gMin, colorRange.gMax, 'g' + seedstring)
  const b = seedrandomBetween(colorRange.bMin, colorRange.bMax, 'b' + seedstring)
  const a = seedrandomBetween(colorRange.aMin, colorRange.aMax, 'a' + seedstring)
  return { r, g, b, a }
}

class Planet {
  constructor(position, size, baseColorRange, textureColorRange) {
    this.positionInTile = position
    this.size = size
    const seedstring = String(position.x) + String(position.y)
    this.color = calculateColor(baseColorRange, seedstring + "color")
    Math.seedrandom(seedstring + "rotation");
    this.rotation = 2 * Math.PI * Math.random();
    this.atmosphereRings = Math.round(Math.random() * 2); // 0, 1 or 2
    Math.seedrandom(seedstring + "textrure");
    if (Math.random() > 0.5) {
      this.texture = new RingTexture(seedstring, textureColorRange);
    }
    else {
      this.texture = new CicleTexture(seedstring, textureColorRange, this.size);
    }
  }
}

class RingTexture {
  constructor(seedstring, colorRange) {
    this.type = 'ringTexture'
    this.color = calculateColor(colorRange, seedstring + "textureColor")
    Math.seedrandom(seedstring + "texture");
    this.rings = 1 + Math.round(Math.random() * 2)
  }
}

class CicleTexture {
  constructor(seedstring, colorRange, planetSize) {
    this.type = 'cicleTexture'
    this.color = calculateColor(colorRange, seedstring + "textureColor")
    this.circles = []
    Math.seedrandom(seedstring + "number");
    const numberOfCircles = Math.round(4 + Math.random() * 4)
    const minCicleSize = planetSize / 12
    const maxCicleSize = planetSize / 6
    for (let index = 0; index < numberOfCircles; index++) {
      const circle = {};
      Math.seedrandom(seedstring + index + "angle");
      circle.angle = Math.PI * 2 * Math.random();
      Math.seedrandom(seedstring + index + "distance");
      circle.distance = (planetSize + minCicleSize) / 4 * Math.sqrt(Math.random());
      Math.seedrandom(seedstring + index + "size");
      circle.size = minCicleSize + (maxCicleSize - minCicleSize) * Math.random();
      this.circles.push(circle)
    }
  }
}

export default Planet