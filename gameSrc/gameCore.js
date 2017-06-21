

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
			this.viewport = document.getElementById("viewport");
			this.context = this.viewport.getContext("2d");
			this.context.canvas.width  = window.innerWidth;
  			this.context.canvas.height = window.innerHeight;
		}

		//start the gameloop
		this.updateLoop();

	};//gameCore.start
	this.updateLoop = function(t) {
		
		//Work out the delta time
	    this.dt = this.lastframetime ? ( (t - this.lastframetime)/1000) : 0.01666;
	    //Store the last frame time
	    this.lastframetime = t;
	    
	    //Update the game specifics
	    //console.log(this.dt);
		if(this.runningOnClient) {
			//get local userinterface vaiables
			_players = this.connectionBroadcast.players;
			for (var i = _players.length - 1; i >= 0; i--) {
				if(_players[i].id === this.inputInterface.userId){
					_players[i].direction = this.inputInterface.direction;
					_players[i].movement = this.inputInterface.movement;
				}
				if(_players[i].movement) _players[i].position.x = _players[i].position.x + 75*this.dt;
			}
			this.connectionBroadcast.players = _players;

			//get players update package
			if(this.connectionBroadcast.bufferedUpdatePackage.fresh){
				this.connectionBroadcast.getUpdatePackage();
				//console.log(this.players[0].position.x);
			}
		}

		if(this.runningOnServer) {
			for (var i = this.connectionBroadcast.players.length - 1; i >= 0; i--) {
				if(this.connectionBroadcast.players[i].movement) this.connectionBroadcast.players[i].position.x = this.connectionBroadcast.players[i].position.x + 75*this.dt;
			}
		}
	    //console.log(this.updateid);
	    
	    if(this.runningOnClient){

	    	//draw visuals
	    	this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
	    	this.context.beginPath();
		    this.context.closePath();
	    	//console.log('draw '+ this.connectionBroadcast.players.length + ' players');
		    for (var i = this.connectionBroadcast.players.length - 1; i >= 0; i--) {
				this.context.rect(this.connectionBroadcast.players[i].position.x,this.connectionBroadcast.players[i].position.y,10,10);
				this.context.stroke();
			}

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