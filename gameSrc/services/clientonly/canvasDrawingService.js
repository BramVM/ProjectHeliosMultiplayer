var cord = require("../../prototypes/cord.js");
var seedrandom = require('seedrandom');

var canvasInterface = function () {
	self = this;
	this.layer1 = {};
	this.layer1.context = {};
	this.layer2 = {};
	this.layer2.context = {};
	this.perspectiveOffset = new cord();
	this.start = function( layer1, layer2 ){
		this.layer1 = layer1;
		this.layer2 = layer2;
		this.layer1.context = this.layer1.getContext("2d");
		this.layer1.context.canvas.width  = window.innerWidth;
  		this.layer1.context.canvas.height = window.innerHeight;
  		this.layer2.context = this.layer2.getContext("2d");
		this.layer2.context.canvas.width  = window.innerWidth;
  		this.layer2.context.canvas.height = window.innerHeight;
	}
	this.clear = function(){
		self.layer1.context.clearRect(0, 0, self.layer1.context.canvas.width, self.layer1.context.canvas.height);
		self.layer1.context.beginPath();
		self.layer1.context.closePath();
		self.layer2.context.clearRect(0, 0, self.layer1.context.canvas.width, self.layer1.context.canvas.height);
		self.layer2.context.beginPath();
		self.layer2.context.closePath();
	}
	this.setPlayerPerspective = function(player){
		self.perspectiveOffset = new cord(player.position.x, player.position.y);
		self.perspectiveOffset.x = window.innerWidth/2 - self.perspectiveOffset.x;
		self.perspectiveOffset.y = window.innerHeight/2 - self.perspectiveOffset.y
		console.log(self.perspectiveOffset.x);
	}
	this.drawPlayers = function(players){
		for (var i = players.length - 1; i >= 0; i--) {
			self.layer1.context.rect(players[i].position.x + self.perspectiveOffset.x, players[i].position.y + self.perspectiveOffset.y,10,10);
			self.layer1.context.stroke();
		}
	}
	this.drawBackground = function(){
		
		self.layer1.context.beginPath();
  		self.layer1.context.moveTo(0, 0);
  		self.layer1.context.lineTo(self.layer1.context.canvas.width, 0);
		self.layer1.context.lineTo(self.layer1.context.canvas.width, self.layer1.context.canvas.height);
		self.layer1.context.lineTo(0,self.layer1.context.canvas.height);
		self.layer1.context.lineTo(0,0);
		self.layer1.context.closePath();
		self.layer1.context.fillStyle="#1C0221";
		self.layer1.context.fill();
		// Fill with gradient
		
	}
	this.drawDarkness = function(players){
		var _radialLightGradient=self.layer1.context.createRadialGradient(self.layer1.context.canvas.width/2,self.layer1.context.canvas.height/2,0,self.layer1.context.canvas.width/2,self.layer1.context.canvas.height/2,1000);
		_radialLightGradient.addColorStop(0,"transparent");
  		_radialLightGradient.addColorStop(1,"#000");

  		//var fullCanvasPath = new Path2D();
  		//radial darkness
  		self.layer2.context.beginPath();
  		self.layer2.context.moveTo(0, 0);
  		self.layer2.context.lineTo(self.layer1.context.canvas.width, 0);
		self.layer2.context.lineTo(self.layer1.context.canvas.width, self.layer1.context.canvas.height);
		self.layer2.context.lineTo(0,self.layer1.context.canvas.height);
		self.layer2.context.lineTo(0,0);
		self.layer2.context.closePath();
		self.layer2.context.fillStyle=_radialLightGradient;
		self.layer2.context.fill();
		//extract player headlights
		self.layer2.context.globalCompositeOperation= "destination-out";
		for (var i = players.length - 1; i >= 0; i--) {
			if(players[i].headlight.state){
				self.layer2.context.beginPath();
				self.layer2.context.moveTo(players[i].position.x + self.perspectiveOffset.x, players[i].position.y + self.perspectiveOffset.y);
				self.layer2.context.arc(players[i].position.x + self.perspectiveOffset.x, players[i].position.y + self.perspectiveOffset.y, players[i].headlight.range, players[i].direction*Math.PI/4-Math.PI/2-players[i].headlight.angle/2, players[i].direction*Math.PI/4-Math.PI/2+players[i].headlight.angle/2);
				self.layer2.context.moveTo(players[i].position.x + self.perspectiveOffset.x, players[i].position.y + self.perspectiveOffset.y);
				self.layer2.context.closePath();
				_spotLightGradient=self.layer1.context.createRadialGradient(players[i].position.x + self.perspectiveOffset.x, players[i].position.y + self.perspectiveOffset.y,0,players[i].position.x + self.perspectiveOffset.x, players[i].position.y + self.perspectiveOffset.y,players[i].headlight.range);
				_spotLightGradient.addColorStop(0,"#000");
				_spotLightGradient.addColorStop(1,"transparent");
				self.layer2.context.fillStyle=_spotLightGradient;
				self.layer2.context.fill();
			}
			
		}
		self.layer2.context.globalCompositeOperation = "source-over";	
	}
	this.drawWorld = function(tiles,gridSize){
		for (var i = tiles.length - 1; i >= 0; i--) {
			self.layer1.context.beginPath();
			self.layer1.context.rect(tiles[i].position.x+ self.perspectiveOffset.x,tiles[i].position.y+ self.perspectiveOffset.y,gridSize.x,gridSize.y);
			self.layer1.context.closePath();
			//self.layer1.context.rect(20,20,150,100);
			self.layer1.context.stroke();
		}
	}
}
			
if (typeof(module) !== 'undefined') module.exports = canvasInterface;