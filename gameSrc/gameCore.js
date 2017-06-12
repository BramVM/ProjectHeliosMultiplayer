
var addAnimationMethode = function(onServer){
	//creates requestAnimationFrame methode for window when missing
	var frame_time = 60/1000; // run the local game at 16ms/ 60hz
	if(onServer === true) frame_time = 45; //on server we run at 45ms, 22hz
	( function () {

	    var lastTime = 0;
	    var vendors = [ 'ms', 'moz', 'webkit', 'o' ];

	    for ( var x = 0; x < vendors.length && !window.requestAnimationFrame; ++ x ) {
	        window.requestAnimationFrame = window[ vendors[ x ] + 'RequestAnimationFrame' ];
	        window.cancelAnimationFrame = window[ vendors[ x ] + 'CancelAnimationFrame' ] || window[ vendors[ x ] + 'CancelRequestAnimationFrame' ];
	    }

	    if ( !window.requestAnimationFrame ) {
	        window.requestAnimationFrame = function ( callback, element ) {
	            var currTime = Date.now(), timeToCall = Math.max( 0, frame_time - ( currTime - lastTime ) );
	            var id = window.setTimeout( function() { callback( currTime + timeToCall ); }, timeToCall );
	            lastTime = currTime + timeToCall;
	            return id;
	        };
	    }

	    if ( !window.cancelAnimationFrame ) {
	        window.cancelAnimationFrame = function ( id ) { clearTimeout( id ); };
	    }

	}() );
}


var gameCore = function(isServer,io){
	this.onServer = isServer;
	this.start = function(){
		console.log("'gameCore' started");
		console.log("Is this instance running on the server? : " + this.onServer);
		if(this.onServer){
			io.on('connection', function(socket){
			  console.log('a user connected ' + socket.id);
				//client.send(client.id); 
			  //io.sockets.connected(socket.id).emit('create id', socket.id);
			  socket.on('disconnect', function(){
			    console.log('user disconnected');
			  });

			  socket.on('direction change', function(direction, userId){
			    console.log('direction ' + direction);
			    io.emit('direction change', direction, userId);
			  });

			});

			io.on('connection', function(socket){
			  socket.on('direction change', function(direction, userId){
			    console.log('direction ' + direction);
			    io.emit('direction change', direction, userId);
			  });
			});
		}
		//polyfill requestAnimationFrame
		addAnimationMethode(this.onServer);
		//gather client input
		if(!this.onServer){
			this.inputInterface = require('./inputInterface.js');
		}
		//gameloop
		this.update();
	};//gameCore.start
	this.update = function(t) {
		//Work out the delta time
	    this.dt = this.lastframetime ? ( (t - this.lastframetime)/1000.0) : 0.016;
	    //Store the last frame time
	    this.lastframetime = t;
	    //Update the game specifics
	    //console.log(this.updateid);
	    //schedule the next update
	    this.updateid = window.requestAnimationFrame( this.update.bind(this), this.viewport );
	}; //gameCore.update
}





if (typeof(module) !== 'undefined') module.exports = gameCore;
