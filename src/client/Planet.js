import seedrandom from 'seedrandom'

const maxSize = 600
const minSize = 300

class Planet {
  constructor(tile) {
    this.tile = tile;
    this.positionInTile = {
      x: undefined,
      y: undefined
    };
    this.color = {
      r: undefined,
      g: undefined,
      b: undefined
    }

    Math.seedrandom("s" + tile.position.x + tile.position.y);
    this.size = minSize + Math.random() * (maxSize - minSize);
    Math.seedrandom("x" + tile.position.x + tile.position.y);
    this.positionInTile.x = Math.random() * (tile.size.x - this.size) + this.size / 2;
    Math.seedrandom("y" + tile.position.x + tile.position.y);
    this.positionInTile.y = Math.random() * (tile.size.y - this.size) + this.size / 2;

    this.positionInUniverse = {
      x: tile.position.x + this.positionInTile.x,
      y: tile.position.y + this.positionInTile.y
    }

    const seedString = String(this.positionInUniverse.x) + String(this.positionInUniverse.Y)
    Math.seedrandom(seedString + "r");
    this.color.r = 100 + Math.random() * 155;
    Math.seedrandom(seedString + "g");
    this.color.g = 100 + Math.random() * 155;
    Math.seedrandom(seedString + "b");
    this.color.b = 100 + Math.random() * 155;
    Math.seedrandom(seedString + "rotation");
    this.rotation = Math.PI * 2 * Math.random();
    Math.seedrandom(seedString + "atmos");
    this.atmosphereRings = Math.round(Math.random() * 2); // 0, 1 or 2
    this.texture = new RingTexture(seedString);
  }
}

class RingTexture {
  constructor(seedString) {
    this.type = 'ringTexture'
    Math.seedrandom(seedString + "texture");
    this.rings = 1 + Math.round(Math.random() * 2)
  }
}

export default Planet