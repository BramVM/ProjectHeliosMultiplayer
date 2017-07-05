var tile = function(position){
	this.position = position;
	this.planets = [];
	this.id = String(Math.round(position.x))+String(Math.round(position.y));
}
var cord = require("../prototypes/cord.js");
var worldGenerator = function(){
	this.tiles = [];
	this.gridSize = {
		x:1000,
		y:1000
	};
	this.gridMatrixSize = 2;
	this.checkNearestTilePosition = function (position){
		var nearestTilePosition = new cord();
		nearestTilePosition.x = this.gridSize.x * Math.round(position.x/this.gridSize.x) -this.gridSize.x/2;
		nearestTilePosition.y = this.gridSize.y * Math.round(position.y/this.gridSize.y) -this.gridSize.y/2;
		return nearestTilePosition;
	};
	this.generateTilesOnPlayer = function (playerPosition){
		this.tiles = [];
		var _nearestTilePosition = this.checkNearestTilePosition(playerPosition);
		for(j=-this.gridMatrixSize;j<=this.gridMatrixSize;j++){
			for(i=-this.gridMatrixSize;i<=this.gridMatrixSize;i++){
				this.tiles.push(new tile(new cord(_nearestTilePosition.x-i*this.gridSize.x, _nearestTilePosition.y-j*this.gridSize.y)))
			}
		}
	};
}

if (typeof(module) !== 'undefined') module.exports = worldGenerator;