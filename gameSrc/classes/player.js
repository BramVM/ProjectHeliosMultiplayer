var cord = require("../classes/cord.js");
var spotLight = require("../classes/spotLight.js");

var player = function(id, direction, movement, position){
	this.id = id;
	this.direction = direction;
	this.movement = movement;
	this.speed = 10;
	this.position = new cord (position.x,position.y);
	/*this.light ={
		state: true,
		angle: Math.PI
	}*/
	this.headlight = new spotLight(1,Math.PI/3,500,true);
};
if (typeof(module) !== 'undefined') module.exports = player;