var cord = require("../prototypes/cord.js");

var player = function(id, direction, movement, position){
	this.id = id;
	this.direction = direction;
	this.movement = movement;
	this.speed = 10;
	this.position = new cord (position.x,position.y);
};
if (typeof(module) !== 'undefined') module.exports = player;