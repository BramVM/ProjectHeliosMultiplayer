var socket = io();

console.log("start input interface");

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