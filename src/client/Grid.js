import TileWorker from './Tile.worker.js';

const tileWorker = new TileWorker();

var Grid = function () {
  const grid = this;
  this.tiles = [];
  this.tileSize = {
    x: 1000,
    y: 1000
  };
  this.size = {
    x: 5,
    y: 5
  }
  this.rendering = true;

  tileWorker.onmessage = function (event) {
    var message = event.data
    switch (message.type) {
      case "add_tile":
        grid.tiles.push(message.tile);
        break;
    }
  };
  this.focus = undefined
  this.checkNearestTile = function (position) {
    var gridIndex = {
      x: Math.round(position.x / this.tileSize.x),
      y: Math.round(-position.y / this.tileSize.y)
    }
    var result = {
      id: String(gridIndex.x) + String(gridIndex.y),
      gridIndex,
      position: {
        x: this.tileSize.x * gridIndex.x,
        y: this.tileSize.y * gridIndex.y
      }
    }
    return result;
  };
  this.excessiveTilesfilter = (tile, nearestTile) => {
    for (var x = -Math.floor(this.size.x/2); x < Math.ceil(this.size.x/2); x++) {
      for (var y = -Math.floor(this.size.y/2); y < Math.ceil(this.size.y/2); y++) {
        if (tile.gridIndex.x === nearestTile.gridIndex.x + x && tile.gridIndex.y === nearestTile.gridIndex.y + y) return true;
      }
    }
    return false
  }
  this.findMissingTiles = (tiles, nearestTile) => {
    var missingTiles = []
    for (var x = -Math.floor(this.size.x/2); x < Math.ceil(this.size.x/2); x++) {
      for (var y = -Math.floor(this.size.y/2); y < Math.ceil(this.size.y/2); y++) {
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
    grid.rendering = !(grid.tiles.length === grid.size.x * grid.size.y);
  }
}
export default Grid