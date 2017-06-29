var cord = require("../../prototypes/cord.js");
var seedrandom = require('seedrandom');

var canvasInterface = function () {
	self = this;
	this.viewport = {};
	this.context = {};
	this.perspectiveOffset = new cord();
	this.start = function( canvaselement){
		this.viewport = canvaselement;
		this.context = this.viewport.getContext("2d");
		this.context.canvas.width  = window.innerWidth;
  		this.context.canvas.height = window.innerHeight;
	}
	this.clear = function(){
		self.context.clearRect(0, 0, self.context.canvas.width, self.context.canvas.height);
		self.context.beginPath();
		self.context.closePath();
	}
	this.setPlayerPerspective = function(player){
		self.perspectiveOffset = new cord(player.position.x, player.position.y);
		self.perspectiveOffset.x = window.innerWidth/2 - self.perspectiveOffset.x;
		self.perspectiveOffset.y = window.innerHeight/2 - self.perspectiveOffset.y
		console.log(self.perspectiveOffset.x);
	}
	this.drawPlayers = function(players){
		for (var i = players.length - 1; i >= 0; i--) {
			self.context.rect(players[i].position.x + self.perspectiveOffset.x, players[i].position.y + self.perspectiveOffset.y,10,10);
			self.context.stroke();
		}
	}
	this.drawBackground = function(){
		Math.seedrandom(self.perspectiveOffset.x)
		randomX = 2000-Math.random()*4000;

		var _grd=self.context.createRadialGradient(Math.sin(self.perspectiveOffset.x),self.perspectiveOffset.y,5,Math.sin(self.perspectiveOffset.x),self.perspectiveOffset.y,1000);
		_grd.addColorStop(0,"red");
		_grd.addColorStop(1,"transparent");

		// Fill with gradient
		self.context.fillStyle=_grd;
		self.context.fillRect(0, 0, self.context.canvas.width, self.context.canvas.height);
	}
}
			
if (typeof(module) !== 'undefined') module.exports = canvasInterface;