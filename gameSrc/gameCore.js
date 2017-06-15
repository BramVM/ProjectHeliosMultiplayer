var updatePackage = function(players,fresh){
	this.players = players;
	this.fresh = fresh;
};
var gameCore = function(isServer,io){
	this.runningOnServer = isServer;
	this.runningOnClient = !isServer;
	this.players = [];
	this.connectionBroadcast = require('./server-modules/connectionBroadcast.js');
	this.start = function(){

		//polyfill for requestAnimationFrame (stole this from threeJs)
		var addAnimationMethode = require('./addAnimationMethode.js');
		addAnimationMethode(this.runningOnServer);

		console.log("'gameCore' started");
		console.log("Is this instance running on the server? : " + this.runningOnServer);

		if(this.runningOnServer){//if this instance of the game is running on the server
			
			//listen to connection & disconnection of players
			this.connectionBroadcast.listenToClients(io);
		}

		if(this.runningOnClient){ //if this instance of the game is running on the client
			this.clientSocket = io();
			//handle client input
			this.inputInterface = require('./client-modules/inputInterface.js');
			this.inputInterface.start(this.clientSocket);
			//listen to connection & disconnection of players
			this.connectionBroadcast.listenToServer(this.clientSocket);

			this.viewport = document.getElementById("viewport");
			this.context = viewport.getContext("2d");


			

			
		    /*var renderer = new THREE.WebGLRenderer({
				antialias   : true, // to get smoother output
				preserveDrawingBuffer : true  // to allow screenshot
			});
		    renderer.setPixelRatio( window.devicePixelRatio );
		    renderer.setSize( window.innerWidth, window.innerHeight );
		    this.viewport.appendChild( renderer.domElement );
		    //cam
		    camera = new THREE.PerspectiveCamera( 33, window.innerWidth / window.innerHeight, 1, 10000 );
		    camera.position.z = 2500;
		    console.log(renderer.info);*/

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
	    this.players = this.connectionBroadcast.players;

	    
		if(this.runningOnClient) {
			//get players update package
			if(this.connectionBroadcast.updatePackage.fresh){
				this.players = this.connectionBroadcast.getUpdatePackage().players;
				console.log(this.players.length);
			}
		}

	    //console.log(this.updateid);
	    if(this.runningOnClient){
	    	this.context.clearRect(0, 0, 1000, 1000);
		    for (var i = this.players.length - 1; i >= 0; i--) {
				_player = this.players[i];
				if(_player.movement) _player.position.x = _player.position.x + 1;
				this.context.rect(_player.position.x,_player.position.y,10,10);
				this.context.stroke();
			}
		}

		
		if(this.runningOnServer) {
			//sent update package to players
			_updatePackage = new updatePackage(this.players,true);
			this.connectionBroadcast.sentUpdatePackage(io,_updatePackage);
		}
	    
	    //schedule the next update
	    this.updateid = window.requestAnimationFrame( this.updateLoop.bind(this), this.viewport );

	}; //gameCore.updateLoop
}

if (typeof(module) !== 'undefined') module.exports = gameCore;