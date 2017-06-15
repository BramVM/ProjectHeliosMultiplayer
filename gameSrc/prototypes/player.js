var cord = require("../prototypes/cord.js");

var player = function(id){
	this.id = id;
	this.direction = 0;
	this.movement = false;
	this.speed = 10;
	this.position = new cord (0,0);
};
if (typeof(module) !== 'undefined') module.exports = player;