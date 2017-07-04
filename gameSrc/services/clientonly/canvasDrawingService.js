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
	this.drawPlanet = function(position,size){
		//draw base
		self.layer1.context.beginPath();
		self.layer1.context.arc(position.x + self.perspectiveOffset.x, position.y + self.perspectiveOffset.y, size, 0, 2 * Math.PI, false);
		self.layer1.context.fillStyle = '#f200ff';
     	self.layer1.context.fill();
		self.layer1.context.closePath();
		//draw shadows
		_outlineShadow = self.layer1.context.createRadialGradient(position.x + self.perspectiveOffset.x, position.y + self.perspectiveOffset.y,size/2,position.x + self.perspectiveOffset.x, position.y + self.perspectiveOffset.y,size/2*3);
		_outlineShadow.addColorStop(0,"transparent");
		_outlineShadow.addColorStop(1,"rgba(0, 0, 0, 0.5)");
		self.layer1.context.beginPath();
		self.layer1.context.arc(position.x + self.perspectiveOffset.x, position.y + self.perspectiveOffset.y, size, 0, 2 * Math.PI, false);
		self.layer1.context.fillStyle = _outlineShadow;
     	self.layer1.context.fill();
		self.layer1.context.closePath();
		_ambientShadow = self.layer1.context.createRadialGradient(position.x + self.perspectiveOffset.x, position.y + self.perspectiveOffset.y,0,position.x + self.perspectiveOffset.x, position.y + self.perspectiveOffset.y,size);
		_ambientShadow.addColorStop(0,"transparent");
		_ambientShadow.addColorStop(1,"rgba(0, 0, 0, 0.5)");
		self.layer1.context.beginPath();
		self.layer1.context.arc(position.x + self.perspectiveOffset.x, position.y + self.perspectiveOffset.y, size, 0, 2 * Math.PI, false);
		self.layer1.context.fillStyle = _ambientShadow;
     	self.layer1.context.fill();
		self.layer1.context.closePath();
	}
	this.drawRandomShape = function(player){
		var position = new cord(player.position.x,player.position.y);
		/*self.layer1.context.beginPath();
		      self.layer1.context.arc(position.x, position.y, 2, 0, 2 * Math.PI, false);
		      self.layer1.context.fillStyle = 'red';
		      self.layer1.context.fill();
		      self.layer1.context.closePath();*/
		var size = 50;
		var minDistance = 10;
		var numberOfPoints = 6
		self.layer1.context.beginPath();
		Math.seedrandom(""+String(position.x) + String(position.y));
		for (var i = 0; i < numberOfPoints; i++) {
			if(i!=0){
				bezierpoint1 = new cord(prevPoint.x, prevPoint.y);
				bezierpoint1.moveByDistanceAndAngle(prevOffset/2,prevAngle+Math.PI/2);
				/*self.layer1.context.beginPath();
		      self.layer1.context.arc(bezierpoint1.x, bezierpoint1.y, 2, 0, 2 * Math.PI, false);
		      self.layer1.context.fillStyle = 'green';
		      self.layer1.context.fill();
		      self.layer1.context.closePath();*/
			}
			 
			calculatedPosition = new cord(position.x, position.y);
			prevAngle = Math.PI*2/numberOfPoints*i;
			prevOffset = minDistance + Math.random()*(size-minDistance);
			calculatedPosition.moveByDistanceAndAngle(prevOffset,Math.PI*2/numberOfPoints*i);
			/*self.layer1.context.beginPath();
		      self.layer1.context.arc(calculatedPosition.x, calculatedPosition.y, 2, 0, 2 * Math.PI, false);
		      self.layer1.context.fillStyle = 'blue';
		      self.layer1.context.fill();
		      self.layer1.context.closePath();*/
			Math.seedrandom(""+String(calculatedPosition.x) + String(calculatedPosition.y));
			if(i===0){
				self.layer1.context.moveTo(calculatedPosition.x, calculatedPosition.y);
				firstpoint = calculatedPosition;
				firstAngle= prevAngle;
				firstOffset= prevOffset;
			}
			else{
				bezierpoint2 = new cord(calculatedPosition.x, calculatedPosition.y);
				bezierpoint2.moveByDistanceAndAngle(prevOffset/2,prevAngle-Math.PI/2);
				 /*self.layer1.context.beginPath();
		      self.layer1.context.arc(bezierpoint2.x, bezierpoint2.y, 2, 0, 2 * Math.PI, false);
		      self.layer1.context.fillStyle = '#ffffff';
		      self.layer1.context.fill();
		      self.layer1.context.closePath();*/
				self.layer1.context.bezierCurveTo(bezierpoint1.x,bezierpoint1.y,bezierpoint2.x,bezierpoint2.y,calculatedPosition.x, calculatedPosition.y);
				//self.layer1.context.lineTo(calculatedPosition.x, calculatedPosition.y);
				
			}
			prevPoint = calculatedPosition;
		}
		bezierpoint1 = new cord(calculatedPosition.x, calculatedPosition.y);
		bezierpoint1.moveByDistanceAndAngle(prevOffset/2,prevAngle+Math.PI/2);
		bezierpoint2 = new cord(firstpoint.x, firstpoint.y);
		bezierpoint2.moveByDistanceAndAngle(firstOffset/2,firstAngle-Math.PI/2);
		self.layer1.context.bezierCurveTo(bezierpoint1.x,bezierpoint1.y,bezierpoint2.x,bezierpoint2.y,firstpoint.x, firstpoint.y);
		//self.layer1.context.lineTo(calculatedPosition.x, calculatedPosition.y);
		Math.seedrandom();
		self.layer1.context.fillStyle = '#ffffff';
		self.layer1.context.fill();
		self.layer1.context.closePath();

	}
	this.drawDarkness = function(players, darkness){
		//draw visual effect for lights
		for (var i = players.length - 1; i >= 0; i--) {
			if(players[i].headlight.state){
				self.layer1.context.beginPath();
				self.layer1.context.moveTo(players[i].position.x + self.perspectiveOffset.x, players[i].position.y + self.perspectiveOffset.y);
				self.layer1.context.arc(players[i].position.x + self.perspectiveOffset.x, players[i].position.y + self.perspectiveOffset.y, players[i].headlight.range, players[i].direction*Math.PI/4-Math.PI/2-players[i].headlight.angle/2, players[i].direction*Math.PI/4-Math.PI/2+players[i].headlight.angle/2);
				self.layer1.context.moveTo(players[i].position.x + self.perspectiveOffset.x, players[i].position.y + self.perspectiveOffset.y);
				self.layer1.context.closePath();
				_spotLightGradient=self.layer1.context.createRadialGradient(players[i].position.x + self.perspectiveOffset.x, players[i].position.y + self.perspectiveOffset.y,0,players[i].position.x + self.perspectiveOffset.x, players[i].position.y + self.perspectiveOffset.y,players[i].headlight.range);
				_spotLightGradient.addColorStop(0,"rgba(255, 232, 85, " + 0.15*players[i].headlight.intensity +")");
				_spotLightGradient.addColorStop(1,"transparent");
				self.layer1.context.fillStyle=_spotLightGradient;
				self.layer1.context.fill();
				numberOfRays = 3;
				if(numberOfRays>1){
					angleOffset = 0;
					angleOfRay = players[i].headlight.angle / (numberOfRays*2-1);
					for (var j = numberOfRays - 1; j >= 0; j--) {
						angleOffset = j * players[i].headlight.angle / (numberOfRays*2-1) * 2;
						self.layer1.context.beginPath();
						self.layer1.context.moveTo(players[i].position.x + self.perspectiveOffset.x, players[i].position.y + self.perspectiveOffset.y);
						self.layer1.context.arc(players[i].position.x + self.perspectiveOffset.x, players[i].position.y + self.perspectiveOffset.y, players[i].headlight.range, players[i].direction*Math.PI/4-Math.PI/2-players[i].headlight.angle/2 + angleOffset, players[i].direction*Math.PI/4-Math.PI/2-players[i].headlight.angle/2 + angleOffset + angleOfRay);
						self.layer1.context.moveTo(players[i].position.x + self.perspectiveOffset.x, players[i].position.y + self.perspectiveOffset.y);
						self.layer1.context.closePath();
						self.layer1.context.fillStyle=_spotLightGradient;
						self.layer1.context.fill();
					}
				}
			}
			
		}
  		//var fullCanvasPath = new Path2D();
  		//radial darkness
  		var _radialLightGradient=self.layer1.context.createRadialGradient(self.layer1.context.canvas.width/2,self.layer1.context.canvas.height/2,0,self.layer1.context.canvas.width/2,self.layer1.context.canvas.height/2,1000);
		_radialLightGradient.addColorStop(0,"rgba(0, 0, 0, " + darkness +")");
  		_radialLightGradient.addColorStop(1,"#000");
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
				_spotLightGradient.addColorStop(0,"rgba(0, 0, 0, " + 1*players[i].headlight.intensity +")");
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