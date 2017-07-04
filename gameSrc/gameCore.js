
var gameCore = function(isServer,io){
	this.runningOnServer = isServer;
	this.runningOnClient = !isServer;
	this.ioConnectionService = require('./services/ioConnectionService.js');
	this.start = function(){

		//polyfill for requestAnimationFrame (stole this from threeJs)
		var addAnimationMethode = require('./addAnimationMethode.js');
		addAnimationMethode(this.runningOnServer);

		console.log("'gameCore' started");
		console.log("Is this instance running on the server? : " + this.runningOnServer);

		if(this.runningOnServer){//if this instance of the game is running on the server
			//listen to io stream for updates sent by clients
			this.ioConnectionService.listenToClients(io);
		}

		if(this.runningOnClient){ //if this instance of the game is running on the client
			//handle client input
			var inputInterfaceService = require('./services/clientonly/inputInterfaceService.js');
			this.inputInterfaceService = new inputInterfaceService();
			this.clientSocket = io();
			//this.inputInterfaceService.userId
			this.inputInterfaceService.start(this.clientSocket);
			//listen to server for update packages
			this.ioConnectionService.listenToServer(this.clientSocket);
			//prepare canvas
			var canvasDrawingService = require('./services/clientonly/canvasDrawingService.js');
			this.canvasDrawingService = new canvasDrawingService();
			this.canvasDrawingService.start(document.getElementById("layer1"),document.getElementById("layer2"));
		}

		//start the gameloop
		this.updateLoop();

	};//gameCore.start
	this.updateLoop = function(t) {
		
		//Work out the delta time
	    this.dt = this.lastframetime ? ( (t - this.lastframetime)/1000) : 0.01666;
	    //Store the last frame time
	    this.lastframetime = t;
	    
		if(this.runningOnClient) {
			//check for new update package and aply
			this.ioConnectionService.getUpdatePackage();
			//get local input and instantly apply userinterface vaiables
			_players = this.ioConnectionService.players;
			for (var i = _players.length - 1; i >= 0; i--) {
				if(_players[i].id === this.inputInterfaceService.userId){ //find current player
					_players[i].direction = this.inputInterfaceService.direction;
					_players[i].movement = this.inputInterfaceService.movement;
					this.currentPlayer = _players[i];
				}
			}
			this.ioConnectionService.players = _players;
		}

		//game logic (is run on all instances)
		for (var i = this.ioConnectionService.players.length - 1; i >= 0; i--) {
			var _angle = this.ioConnectionService.players[i].direction*Math.PI/4-Math.PI/2
			if(this.ioConnectionService.players[i].movement) this.ioConnectionService.players[i].position.moveByDistanceAndAngle(75*this.dt,_angle);
		}

	    //draw visuals
	    if(this.runningOnClient && this.currentPlayer){
	    	if (this.currentPlayer) this.canvasDrawingService.setPlayerPerspective(this.currentPlayer);
	    	this.canvasDrawingService.clear();
	    	this.canvasDrawingService.drawBackground();
	    	_pos = {x:0,y:0};
	    	this.canvasDrawingService.drawPlanet(_pos,100);
	    	this.canvasDrawingService.drawRandomShape(this.currentPlayer);
	    	this.canvasDrawingService.drawPlayers(this.ioConnectionService.players);
	    	this.canvasDrawingService.drawDarkness(this.ioConnectionService.players);
	    	//console.log('draw '+ this.ioConnectionService.players.length + ' players');
		}

		
		if(this.runningOnServer) {
			//create and send new update package to clients
			this.ioConnectionService.sentUpdatePackage(io);
		}
	    
	    //schedule the next update
	    this.updateid = window.requestAnimationFrame( this.updateLoop.bind(this), this.viewport );

	}; //gameCore.updateLoop
}

if (typeof(module) !== 'undefined') module.exports = gameCore;