import Cord from './Cord'

var spotLight = function (intensity, angle, range, state) {
  this.intensity = intensity;
  this.angle = angle;
  this.range = range;
  this.state = true;
  if (state) this.state = state;
}

class PhysicsObject {
  constructor(id) {
    this.id = id;
    this.direction = 0;
    this.movement = false;
    this.rotation = 0;
    this.acceleration = 300;
    this.position = new Cord();
    this.velocity = new Cord();
  }
}

class Player {
  constructor(playerServiceObj) {
    this._id = playerServiceObj._id;
    this.physicsObject = new PhysicsObject(playerServiceObj.id);
    this.direction = 0;
    this.movement = false;
    this.rotation = 0;
    this.acceleration = 300;
    this.position = new Cord(playerServiceObj.position.x, playerServiceObj.position.y);
    this.trail = [];
    this.poweringUp = 0;
    this.velocity = new Cord();
    this.power = {
      capacity: 10,
      value: 10,
    }
    this.totalFlightDistance = 0;
    this.beacons = [],
      this.story = {
        step: playerServiceObj.story.step,
        dialog: 0,
        nextStep: () => {
          this.story.dialog = 0;
          this.story.step++;
        }
      }
    this.headlight = new spotLight(1, Math.PI / 3, 500, true);
  }
}

export class APlayer {
  constructor(ship) {
    this.ship = ship;
  }
}

export default Player