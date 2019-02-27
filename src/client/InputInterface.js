
var InputInterface = function () {
  var self = this;
  this.direction = 0;
  this.movement = false;
  this.arrows = {
    up: false,
    right: false,
    down: false,
    left: false
  },
    this.socket = {};

  this.startListening = function () {
    document.addEventListener('keydown', this.onKeyDown, false);
    document.addEventListener('keyup', this.onKeyUp, false);
    document.addEventListener('movementChange', this.onMovementChange, false);
    document.addEventListener('directionChange', this.onDirectionChange, false);
  };

  this.onKeyDown = function (event) {
    switch (event.keyCode) {
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

  this.onKeyUp = function (event) {
    switch (event.keyCode) {
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

  this.updateMovement = function () {
    //direction
    _direction = this.direction;
    var _xaxis = 0;
    var _yaxis = 0;
    if (this.arrows.up && !this.arrows.down) { _xaxis = 1; _direction = 0; }
    if (!this.arrows.up && this.arrows.down) { _xaxis = -1; _direction = 4; }
    if (this.arrows.right && !this.arrows.left) { _yaxis = 1; _direction = 2; }
    if (!this.arrows.right && this.arrows.left) { _yaxis = -1; _direction = 6; }
    if (_xaxis === 1 && _yaxis === 1) _direction = 1;
    if (_xaxis === -1 && _yaxis === 1) _direction = 3;
    if (_xaxis === 1 && _yaxis === -1) _direction = 7;
    if (_xaxis === -1 && _yaxis === -1) _direction = 5;
    if (this.direction != _direction) {
      this.direction = _direction;
      document.dispatchEvent(new Event('directionChange'));
    }
    //movement
    var _movement = this.movement;
    if (_xaxis != 0 || _yaxis != 0) {
      _movement = true;
    }
    else {
      _movement = false;
    }
    if (this.movement != _movement) {
      this.movement = _movement;
      document.dispatchEvent(new Event('movementChange'));
    }
  }
};
if (typeof (module) !== 'undefined') module.exports = InputInterface;