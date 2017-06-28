

var updatePackage = function(players,fresh){
	this.players = players;
	this.fresh = fresh;
};
var gameCore = function(isServer,io){
	this.runningOnServer = isServer;
	this.runningOnClient = !isServer;
	this.connectionBroadcast = require('./server-modules/connectionBroadcast.js');
	this.start = function(){

		//polyfill for requestAnimationFrame (stole this from threeJs)
		var addAnimationMethode = require('./addAnimationMethode.js');
		addAnimationMethode(this.runningOnServer);

		console.log("'gameCore' started");
		console.log("Is this instance running on the server? : " + this.runningOnServer);

		if(this.runningOnServer){//if this instance of the game is running on the server
			//
			this.connectionBroadcast.listenToClients(io);
		}

		if(this.runningOnClient){ //if this instance of the game is running on the client
			//handle client input
			var inputInterface = require('./client-modules/inputInterface.js');
			this.inputInterface = new inputInterface();
			this.clientSocket = io();
			//this.inputInterface.userId
			this.inputInterface.start(this.clientSocket);
			//listen to connection & disconnection of players
			this.connectionBroadcast.listenToServer(this.clientSocket);
			//prepare canvas
			var canvasInterface = require('./client-modules/canvasInterface.js');
			this.canvasInterface = new canvasInterface();
			this.canvasInterface.start(document.getElementById("viewport"));
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
			this.connectionBroadcast.getUpdatePackage();
			//get local and instantly apply userinterface vaiables
			_players = this.connectionBroadcast.players;
			for (var i = _players.length - 1; i >= 0; i--) {
				if(_players[i].id === this.inputInterface.userId){ //find current player
					_players[i].direction = this.inputInterface.direction;
					_players[i].movement = this.inputInterface.movement;
					this.currentPlayer = _players[i];
				}
			}
			this.connectionBroadcast.players = _players;
		}

		//game logic (is run on all instances)
		for (var i = this.connectionBroadcast.players.length - 1; i >= 0; i--) {
			var _angle = this.connectionBroadcast.players[i].direction*Math.PI/4-Math.PI/2
			if(this.connectionBroadcast.players[i].movement) this.connectionBroadcast.players[i].position.moveByDistanceAndAngle(75*this.dt,_angle);
		}

		//if there is a new update package ready overwrite gamestate using the package
		if(this.runningOnClient) {
			
		}

	    //draw visuals
	    if(this.runningOnClient && this.currentPlayer){
	    	if (this.currentPlayer) this.canvasInterface.setPlayerPerspective(this.currentPlayer);
	    	this.canvasInterface.clear();
	    	this.canvasInterface.backGround();
	    	this.canvasInterface.drawPlayers(this.connectionBroadcast.players);
	    	//console.log('draw '+ this.connectionBroadcast.players.length + ' players');
		}

		
		if(this.runningOnServer) {
			//sent update package to players
			this.connectionBroadcast.sentUpdatePackage(io);
		}
	    
	    //schedule the next update
	    this.updateid = window.requestAnimationFrame( this.updateLoop.bind(this), this.viewport );

	}; //gameCore.updateLoop
}

if (typeof(module) !== 'undefined') module.exports = gameCore;