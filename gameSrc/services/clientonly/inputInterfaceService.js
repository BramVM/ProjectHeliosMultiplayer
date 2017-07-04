
var inputInterface = function() {
	var self = this;
	this.direction = 0;
	this.movement = false;
	this.userId = false;
	this.arrows = {
		up:false,
		right:false,
		down:false,
		left:false
	},
	this.socket = {};

	this.start = function(socket){
		self.socket=socket;
		socket.on('connect', function () {
		    console.log(this.id);
		    self.userId = this.id;
		});
		//self.userId = socket.io.engine.id;
		document.addEventListener( 'keydown', this.onKeyDown, false );
		document.addEventListener( 'keyup', this.onKeyUp, false );
	};

	this.onKeyDown = function ( event ) {
		switch ( event.keyCode ) {
		  case 38: // up
		  case 87: // w
		    self.arrows.up = true;
		    break;
		  case 37: // left
		  case 65: // a
		    self.arrows.left = true; 
		    break;
		  case 40: // down
		  case 83: // s
		    self.arrows.down = true;
		    break;
		  case 39: // right
		  case 68: // d
		    self.arrows.right = true;
		    break;
		  case 32: // space
		    
		    break;
		}
		self.updateMovement();
	};

	this.onKeyUp = function ( event ) {
		switch( event.keyCode ) {
		  case 38: // up
		  case 87: // w
		    self.arrows.up = false;
		    break;
		  case 37: // left
		  case 65: // a
		    self.arrows.left = false;
		    break;
		  case 40: // down
		  case 83: // s
		    self.arrows.down = false;
		    break;
		  case 39: // right
		  case 68: // d
		    self.arrows.right = false;
		    break;
		}
		self.updateMovement();
	};

	this.updateMovement = function(){
		//direction
		_direction = this.direction;
		var _xaxis = 0;
		var _yaxis = 0;
		if (this.arrows.up&&!this.arrows.down) {_xaxis = 1; _direction = 0;}
		if (!this.arrows.up&&this.arrows.down) {_xaxis = -1; _direction = 4;}
		if (this.arrows.right&&!this.arrows.left) {_yaxis = 1; _direction = 2;}
		if (!this.arrows.right&&this.arrows.left) {_yaxis = -1; _direction = 6;}
		if (_xaxis===1 && _yaxis===1) _direction = 1;
		if (_xaxis===-1 && _yaxis===1) _direction = 3;
		if (_xaxis===1 && _yaxis===-1) _direction = 7;
		if (_xaxis===-1 && _yaxis===-1) _direction = 5;
		if(this.direction != _direction){
			this.direction = _direction;
			this.socket.emit('direction change', this.direction, this.socket.io.engine.id);
		}
		//movement
		var _movement = this.movement;
		if(_xaxis!=0||_yaxis!=0){
			_movement = true;
		}
		else{
			_movement = false;
		}
		if(this.movement != _movement){
			this.movement = _movement;
			this.socket.emit('movement change', this.movement, this.socket.io.engine.id);
		}
	}
};
if (typeof(module) !== 'undefined') module.exports = inputInterface;