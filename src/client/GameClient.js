
import { Actions } from '../shared/constants'
import InputInterface from './InputInterface'
import GameState from '../shared/GameState'
import CanvasDrawer from './CanvasDrawer'
import Grid from './Grid'


const inputInterface = new InputInterface();
const canvasDrawer = new CanvasDrawer();
const gameState = new GameState();
const grid = new Grid();

// generate random id (needs refinement)
var id = (() => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
})();

var GameClient = function () {
  const gameClient = this;
  var connection = new WebSocket('ws://127.0.0.1:3000');
  connection.onopen = function () {
    connection.send(JSON.stringify({ action: Actions.CONNECTION, value: true, userId: id }));
    gameClient.activePlayer = gameState.addPlayer(id);
  };

  connection.onerror = function (error) {
    // an error occurred when sending/receiving data
  };
  connection.onmessage = function (message) {
    // try to decode json (I assume that each message
    // from server is json)
    try {
      var json = JSON.parse(message.data);
      if (json.action === Actions.UPDATE_PACKAGE && json.value) {
        json.value.players.forEach(serverPlayer => {
          var player = gameState.players.find(player=>player.id===serverPlayer.id);
          if(player){
            player.force = serverPlayer.force;
            player.position = serverPlayer.position;
            if(player!==gameClient.activePlayer){
              player.movement = serverPlayer.movement;
              player.direction = serverPlayer.direction;
            }
          }
          else{
            gameState.addPlayer(serverPlayer.id);
          }
        });
        gameState.players.forEach((player, index, array) =>{
          var serverPlayer = json.value.players.find(serverPlayer=>player.id===serverPlayer.id);
          if (!serverPlayer) array.splice(index, 1);
        })
      }
    } catch (e) {
      console.log('This doesn\'t look like a valid JSON: ', message.data);
      return;
    }
    // handle incoming message
  };

  this.initGameCanvas = (canvas => {
    canvasDrawer.initCanvas(canvas);
  })
  this.start = () => {
    canvasDrawer.gameState = gameState;
    inputInterface.onDirectionChange = () => {
      connection.send(JSON.stringify({ action: Actions.DIRECTION_CHANGE, value: inputInterface.direction, userId: id }));
      gameState.setPlayerDirection(id, inputInterface.direction);
    }
    inputInterface.onMovementChange = () => {
      connection.send(JSON.stringify({ action: Actions.MOVEMENT_CHANGE, value: inputInterface.movement, userId: id }));
      gameState.setPlayerMovement(id, inputInterface.movement)
    }
    inputInterface.startListening();
    this.lastframetime = 0;
    this.updateLoop();
  }
  this.updateLoop = function (t) {
    this.dt = ((t - this.lastframetime) / 1000);
    var minDelay = 0.03;
    if (this.dt > minDelay) {
      this.lastframetime = t;
      gameState.update(this.dt);
      grid.update(gameClient.activePlayer.position)
      canvasDrawer.clear();
      //canvasDrawer.drawBackground();
      if (gameClient.activePlayer) {
        canvasDrawer.setPerspective(gameClient.activePlayer.position.x, gameClient.activePlayer.position.y);
      }
      canvasDrawer.drawTiles(grid.tiles);
      canvasDrawer.drawDarkness(0);
      canvasDrawer.drawPlayers();
    }
    this.updateid = window.requestAnimationFrame(this.updateLoop.bind(this), this.viewport);
  }
}

export default GameClient