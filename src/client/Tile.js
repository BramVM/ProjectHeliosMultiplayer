import CanvasDrawer from './CanvasDrawer'
import Star from './Star'
import Planet from './Planet'
import seedrandom from 'seedrandom'

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
    this.id = String(this.gridIndex.x) + String(this.gridIndex.y),
      this.position = {
        x: gridSize.x * gridIndex.x - gridSize.x / 2,
        y: gridSize.y * gridIndex.y - gridSize.y / 2
      }
    this.planet= new Planet(this);
    this.stars = this.getStars();
    canvasDrawer.drawTile(this);
    this.imageData = ctx.getImageData(0, 0, gridSize.x, gridSize.y);
    canvasDrawer.clear();
  }

  getStars () {
    const stars = [];
    const width = gridSize.x;
    const height = gridSize.y;
    const cursor = {x:0,y:0};
    const densety = 10;
    const minSize = 5;
    const maxSize = 20;
    const stepSizeY = height / densety
    const stepSizeX = width / densety

    while (cursor.x < width) {
      cursor.y = 0;
      while (cursor.y < height) {
        Math.seedrandom("starx" + cursor.x + this.position.x + cursor.y + this.position.y);
        var xMod = Math.random();
        Math.seedrandom("stary" + cursor.x + this.position.x + cursor.y + this.position.y);
        var yMod = Math.random();
        Math.seedrandom("starsize" + cursor.x + this.position.x + cursor.y + this.position.y);
        var sizeMod = Math.random();
        var size = minSize + (maxSize - minSize) * sizeMod;
        const starPos = {x:cursor.x + size / 2 + (stepSizeX - size) * xMod, y: cursor.y + size / 2 + (stepSizeY - size) * yMod};
        stars.push(new Star(starPos, size));
        cursor.y = cursor.y + stepSizeY;
      }
      cursor.x = cursor.x + stepSizeX;
    }
    return stars
  }
}

export default Tile