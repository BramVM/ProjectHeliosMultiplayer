(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var gameCore = require('./gameCore.js');

var gameInstance = new gameCore(false);
gameInstance.start();
},{"./gameCore.js":2}],2:[function(require,module,exports){

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

},{"./inputInterface.js":3}],3:[function(require,module,exports){
var socket = io();

console.log("start input interface");

//var socketIo = require('../node_modules/socket.io-client/dist/distsocket.io.js');

var arrows = {
	up:false,
	right:false,
	down:false,
	left:false
}

// key events
var onKeyDown = function ( event ) {
	switch ( event.keyCode ) {
	  case 38: // up
	  case 87: // w
	    arrows.up = true;
	    break;
	  case 37: // left
	  case 65: // a
	    arrows.left = true; break;
	  case 40: // down
	  case 83: // s
	    arrows.down = true;
	    break;
	  case 39: // right
	  case 68: // d
	    arrows.right = true;
	    break;
	  case 32: // space
	    
	    break;
	}
	socket.emit('direction change', arrows, socket.io.engine.id);
};

var onKeyUp = function ( event ) {
	switch( event.keyCode ) {
	  case 38: // up
	  case 87: // w
	    arrows.up = false;
	    break;
	  case 37: // left
	  case 65: // a
	    arrows.left = false;
	    break;
	  case 40: // down
	  case 83: // s
	    arrows.down = false;
	    break;
	  case 39: // right
	  case 68: // d
	    arrows.right = false;
	    break;
	}
	socket.emit('direction change', arrows, socket.io.engine.id);
};

document.addEventListener( 'keydown', onKeyDown, false );
document.addEventListener( 'keyup', onKeyUp, false );

if (typeof(module) !== 'undefined') module.exports = arrows;
},{}]},{},[1]);
