import TileWorker from './Tile.worker.js';

const tileWorker = new TileWorker();

var Grid = function () {
  const grid = this;
  this.size = {
    x: 1000,
    y: 1000
  };
  tileWorker.onmessage = function (event) {
    var message = event.data
    switch(message.type) {
      case "add_tile":
        grid.tiles.push(message.tile);
      break;
    }
  };
  this.tiles = []
  this.focus = undefined
  this.checkNearestTile = function (position) {
    var gridIndex = {
      x: Math.round(position.x / this.size.x),
      y: Math.round(-position.y / this.size.y)
    }
    var result = {
      id: String(gridIndex.x) + String(gridIndex.y),
      gridIndex,
      position: {
        x: this.size.x * gridIndex.x - this.size.x / 2,
        y: this.size.y * gridIndex.y - this.size.y / 2
      }
    }
    return result;
  };
  this.excessiveTilesfilter = (tile, nearestTile) => {
    for (var x = -2; x < 3; x++) {
      for (var y = -2; y < 3; y++) {
        if (tile.gridIndex.x === nearestTile.gridIndex.x + x && tile.gridIndex.y === nearestTile.gridIndex.y + y) return true;
      }
    }
    return false
  }
  this.findMissingTiles = (tiles, nearestTile) => {
    var missingTiles = []
    for (var x = -2; x < 3; x++) {
      for (var y = -2; y < 3; y++) {
        var tileFound = tiles.find(tile => tile.gridIndex.x === nearestTile.gridIndex.x + x && tile.gridIndex.y === nearestTile.gridIndex.y + y)
        if (!tileFound) missingTiles.push({ x: nearestTile.gridIndex.x + x, y: nearestTile.gridIndex.y + y })
      }
    }
    return missingTiles
  }
  this.update = (position) => {
    var nearestTile = this.checkNearestTile(position)
    if (focus != nearestTile.id) {
      focus = nearestTile.id;
      this.tiles = this.tiles.filter(tile => grid.excessiveTilesfilter(tile, nearestTile))
      const missingTiles = this.findMissingTiles(this.tiles, nearestTile)
      missingTiles.forEach(gridIndex => { tileWorker.postMessage({ type: "request_tile", gridIndex }); })
    }
  }
}
export default Grid