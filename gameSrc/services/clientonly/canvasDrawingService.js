var seedrandom = require('seedrandom');

var canvasInterface = function (cord) {
	this.classes = {
		cord : cord
	}
	var self = this;
	this.layer1 = {};
	this.layer1.context = {};
	this.layer2 = {};
	this.layer2.context = {};
	this.perspectiveOffset = new this.classes.cord();
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
		self.perspectiveOffset = new this.classes.cord(player.position.x, player.position.y);
		self.perspectiveOffset.x = window.innerWidth/2 - self.perspectiveOffset.x;
		self.perspectiveOffset.y = window.innerHeight/2 - self.perspectiveOffset.y
		console.log(self.perspectiveOffset.x);
	}
	this.drawPlayers = function(players){
		for (var i = players.length - 1; i >= 0; i--) {
			self.layer2.context.save()
			self.layer2.context.translate(players[i].position.x + self.perspectiveOffset.x, players[i].position.y + self.perspectiveOffset.y);
			self.layer2.context.rotate(players[i].direction*Math.PI/4);
			bowPoint = new this.classes.cord(0,-33);
			var scale = 0.25;
			self.layer2.context.beginPath();
			self.layer2.context.moveTo(bowPoint.x, bowPoint.y)
			self.layer2.context.bezierCurveTo(bowPoint.x+18*scale, bowPoint.y, bowPoint.x+26*scale, bowPoint.y+12*scale, bowPoint.x+36*scale, bowPoint.y+31*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x+96*scale, bowPoint.y+41*scale, bowPoint.x+222*scale, bowPoint.y+46*scale, bowPoint.x+250*scale, bowPoint.y+85*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x+256*scale, bowPoint.y+90*scale, bowPoint.x+270*scale, bowPoint.y+102*scale, bowPoint.x+286*scale, bowPoint.y+117*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x+285*scale, bowPoint.y+118*scale, bowPoint.x+269*scale, bowPoint.y+137*scale, bowPoint.x+237*scale, bowPoint.y+137*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x+226*scale, bowPoint.y+137*scale, bowPoint.x+208*scale, bowPoint.y+125*scale, bowPoint.x+187*scale, bowPoint.y+111*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x+152*scale, bowPoint.y+88*scale, bowPoint.x+104*scale, bowPoint.y+57*scale, bowPoint.x+48*scale, bowPoint.y+57*scale);
			self.layer2.context.lineTo(bowPoint.x+48*scale, bowPoint.y+67*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x+101*scale, bowPoint.y+67*scale, bowPoint.x+146*scale, bowPoint.y+96*scale, bowPoint.x+182*scale, bowPoint.y+120*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x+204*scale, bowPoint.y+135*scale, bowPoint.x+222*scale, bowPoint.y+147*scale, bowPoint.x+237*scale, bowPoint.y+147*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x+271*scale, bowPoint.y+147*scale, bowPoint.x+290*scale, bowPoint.y+127*scale, bowPoint.x+293*scale, bowPoint.y+124*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x+345*scale, bowPoint.y+175*scale, bowPoint.x+420*scale, bowPoint.y+256*scale, bowPoint.x+395*scale, bowPoint.y+279*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x+390*scale, bowPoint.y+282*scale, bowPoint.x+381*scale, bowPoint.y+283*scale, bowPoint.x+369*scale, bowPoint.y+282*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x+351*scale, bowPoint.y+269*scale, bowPoint.x+184*scale, bowPoint.y+176*scale, bowPoint.x+153*scale, bowPoint.y+176*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x+138*scale, bowPoint.y+176*scale, bowPoint.x+118*scale, bowPoint.y+188*scale, bowPoint.x+92*scale, bowPoint.y+211*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x+73*scale, bowPoint.y+229*scale, bowPoint.x+56*scale, bowPoint.y+250*scale, bowPoint.x+56*scale, bowPoint.y+250*scale);
			self.layer2.context.lineTo(bowPoint.x+51*scale, bowPoint.y+251*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x+41*scale, bowPoint.y+295*scale, bowPoint.x+22*scale, bowPoint.y+290*scale, bowPoint.x+0*scale, bowPoint.y+290*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x-22*scale, bowPoint.y+290*scale, bowPoint.x-41*scale, bowPoint.y+295*scale, bowPoint.x-51*scale, bowPoint.y+251*scale);
			self.layer2.context.lineTo(bowPoint.x-56*scale, bowPoint.y+250*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x-56*scale, bowPoint.y+250*scale, bowPoint.x-73*scale, bowPoint.y+229*scale, bowPoint.x-92*scale, bowPoint.y+211*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x-118*scale, bowPoint.y+188*scale, bowPoint.x-138*scale, bowPoint.y+176*scale, bowPoint.x-153*scale, bowPoint.y+176*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x-184*scale, bowPoint.y+176*scale, bowPoint.x-351*scale, bowPoint.y+269*scale, bowPoint.x-369*scale, bowPoint.y+282*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x-381*scale, bowPoint.y+283*scale, bowPoint.x-390*scale, bowPoint.y+282*scale, bowPoint.x-395*scale, bowPoint.y+279*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x-420*scale, bowPoint.y+256*scale, bowPoint.x-345*scale, bowPoint.y+175*scale, bowPoint.x-293*scale, bowPoint.y+124*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x-290*scale, bowPoint.y+127*scale, bowPoint.x-271*scale, bowPoint.y+147*scale, bowPoint.x-237*scale, bowPoint.y+147*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x-222*scale, bowPoint.y+147*scale, bowPoint.x-204*scale, bowPoint.y+135*scale, bowPoint.x-182*scale, bowPoint.y+120*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x-146*scale, bowPoint.y+96*scale, bowPoint.x-101*scale, bowPoint.y+67*scale, bowPoint.x-48*scale, bowPoint.y+67*scale);
			self.layer2.context.lineTo(bowPoint.x-48*scale, bowPoint.y+57*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x-104*scale, bowPoint.y+57*scale, bowPoint.x-152*scale, bowPoint.y+88*scale, bowPoint.x-187*scale, bowPoint.y+111*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x-208*scale, bowPoint.y+125*scale, bowPoint.x-226*scale, bowPoint.y+137*scale, bowPoint.x-237*scale, bowPoint.y+137*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x-269*scale, bowPoint.y+137*scale, bowPoint.x-285*scale, bowPoint.y+118*scale, bowPoint.x-286*scale, bowPoint.y+117*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x-270*scale, bowPoint.y+102*scale, bowPoint.x-256*scale, bowPoint.y+90*scale, bowPoint.x-250*scale, bowPoint.y+85*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x-222*scale, bowPoint.y+46*scale, bowPoint.x-96*scale, bowPoint.y+41*scale, bowPoint.x-36*scale, bowPoint.y+31*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x-26*scale, bowPoint.y+12*scale, bowPoint.x-18*scale, bowPoint.y, bowPoint.x, bowPoint.y);
			self.layer2.context.fillStyle = "rgba(0, 0, 0, 1)";
			self.layer2.context.fill();
			self.layer2.context.closePath();

			self.layer2.context.shadowBlur = 5;
			var accelerator = 0
			if(players[i].poweringUp>0) accelerator=Math.sin(players[i].poweringUp/100*Math.PI/2);
			var power = (1+Math.sin(accelerator*Math.PI*5-0.5*Math.PI))/2
			if(players[i].poweringUp<100&&power*Math.random()<0.5) power = 0;
			// if(players[i].poweringUp<70) power = power*Math.random();
			self.layer2.context.shadowColor = "rgba(200, 230, 255, "+power+")";
			self.layer2.context.fillStyle = "rgba(200, 230, 255, "+power+")";
			self.layer2.context.beginPath();
			self.layer2.context.moveTo(bowPoint.x+286*scale, bowPoint.y+117*scale)
			self.layer2.context.bezierCurveTo(bowPoint.x+285*scale, bowPoint.y+118*scale, bowPoint.x+269*scale, bowPoint.y+137*scale, bowPoint.x+237*scale, bowPoint.y+137*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x+226*scale, bowPoint.y+137*scale, bowPoint.x+208*scale, bowPoint.y+125*scale, bowPoint.x+187*scale, bowPoint.y+111*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x+152*scale, bowPoint.y+88*scale, bowPoint.x+104*scale, bowPoint.y+57*scale, bowPoint.x+48*scale, bowPoint.y+57*scale);
			self.layer2.context.lineTo(bowPoint.x+48*scale, bowPoint.y+67*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x+101*scale, bowPoint.y+67*scale, bowPoint.x+146*scale, bowPoint.y+96*scale, bowPoint.x+182*scale, bowPoint.y+120*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x+204*scale, bowPoint.y+135*scale, bowPoint.x+222*scale, bowPoint.y+147*scale, bowPoint.x+237*scale, bowPoint.y+147*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x+271*scale, bowPoint.y+147*scale, bowPoint.x+290*scale, bowPoint.y+127*scale, bowPoint.x+293*scale, bowPoint.y+124*scale);
			self.layer2.context.lineTo(bowPoint.x+286*scale, bowPoint.y+117*scale);
			self.layer2.context.fill();
			self.layer2.context.closePath();
			self.layer2.context.beginPath();
			self.layer2.context.moveTo(bowPoint.x-293*scale, bowPoint.y+124*scale)
			self.layer2.context.bezierCurveTo(bowPoint.x-290*scale, bowPoint.y+127*scale, bowPoint.x-271*scale, bowPoint.y+147*scale, bowPoint.x-237*scale, bowPoint.y+147*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x-222*scale, bowPoint.y+147*scale, bowPoint.x-204*scale, bowPoint.y+135*scale, bowPoint.x-182*scale, bowPoint.y+120*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x-146*scale, bowPoint.y+96*scale, bowPoint.x-101*scale, bowPoint.y+67*scale, bowPoint.x-48*scale, bowPoint.y+67*scale);
			self.layer2.context.lineTo(bowPoint.x-48*scale, bowPoint.y+57*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x-104*scale, bowPoint.y+57*scale, bowPoint.x-152*scale, bowPoint.y+88*scale, bowPoint.x-187*scale, bowPoint.y+111*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x-208*scale, bowPoint.y+125*scale, bowPoint.x-226*scale, bowPoint.y+137*scale, bowPoint.x-237*scale, bowPoint.y+137*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x-269*scale, bowPoint.y+137*scale, bowPoint.x-285*scale, bowPoint.y+118*scale, bowPoint.x-286*scale, bowPoint.y+117*scale);
			self.layer2.context.lineTo(bowPoint.x-293*scale, bowPoint.y+124*scale)
			self.layer2.context.fill();
			self.layer2.context.closePath();
			self.layer2.context.beginPath();
			self.layer2.context.moveTo(bowPoint.x+51*scale, bowPoint.y+77*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x+68*scale, bowPoint.y+95*scale, bowPoint.x+77*scale, bowPoint.y+114*scale, bowPoint.x+77*scale, bowPoint.y+134*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x+77*scale, bowPoint.y+153*scale, bowPoint.x+70*scale, bowPoint.y+170*scale, bowPoint.x+58*scale, bowPoint.y+183*scale);
			self.layer2.context.lineTo(bowPoint.x+59*scale, bowPoint.y+165*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x+64*scale, bowPoint.y+156*scale, bowPoint.x+67*scale, bowPoint.y+145*scale, bowPoint.x+67*scale, bowPoint.y+134*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x+67*scale, bowPoint.y+121*scale, bowPoint.x+62*scale, bowPoint.y+108*scale, bowPoint.x+55*scale, bowPoint.y+96*scale);
			self.layer2.context.lineTo(bowPoint.x+51*scale, bowPoint.y+77*scale);
			self.layer2.context.fill();
			self.layer2.context.closePath();
			self.layer2.context.beginPath();
			self.layer2.context.moveTo(bowPoint.x-51*scale, bowPoint.y+77*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x-68*scale, bowPoint.y+95*scale, bowPoint.x-77*scale, bowPoint.y+114*scale, bowPoint.x-77*scale, bowPoint.y+134*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x-77*scale, bowPoint.y+153*scale, bowPoint.x-70*scale, bowPoint.y+170*scale, bowPoint.x-58*scale, bowPoint.y+183*scale);
			self.layer2.context.lineTo(bowPoint.x-59*scale, bowPoint.y+165*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x-64*scale, bowPoint.y+156*scale, bowPoint.x-67*scale, bowPoint.y+145*scale, bowPoint.x-67*scale, bowPoint.y+134*scale);
			self.layer2.context.bezierCurveTo(bowPoint.x-67*scale, bowPoint.y+121*scale, bowPoint.x-62*scale, bowPoint.y+108*scale, bowPoint.x-55*scale, bowPoint.y+96*scale);
			self.layer2.context.lineTo(bowPoint.x-51*scale, bowPoint.y+77*scale);
			self.layer2.context.fill();
			self.layer2.context.closePath();
			self.layer2.context.beginPath();
			self.layer2.context.moveTo(bowPoint.x+275*scale, bowPoint.y+166*scale);
			self.layer2.context.lineTo(bowPoint.x+343*scale, bowPoint.y+225*scale);
			self.layer2.context.lineTo(bowPoint.x+336*scale, bowPoint.y+233*scale);
			self.layer2.context.lineTo(bowPoint.x+269*scale, bowPoint.y+174*scale);
			self.layer2.context.lineTo(bowPoint.x+275*scale, bowPoint.y+166*scale);
			self.layer2.context.fill();
			self.layer2.context.closePath();
			self.layer2.context.beginPath();
			self.layer2.context.moveTo(bowPoint.x-275*scale, bowPoint.y+166*scale);
			self.layer2.context.lineTo(bowPoint.x-343*scale, bowPoint.y+225*scale);
			self.layer2.context.lineTo(bowPoint.x-336*scale, bowPoint.y+233*scale);
			self.layer2.context.lineTo(bowPoint.x-269*scale, bowPoint.y+174*scale);
			self.layer2.context.lineTo(bowPoint.x-275*scale, bowPoint.y+166*scale);
			self.layer2.context.fill();
			self.layer2.context.closePath();
			self.layer2.context.restore();
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
		self.layer1.context.fillStyle="rgba(50,30,50,1)";
		self.layer1.context.fill();
		// Fill with gradient
		
	}
	this.drawStar = function(position,size){
		self.layer1.context.save() 
		//draw rings
		_ring = self.layer1.context.createRadialGradient(position.x + self.perspectiveOffset.x, position.y + self.perspectiveOffset.y,0,position.x + self.perspectiveOffset.x, position.y + self.perspectiveOffset.y,size/2);
		_ring.addColorStop(0,"rgba(255, 255, 255, 1)");
		// _ring.addColorStop(0.60,"transparent");
		// _ring.addColorStop(0.80,"rgba(255, 255, 255, 1)");
		_ring.addColorStop(1,"transparent");
		self.layer1.context.beginPath();
		self.layer1.context.arc(position.x + self.perspectiveOffset.x, position.y + self.perspectiveOffset.y, size/2, 0, 2 * Math.PI, false);
		self.layer1.context.fillStyle = _ring;
     	self.layer1.context.fill();
		self.layer1.context.closePath();
	}
	this.drawRainbow = function(position,size){
		self.layer1.context.save() 
		//draw rings
		_ring = self.layer1.context.createRadialGradient(position.x + self.perspectiveOffset.x, position.y + self.perspectiveOffset.y,0,position.x + self.perspectiveOffset.x, position.y + self.perspectiveOffset.y,size/2);
		_ring.addColorStop(0.98,"transparent");
		_ring.addColorStop(0.985,"rgba(0, 0, 255, 0.03)");
		_ring.addColorStop(0.99,"rgba(0, 255, 0, 0.03)");
		_ring.addColorStop(0.995,"rgba(255, 0, 0, 0.03)");
		_ring.addColorStop(1,"transparent");
		self.layer1.context.beginPath();
		self.layer1.context.arc(position.x + self.perspectiveOffset.x, position.y + self.perspectiveOffset.y, size/2, 0, 2 * Math.PI, false);
		self.layer1.context.fillStyle = _ring;
     	self.layer1.context.fill();
		self.layer1.context.closePath();
	}
	this.drawRings = function(position,size){
		self.layer1.context.save() 
		//draw rings
		self.layer1.context.lineWidth=20;
		self.layer1.context.beginPath();
		self.layer1.context.arc(position.x + self.perspectiveOffset.x, position.y + self.perspectiveOffset.y, size/2, 0, 2 * Math.PI, false);
			 self.layer1.context.strokeStyle = 'rgba(255,255,0,0.1)';
			 self.layer1.context.stroke();
		self.layer1.context.closePath();
		self.layer1.context.beginPath();
		self.layer1.context.arc(position.x + self.perspectiveOffset.x, position.y + self.perspectiveOffset.y, size/2-20, 0, 2 * Math.PI, false);
			 self.layer1.context.strokeStyle = 'rgba(255,0,0,0.1)';
			 self.layer1.context.stroke();
		self.layer1.context.closePath();
		self.layer1.context.beginPath();
		self.layer1.context.arc(position.x + self.perspectiveOffset.x, position.y + self.perspectiveOffset.y, size/2-40, 0, 2 * Math.PI, false);
			 self.layer1.context.strokeStyle = 'rgba(255,255,0,0.1)';
			 self.layer1.context.stroke();
		self.layer1.context.closePath();
		self.layer1.context.beginPath();
		self.layer1.context.arc(position.x + self.perspectiveOffset.x, position.y + self.perspectiveOffset.y, size/2-60, 0, 2 * Math.PI, false);
			self.layer1.context.strokeStyle = 'rgba(255,0,0,0.1)';
			 self.layer1.context.stroke();
		self.layer1.context.closePath();
		self.layer1.context.beginPath();
		self.layer1.context.arc(position.x + self.perspectiveOffset.x, position.y + self.perspectiveOffset.y, size/2-80, 0, 2 * Math.PI, false);
			 self.layer1.context.strokeStyle = 'rgba(255,255,0,0.1)';
			 self.layer1.context.stroke();
		self.layer1.context.closePath();
		self.layer1.context.restore();
	}
	this.drawPlanet = function(position,size){
		self.layer1.context.save();
		self.layer1.context.translate(position.x + self.perspectiveOffset.x, position.y + self.perspectiveOffset.y);
		self.layer1.context.rotate(60*Math.PI/180);
		//draw rings
		_ring = self.layer1.context.createRadialGradient( 0, 0, size/2, 0, 0, size/1.5);
		_ring.addColorStop(0.20,"transparent");
		_ring.addColorStop(0.40,"rgba(242, 0, 255, 0.2)");
		_ring.addColorStop(0.60,"transparent");
		_ring.addColorStop(0.80,"rgba(242, 0, 255, 0.2)");
		_ring.addColorStop(1,"transparent");
		self.layer1.context.beginPath();
		self.layer1.context.arc(0, 0, size, 0, 2 * Math.PI, false);
		self.layer1.context.fillStyle = _ring;
     	self.layer1.context.fill();
		self.layer1.context.closePath();
		//draw rings
		_atmosphere = self.layer1.context.createRadialGradient(0, 0,size/2,0, 0,size);
		_atmosphere.addColorStop(0,"rgba(242, 0, 255, 0.4)");
		_atmosphere.addColorStop(1,"transparent");
		self.layer1.context.beginPath();
		self.layer1.context.arc(0, 0, size, 0, 2 * Math.PI, false);
		self.layer1.context.fillStyle = _atmosphere;
     	self.layer1.context.fill();
		self.layer1.context.closePath();
		//draw base
		self.layer1.context.beginPath();
		self.layer1.context.arc(0, 0, size/2, 0, 2 * Math.PI, false);
		self.layer1.context.fillStyle = '#f200ff';
     	self.layer1.context.fill();
     	
		self.layer1.context.closePath();
		self.layer1.context.clip();
		//draw ornaments
		self.layer1.context.beginPath();
		self.layer1.context.arc(size, size, size*1.57, 0, 2 * Math.PI, false);
		self.layer1.context.strokeStyle = "rgba(0, 0, 0, 0.4)"
		self.layer1.context.lineWidth = size/3.8;
     	self.layer1.context.stroke();
		self.layer1.context.closePath();

		self.layer1.context.beginPath();
		self.layer1.context.arc(size, size, size*1.15, 0, 2 * Math.PI, false);
		self.layer1.context.strokeStyle = "rgba(0, 0, 0, 0.4)"
		self.layer1.context.lineWidth = size/5;
     	self.layer1.context.stroke();
		self.layer1.context.closePath();

		// var numberOfOrnaments = 50;
		// var minSize = size/8;
		// var maxSize = size/5;
		// var ornaments = [];
		// for (var i = 0; i < numberOfOrnaments; i++) {
		// 	Math.seedrandom("ornaments"+position.x+position.y+i);
		// 	ornaments.push({
		// 		size : minSize+Math.random()*(maxSize-minSize),
		// 		position : new this.classes.cord(0,0)
		// 	})
		// 	ornaments[ornaments.length-1].position.x = position.x-size/2+Math.random()*size;
		// 	ornaments[ornaments.length-1].position.y = position.y-size/2+Math.random()*size;		
		// 	Math.seedrandom();
		// 	//check if not colliding
		// 	if(ornaments.length==1){
		// 		this.drawRandomShape(ornaments[ornaments.length-1].position, ornaments[ornaments.length-1].size)
		// 	}
		// 	else{
		// 		var maydraw = true;
		// 		for (var j = 0; j < ornaments.length-1; j++) {
		// 			if (ornaments[ornaments.length-1].size+ornaments[j].size > Math.abs(ornaments[ornaments.length-1].position.distanceToPoint(ornaments[j].position))){
		// 				maydraw = false;
		// 			}
		// 		}
		// 		if(maydraw){
		// 			this.drawRandomShape(ornaments[ornaments.length-1].position, ornaments[ornaments.length-1].size)
		// 		}
		// 		else{
		// 				ornaments.splice(ornaments.length-1,1);
						
		// 		}
				
		// 	}	
			
		// }
		self.layer1.context.restore();
		//draw shadows
		_outlineShadow = self.layer1.context.createRadialGradient(position.x + self.perspectiveOffset.x, position.y + self.perspectiveOffset.y,size/4,position.x + self.perspectiveOffset.x, position.y + self.perspectiveOffset.y,size/4*3);
		_outlineShadow.addColorStop(0,"transparent");
		_outlineShadow.addColorStop(1,"rgba(0, 0, 0, 1)");
		self.layer1.context.beginPath();
		self.layer1.context.arc(position.x + self.perspectiveOffset.x, position.y + self.perspectiveOffset.y, size/2, 0, 2 * Math.PI, false);
		self.layer1.context.fillStyle = _outlineShadow;
     	self.layer1.context.fill();
		self.layer1.context.closePath();
		_ambientShadow = self.layer1.context.createRadialGradient(position.x + self.perspectiveOffset.x, position.y + self.perspectiveOffset.y,0,position.x + self.perspectiveOffset.x, position.y + self.perspectiveOffset.y,size/1.5);
		_ambientShadow.addColorStop(0,"transparent");
		_ambientShadow.addColorStop(1,"rgba(0, 0, 0, 0.5)");
		self.layer1.context.beginPath();
		self.layer1.context.arc(position.x + self.perspectiveOffset.x, position.y + self.perspectiveOffset.y, size/2, 0, 2 * Math.PI, false);
		self.layer1.context.fillStyle = _ambientShadow;
     	self.layer1.context.fill();
		self.layer1.context.closePath();
	}
	this.drawRandomShape = function(position, size){
		//var position = new this.classes.cord(player.position.x,player.position.y);
		/*self.layer1.context.beginPath();
		      self.layer1.context.arc(position.x, position.y, 2, 0, 2 * Math.PI, false);
		      self.layer1.context.fillStyle = 'red';
		      self.layer1.context.fill();
		      self.layer1.context.closePath();*/
		var minDistance = size/5;
		var numberOfPoints = 6
		self.layer1.context.beginPath();
		Math.seedrandom(""+String(position.x) + String(position.y));
		for (var i = 0; i < numberOfPoints; i++) {
			if(i!=0){
				bezierpoint1 = new this.classes.cord(prevPoint.x, prevPoint.y);
				bezierpoint1.moveByDistanceAndAngle(prevOffset/2,prevAngle+Math.PI/2);
				/*self.layer1.context.beginPath();
		      self.layer1.context.arc(bezierpoint1.x, bezierpoint1.y, 2, 0, 2 * Math.PI, false);
		      self.layer1.context.fillStyle = 'green';
		      self.layer1.context.fill();
		      self.layer1.context.closePath();*/
			}
			 
			calculatedPosition = new this.classes.cord(position.x, position.y);
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
				self.layer1.context.moveTo(calculatedPosition.x+self.perspectiveOffset.x, calculatedPosition.y+self.perspectiveOffset.y);
				firstpoint = calculatedPosition;
				firstAngle= prevAngle;
				firstOffset= prevOffset;
			}
			else{
				bezierpoint2 = new this.classes.cord(calculatedPosition.x, calculatedPosition.y);
				bezierpoint2.moveByDistanceAndAngle(prevOffset/2,prevAngle-Math.PI/2);
				 /*self.layer1.context.beginPath();
		      self.layer1.context.arc(bezierpoint2.x, bezierpoint2.y, 2, 0, 2 * Math.PI, false);
		      self.layer1.context.fillStyle = '#ffffff';
		      self.layer1.context.fill();
		      self.layer1.context.closePath();*/
				self.layer1.context.bezierCurveTo(bezierpoint1.x+self.perspectiveOffset.x, bezierpoint1.y+self.perspectiveOffset.y, bezierpoint2.x+self.perspectiveOffset.x, bezierpoint2.y+self.perspectiveOffset.y, calculatedPosition.x+self.perspectiveOffset.x, calculatedPosition.y+self.perspectiveOffset.y);
				//self.layer1.context.lineTo(calculatedPosition.x, calculatedPosition.y);
				
			}
			prevPoint = calculatedPosition;
		}
		bezierpoint1 = new this.classes.cord(calculatedPosition.x, calculatedPosition.y);
		bezierpoint1.moveByDistanceAndAngle(prevOffset/2,prevAngle+Math.PI/2);
		bezierpoint2 = new this.classes.cord(firstpoint.x, firstpoint.y);
		bezierpoint2.moveByDistanceAndAngle(firstOffset/2,firstAngle-Math.PI/2);
		self.layer1.context.bezierCurveTo(bezierpoint1.x+self.perspectiveOffset.x, bezierpoint1.y+self.perspectiveOffset.y, bezierpoint2.x+self.perspectiveOffset.x, bezierpoint2.y+self.perspectiveOffset.y, firstpoint.x+self.perspectiveOffset.x, firstpoint.y+self.perspectiveOffset.y);
		//self.layer1.context.lineTo(calculatedPosition.x, calculatedPosition.y);
		Math.seedrandom();
		self.layer1.context.fillStyle = "rgba(0, 0, 0, 0.5)";
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
				var accelerator = 0
				if(players[i].poweringUp>0) accelerator=Math.sin(players[i].poweringUp/100*Math.PI/2);
				var power = (1+Math.sin(accelerator*Math.PI*5-0.5*Math.PI))/2
				if(players[i].poweringUp<100&&power*Math.random()<0.5) power = 0;
				_spotLightGradient.addColorStop(0,"rgba(255, 232, 85, " + 0.15*players[i].headlight.intensity*power +")");
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
				var accelerator = 0
				if(players[i].poweringUp>0) accelerator=Math.sin(players[i].poweringUp/100*Math.PI/2);
				var power = (1+Math.sin(accelerator*Math.PI*5-0.5*Math.PI))/2
				if(players[i].poweringUp<100&&power*Math.random()<0.5) power = 0;
				self.layer2.context.beginPath();
				self.layer2.context.moveTo(players[i].position.x + self.perspectiveOffset.x, players[i].position.y + self.perspectiveOffset.y);
				self.layer2.context.arc(players[i].position.x + self.perspectiveOffset.x, players[i].position.y + self.perspectiveOffset.y, players[i].headlight.range, players[i].direction*Math.PI/4-Math.PI/2-players[i].headlight.angle/2, players[i].direction*Math.PI/4-Math.PI/2+players[i].headlight.angle/2);
				self.layer2.context.moveTo(players[i].position.x + self.perspectiveOffset.x, players[i].position.y + self.perspectiveOffset.y);
				self.layer2.context.closePath();
				_spotLightGradient=self.layer1.context.createRadialGradient(players[i].position.x + self.perspectiveOffset.x, players[i].position.y + self.perspectiveOffset.y,0,players[i].position.x + self.perspectiveOffset.x, players[i].position.y + self.perspectiveOffset.y,players[i].headlight.range);
				_spotLightGradient.addColorStop(0,"rgba(0, 0, 0, " + 1*players[i].headlight.intensity*power +")");
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