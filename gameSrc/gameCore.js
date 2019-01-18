//services
var worldGeneratorService = require('./services/worldGeneratorService.js');
var inputInterfaceService = require('./services/clientonly/inputInterfaceService.js');
var canvasDrawingService = require('./services/clientonly/canvasDrawingService.js');
var ioConnectionService = require('./services/ioConnectionService.js');
var modService = require('./services/modService.js');
//classes
var color = require("./classes/color.js");
var cord = require("./classes/cord.js");
var player = require("./classes/player.js");
var spotLight = require("./classes/spotLight.js");
var logicPackage = require("./classes/logicPackage.js");
//var visualsPackage = require("./classes/visualsPackage.js");
//instantiate services
var _worldGeneratorService = new worldGeneratorService(cord);
var _ioConnectionService = new ioConnectionService(player,logicPackage);
var _inputInterfaceService = new inputInterfaceService();
var _canvasDrawingService = new canvasDrawingService(cord);

var gameCore = function(isServer,io){
	var self = this;
	this.services = {
		worldGeneratorService : _worldGeneratorService,
		ioConnectionService : _ioConnectionService,
		inputInterfaceService : _inputInterfaceService,
		canvasDrawingService : _canvasDrawingService
	};
	this.runningOnServer = isServer;
	this.runningOnClient = !isServer;
	this.logicPackage = new logicPackage();
	this.start = function(){

		//polyfill for requestAnimationFrame (stole this from threeJs)
		var addAnimationMethode = require('./addAnimationMethode.js');
		addAnimationMethode(this.runningOnServer);

		console.log("'gameCore' started");
		console.log("Is this instance running on the server? : " + this.runningOnServer);

		if(this.runningOnServer){//if this instance of the game is running on the server
			//listen to io stream for updates sent by clients
			this.services.ioConnectionService.listenToClients(io);
		}

		if(this.runningOnClient){ //if this instance of the game is running on the client
			//handle client input
			this.clientSocket = io();
			//this.services.inputInterfaceService.userId
			this.services.inputInterfaceService.start(this.clientSocket);
			//listen to server for update packages
			this.services.ioConnectionService.listenToServer(this.clientSocket);
			//prepare canvas
			
			this.services.canvasDrawingService = _canvasDrawingService
			this.services.canvasDrawingService.start(document.getElementById("layer1"),document.getElementById("layer2"));
		}

		this.services.modService = new modService(self);

		//start the gameloop
		this.updateLoop();

	};//gameCore.start
	this.updateLoop = function(t) {
		
		//Work out the delta time
	    this.dt = this.lastframetime ? ( (t - this.lastframetime)/1000) : 0.01666;
	    //Store the last frame time
	    this.lastframetime = t;
	    
		if(this.runningOnClient) {
			//check for new update package and apply
			this.services.ioConnectionService.getLogicPackage();
			//get local input and instantly apply userinterface vaiables
			_players = this.services.ioConnectionService.players;
			for (var i = _players.length - 1; i >= 0; i--) {
				if(_players[i].id === this.services.inputInterfaceService.userId){ //find current player
					_players[i].direction = this.services.inputInterfaceService.direction;
					_players[i].movement = this.services.inputInterfaceService.movement;
					this.currentPlayer = _players[i];
				}
			}
			this.services.ioConnectionService.players = _players;
		}

		//game logic goes here
		for (var i = this.services.ioConnectionService.players.length - 1; i >= 0; i--) {
			var player = this.services.ioConnectionService.players[i];
			var _angle = player.direction*Math.PI/4-Math.PI/2

			if(player.poweringUp>100) {
				if(player.movement){
					player.speed = player.speed + player.acceleration
					if (player.speed>player.topSpeed){
						player.speed=player.topSpeed
					}
				}
				else{
					player.speed = player.speed - player.acceleration
					if (player.speed<0){
						player.speed=0
					}
				}
			}
			player.position.moveByDistanceAndAngle(player.speed*this.dt,_angle);
			if(player.poweringUp<100) {
				player.poweringUp = player.poweringUp+3;
			};
		}
		//allow mods so adjust gameState package
		this.services.modService.updateLogicPackage();
	    //draw visuals
	    if(this.runningOnClient && this.currentPlayer){
	    	//create datapackage for visuals
	    	//draw visuals
	    	if (this.currentPlayer) this.services.canvasDrawingService.setPlayerPerspective(this.currentPlayer);
	    	this.services.canvasDrawingService.clear();
				this.services.canvasDrawingService.drawBackground();
				
				_pos = new cord(-2000,1000);
				this.services.canvasDrawingService.drawRainbow(_pos,5000);
				_pos = new cord(1000,-2000);
				this.services.canvasDrawingService.drawRings(_pos,5000);
				// _pos = new cord(0,0);
				// this.services.canvasDrawingService.drawPlanet(_pos,200);
				this.services.canvasDrawingService.drawDarkness(this.services.ioConnectionService.players,0);
				this.services.canvasDrawingService.drawPlayers(this.services.ioConnectionService.players);
	    	//
	    	this.services.worldGeneratorService.generateTilesOnPlayer(this.currentPlayer.position);
	    	this.services.canvasDrawingService.drawWorld(this.services.worldGeneratorService.tiles, this.services.worldGeneratorService.gridSize);
	    	//console.log('draw '+ this.services.ioConnectionService.players.length + ' players');
		}

		
		if(this.runningOnServer) {
			//create and send new update package to clients
			this.services.ioConnectionService.sentLogicPackage(io);
		}
	    
	    //schedule the next update
	    this.updateid = window.requestAnimationFrame( this.updateLoop.bind(this), this.viewport );

	}; //gameCore.updateLoop
}

if (typeof(module) !== 'undefined') module.exports = gameCore;