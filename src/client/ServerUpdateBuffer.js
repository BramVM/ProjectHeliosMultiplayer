export default class ServerUpdateBuffer {

  constructor() {
    this.updatePackage = null;
    this.framesForIntrapolation = 6;
    this.intrapolationIndex = 0;
  }
  queUpdate(updatePackage) {
    this.updatePackage = updatePackage;
    this.deltaPackage = { players: [] };
    this.intrapolationIndex = 0;
  }
  instantUpdates(userId, gameState) {
    this.updatePackage.players.forEach((serverPlayer) => {
      var player = gameState.players.find(player => player._id === serverPlayer._id);
      if (player) {
        if ( userId !== player._id ){
          player.movement = serverPlayer.movement;
          player.direction = serverPlayer.direction;
        }
        player.force = serverPlayer.force;
      }
    })
  }
  createDeltaPackage(gameState) {
    this.deltaPackage = { players: [] };
    this.updatePackage.players.forEach((serverPlayer) => {
      var player = gameState.players.find(player => player._id === serverPlayer._id);
      if (player) {
        this.deltaPackage.players.push({
          _id: serverPlayer._id,
          position: {
            x: (serverPlayer.position.x - player.position.x) / this.framesForIntrapolation,
            y: (serverPlayer.position.y - player.position.y) / this.framesForIntrapolation
          },
          // force: {
          //   angle: (serverPlayer.force.angle - player.force.angle) / this.framesForIntrapolation,
          //   magnitude: (serverPlayer.force.magnitude - player.force.magnitude) / this.framesForIntrapolation
          // }
        })
      }
    });
  }
  addMissingPlayers(gameState) {
    this.updatePackage.players.forEach(serverPlayer => {
      var player = gameState.players.find(player => player._id === serverPlayer._id);
      if (!player) gameState.addPlayer(serverPlayer);
    });
  }
  removeExcessivePlayers(userId, gameState) {
    gameState.players.forEach((player, index, array) => {
      if (player._id !== userId) {
        var serverPlayer = this.updatePackage.players.find(serverPlayer => player._id === serverPlayer._id);
        if (!serverPlayer) array.splice(index, 1);
      }
    });
  }
  update(userId, gameState) {
    if (this.updatePackage) {
      if (this.intrapolationIndex === 0) {
        this.createDeltaPackage(gameState);
        this.addMissingPlayers(gameState);
        this.removeExcessivePlayers(userId, gameState);
        this.instantUpdates(userId, gameState)
      }
      this.intrapolationIndex++;
      gameState.players.forEach((player) => {
        const playerDelta = this.deltaPackage.players.find(playerDelta => player._id === playerDelta._id);
        if (playerDelta) {
          // player.force.angle = player.force.angle + playerDelta.force.angle;
          // player.force.magnitude = player.force.magnitude + playerDelta.force.magnitude;
          player.position.x = player.position.x + playerDelta.position.x;
          player.position.y = player.position.y + playerDelta.position.y;
        }
      });
      if (this.intrapolationIndex === this.framesForIntrapolation) this.updatePackage = null
    }
  }
}