var gameCore = function(isServer,io){
	this.runningOnServer = isServer;
	this.runningOnClient = !isServer;
	this.players = [];
	this.start = function(){

		//polyfill for requestAnimationFrame (stole this from threeJs)
		var addAnimationMethode = require('./addAnimationMethode.js');
		addAnimationMethode(this.runningOnServer);

		console.log("'gameCore' started");
		console.log("Is this instance running on the server? : " + this.runningOnServer);

		if(this.runningOnServer){//if this instance of the game is running on the server
			
			//listen to connection & disconnection of players
			this.connectionBroadcast = require('./server-modules/connectionBroadcast.js');
			this.connectionBroadcast.listen(io,this.players);
			//listen to input of players
			this.iterfaceBroadcast = require('./server-modules/iterfaceBroadcast.js');
			this.iterfaceBroadcast.listen(io,this.players);
		}

		if(this.runningOnClient){ //if this instance of the game is running on the client
			
			//handle client input
			this.inputInterface = require('./client-modules/inputInterface.js');
		}

		//start the gameloop
		this.updateLoop();

	};//gameCore.start
	this.updateLoop = function(t) {
		
		//Work out the delta time
	    this.dt = this.lastframetime ? ( (t - this.lastframetime)/1000.0) : 0.016;
	    
	    //Store the last frame time
	    this.lastframetime = t;
	    
	    //Update the game specifics
	    //console.log(this.updateid);
	    //console.log(this.players.length);
	    
	    //schedule the next update
	    this.updateid = window.requestAnimationFrame( this.updateLoop.bind(this), this.viewport );

	}; //gameCore.updateLoop
}

if (typeof(module) !== 'undefined') module.exports = gameCore;