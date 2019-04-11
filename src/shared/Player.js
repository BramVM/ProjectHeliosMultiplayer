import Cord from './Cord'
import Vector from './Vector'

var spotLight = function (intensity, angle, range, state) {
  this.intensity = intensity;
  this.angle = angle;
  this.range = range;
  this.state = true;
  if (state) this.state = state;
}

class Player {
  constructor(id) {
    this.id = id;
    this.direction = 0;
    this.movement = false;
    this.rotation = 0;
    this.acceleration = 900;
    this.speed = 0;
    this.topSpeed = 150;
    this.position = new Cord();
    this.trail = [];
    this.poweringUp = 0;
    this.force = new Vector();
    this.power = {
      capacity: 10,
      value: 10,
    }
    this.headlight = new spotLight(1, Math.PI / 3, 500, true);
  }
}

class Joske extends Player {
  constructor() { }
}

export default Player