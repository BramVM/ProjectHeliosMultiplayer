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
  instantUpdates(gameState) {
    this.updatePackage.players.forEach((serverPlayer) => {
      var player = gameState.players.find(player => player.id === serverPlayer.id);
      if (player) {
        player.movement = serverPlayer.movement;
        player.direction = serverPlayer.direction;
        player.force = serverPlayer.force;
      }
    })
  }
  createDeltaPackage(gameState) {
    this.deltaPackage = { players: [] };
    this.updatePackage.players.forEach((serverPlayer) => {
      var player = gameState.players.find(player => player.id === serverPlayer.id);
      if (player) {
        this.deltaPackage.players.push({
          id: serverPlayer.id,
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
      var player = gameState.players.find(player => player.id === serverPlayer.id);
      if (!player) gameState.addPlayer(serverPlayer.id);
    });
  }
  removeExcessivePlayers(gameState) {
    gameState.players.forEach((player, index, array) => {
      var serverPlayer = this.updatePackage.players.find(serverPlayer => player.id === serverPlayer.id);
      if (!serverPlayer) array.splice(index, 1);
    });
  }
  update(gameState) {
    if (this.updatePackage) {
      if (this.intrapolationIndex === 0) {
        this.createDeltaPackage(gameState);
        this.addMissingPlayers(gameState);
        this.removeExcessivePlayers(gameState);
        this.instantUpdates(gameState)
      }
      this.intrapolationIndex++;
      gameState.players.forEach((player) => {
        const playerDelta = this.deltaPackage.players.find(playerDelta => player.id === playerDelta.id);
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