import Player from './Player'
import Vector from '../shared/Vector'
import Cord from '../shared/Cord'

function addVectors(vectors) {
  let result = new Vector();
  vectors.forEach(vector => {
    const head = new Cord(0, 0)
    head.moveByDistanceAndAngle(result.magnitude, result.angle);
    head.moveByDistanceAndAngle(vector.magnitude, vector.angle);
    result = new Vector(head.angleToPoint({ x: 0, y: 0 }), head.distanceToPoint({ x: 0, y: 0 }))
  })
  return result
}

var GameState = function () {
  const gameState = this;
  this.players = [];
  this.setPlayerMovement = (userId, value) => {
    var player = this.players.find((player) => { return player.id === userId })
    player.movement = value;
  }
  this.setPlayerDirection = (userId, value) => {
    var player = this.players.find((player) => { return player.id === userId })
    player.direction = value;
  }
  this.update = (dt) => {
    gameState.players.forEach((player) => {
      const wantedAngle = player.direction * Math.PI / 4
      player.power.value = player.power.value - 0.01 * dt;
      if (player.movement) {
        player.power.value = player.power.value - 0.2 * dt;
        player.force = addVectors([player.force, new Vector(wantedAngle, player.acceleration * dt)]);
      }
      if (player.power.value < 0) player.power.value = 0;
      player.rotation = player.force.angle;
      // apply drag
      player.force = addVectors([player.force, new Vector(player.force.angle + Math.PI, player.force.magnitude * 0.9 * dt)]);
      // apply vector to position
      const positon = new Cord(player.position.x, player.position.y);
      positon.moveByDistanceAndAngle(player.force.magnitude * dt, player.force.angle);
      player.position = positon;
      //trail
      if (player.movement) {
        player.trail.push(player.position);
        if (player.trail.length > 7) player.trail.shift();
      }
      else {
        player.trail.shift();
      }
      if (player.poweringUp < 100) {
        player.poweringUp = player.poweringUp + 3;
      };
    })
  }
  this.addPlayer = (userId) => {
    var player = new Player(userId)
    this.players.push(player);
    return player
  }
}

export default GameState