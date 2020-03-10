import Player from './Player'
import Cord from '../shared/Cord'

const gravFields = [
  {
    position: new Cord(-2000, 0),
    range: 300,
    force: 250
  }
]
function addVectors(vectors) {
  let result = new Cord();
  vectors.forEach(vector => {
    result.moveByVector(vector);
  })
  return result
}

var GameState = function () {
  const gameState = this;
  this.players = [];
  this.setPlayerMovement = (userId, value) => {
    var player = this.players.find((player) => { return player._id === userId })
    player.movement = value;
  }
  this.setPlayerDirection = (userId, value) => {
    var player = this.players.find((player) => { return player._id === userId })
    player.direction = value;
  }
  this.setPlayerStory = (userId, value) => {
    var player = this.players.find((player) => { return player._id === userId })
    player.story.step = value;
  }

  this.update = (dt) => {
    gameState.players.forEach((player) => {
      const wantedAngle = player.direction * Math.PI / 4
      player.power.value = player.power.value - 0.01 * dt;
      if (player.movement) {
        player.power.value = player.power.value - 0.2 * dt;
        var acceleration = new Cord().moveByDistanceAndAngle(player.acceleration * dt, wantedAngle);
        player.velocity = player.velocity.moveByVector(acceleration);
      }
      if (player.power.value < 0) player.power.value = 0;
      player.rotation = player.velocity.angleToPoint({ x: 0, y: 0 });
      player.rotation = player.rotation ? player.rotation : 0;
      // apply gravity
      const gravAngle = gravFields[0].position.angleToPoint(player.position)
      const distanceToGrav = player.position.distanceToPoint(gravFields[0].position)
      let multiplyer = (gravFields[0].range - distanceToGrav)/gravFields[0].range
      if (multiplyer < 0) multiplyer = 0;
      var gravAcceleration = new Cord().moveByDistanceAndAngle(gravFields[0].force * multiplyer * dt, gravAngle);
      if (distanceToGrav > 20) player.velocity = player.velocity.moveByVector(gravAcceleration);
      // apply drag
      player.velocity = addVectors([player.velocity, new Cord(-player.velocity.x * 0.9 * dt, -player.velocity.y * 0.9 * dt)])
      // apply vector to position
      const positon = new Cord(player.position.x, player.position.y);
      const positionOffset = new Cord(player.velocity.x * dt, player.velocity.y * dt);
      positon.moveByVector(positionOffset);
      player.position = positon;
      player.totalFlightDistance = player.totalFlightDistance + positionOffset.distanceToPoint({ x: 0, y: 0 });
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
  this.addPlayer = (playerServiceObj) => {
    var player = new Player(playerServiceObj)
    this.players.push(player);
    return player
  }
}

export default GameState