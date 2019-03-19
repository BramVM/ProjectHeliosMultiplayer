import CanvasDrawer from './CanvasDrawer'
import Star from './Star'
import Planet from './Planet'
import Nebula from './Nebula'
import {
  getBiomeAtPosition,
  getBiomeNebulaColorRange,
  getBiomeStars,
  checkBiome
} from './biomeCalculations'
import seedrandom from 'seedrandom'
import { seedrandomBetween } from '../shared/helperFunctions'

const gridSize = {
  y: 1000,
  x: 1000
}
const canvasDrawer = new CanvasDrawer();
const tileCanvas = new OffscreenCanvas(gridSize.x, gridSize.y)
const ctx = tileCanvas.getContext('2d');
class Tile {
  constructor(gridIndex) {
    canvasDrawer.initOffscreenCanvas(tileCanvas);
    this.gridIndex = gridIndex
    this.size = gridSize;
    this.id = String(this.gridIndex.x) + String(this.gridIndex.y);
    this.position = {
      x: gridSize.x * gridIndex.x,
      y: gridSize.y * gridIndex.y
    }
    const tileBiomeAverage = getBiomeAtPosition(this.position)
    const seedString = String(this.position.x) + String(this.position.y)
    const { mid, size, biome } = checkBiome(this.position)
    mid.x = mid.x - this.position.x
    mid.y = mid.y - this.position.y
    this.biomeMid = mid;
    this.biomeSize = size;
    this.biomeBackgroundColor = biome.backgroundColor;
    this.planets = this.generatePlanets(tileBiomeAverage, seedString);
    this.nebulaFields = this.generateNebulaFields(tileBiomeAverage, seedString);
    this.stars = this.generateStars(tileBiomeAverage);
    canvasDrawer.drawTile(this);
    this.imageData = ctx.getImageData(0, 0, gridSize.x, gridSize.y);
    canvasDrawer.clear();
  }

  generatePlanets(tileBiomeAverage, seedString) {
    const { maxNumberOfPlanets, minNumberOfPlanets, minSizeFactor, maxSizeFactor, baseColorRange, textureColorRange } = tileBiomeAverage.planets
    const planets = [];
    Math.seedrandom(seedString + "numberOfPlanets");
    const numberOfPlanets = Math.round(seedrandomBetween(minNumberOfPlanets, maxNumberOfPlanets, seedString + "numberOfPlanets"));
    for (let index = 0; index < numberOfPlanets; index++) {
      const minSize = gridSize.x * minSizeFactor
      const maxSize = gridSize.x * maxSizeFactor
      const planetSize = seedrandomBetween(minSize, maxSize, seedString + "planetSize" + index);
      const planetPosition = {
        x: seedrandomBetween(planetSize / 2, gridSize.x - planetSize / 2, seedString + "planetPosX" + index),
        y: seedrandomBetween(planetSize / 2, gridSize.y - planetSize / 2, seedString + "planetPosY" + index)
      }
      planets.push(new Planet(planetPosition, planetSize, baseColorRange, textureColorRange))
    }
    return planets
  }

  generateNebulaFields(tileBiomeAverage, seedString) {
    const { maxNumberOfFields, minNumberOfFields, minSizeFactor, maxSizeFactor } = tileBiomeAverage.nebula
    const nebulaFields = [];
    Math.seedrandom(seedString + "numberOfNebulaFields");
    const numberOfNebulaFields = Math.round(seedrandomBetween(minNumberOfFields, maxNumberOfFields, seedString + "numberOfNebulaFields"));
    for (let index = 0; index < numberOfNebulaFields; index++) {
      const minSize = gridSize.x * minSizeFactor
      const maxSize = gridSize.x * maxSizeFactor
      const nebulaSize = seedrandomBetween(minSize, maxSize, seedString + "nebulaSize" + index);
      const nebulaPosition = {
        x: seedrandomBetween(nebulaSize / 2, gridSize.x - nebulaSize / 2, seedString + "nebulaPosX" + index),
        y: seedrandomBetween(nebulaSize / 2, gridSize.y - nebulaSize / 2, seedString + "nebulaPosY" + index)
      }
      const nebulaWorldPosition = {
        x: nebulaPosition.x + this.position.x,
        y: nebulaPosition.y + this.position.y,
      }
      const nebulaSeedString = this.id + index;
      const colorRange = getBiomeNebulaColorRange(nebulaWorldPosition)
      nebulaFields.push(new Nebula(nebulaPosition, nebulaSize, nebulaSeedString, colorRange))
    }
    return nebulaFields
  }

  generateStars(tileBiomeAverage) {
    const { densety, minSize, maxSize, colorRange } = tileBiomeAverage.stars
    const stars = [];
    const width = gridSize.x;
    const height = gridSize.y;
    const cursor = { x: 0, y: 0 };
    let stepSizeY = height / densety
    let stepSizeX = width / densety

    while (cursor.x < width) {
      cursor.y = 0;
      while (cursor.y < height) {
        const seedstring = '' + cursor.x + this.position.x + cursor.y + this.position.y
        Math.seedrandom("starx" + seedstring);
        var xMod = Math.random();
        Math.seedrandom("stary" + seedstring);
        var yMod = Math.random();
        Math.seedrandom("starsize" + cursor.x + this.position.x + cursor.y + this.position.y);
        var sizeMod = Math.random();
        var size = minSize + (maxSize - minSize) * sizeMod;
        const starPos = { x: cursor.x + size / 2 + (stepSizeX - size) * xMod, y: cursor.y + size / 2 + (stepSizeY - size) * yMod };
        const r = seedrandomBetween(colorRange.rMin, colorRange.rMax, 'r' + seedstring)
        const g = seedrandomBetween(colorRange.gMin, colorRange.gMax, 'g' + seedstring)
        const b = seedrandomBetween(colorRange.bMin, colorRange.bMax, 'b' + seedstring)
        const a = seedrandomBetween(colorRange.aMin, colorRange.aMax, 'a' + seedstring)
        const color = { r, g, b, a }
        stars.push(new Star(starPos, size, color));
        cursor.y = cursor.y + stepSizeY;
      }
      cursor.x = cursor.x + stepSizeX;
    }
    return stars
  }
}

export default Tile