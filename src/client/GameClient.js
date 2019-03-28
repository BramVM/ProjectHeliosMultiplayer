
import { Actions } from '../shared/constants'
import InputInterface from './InputInterface'
import GameState from '../shared/GameState'
import CanvasDrawer from './CanvasDrawer'
import Grid from './Grid'
import ServerUpdateBuffer from './ServerUpdateBuffer'
import {
  getBiomeLight
} from './biomeCalculations'


const inputInterface = new InputInterface();
const canvasDrawer = new CanvasDrawer();
const gameState = new GameState();
const grid = new Grid();
const serverUpdateBuffer = new ServerUpdateBuffer();

// generate random id (needs refinement)
var userId = (() => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
})();

var GameClient = function () {
  const gameClient = this;
  var HOST = location.origin.replace(/^http/, 'ws');
  var connection = new WebSocket(HOST);
  connection.onopen = function () {
    connection.send(JSON.stringify({ action: Actions.CONNECTION, value: true, userId }));
    gameClient.activePlayer = gameState.addPlayer(userId);
  };

  connection.onerror = function (error) {
    console.log(error)
    // an error occurred when sending/receiving data
  };
  connection.onmessage = function (message) {
    // try to decode json (I assume that each message
    // from server is json)
    try {
      var json = JSON.parse(message.data);
      if (json.action === Actions.UPDATE_PACKAGE && json.value) {
        serverUpdateBuffer.queUpdate(json.value)
      }
    } catch (e) {
      console.error('This doesn\'t look like a valid JSON: ', message.data);
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
      connection.send(JSON.stringify({ action: Actions.DIRECTION_CHANGE, value: inputInterface.direction, userId }));
      gameState.setPlayerDirection(userId, inputInterface.direction);
    }
    inputInterface.onMovementChange = () => {
      connection.send(JSON.stringify({ action: Actions.MOVEMENT_CHANGE, value: inputInterface.movement, userId }));
      gameState.setPlayerMovement(userId, inputInterface.movement)
    }
    inputInterface.startListening();
    this.lastframetime = 0;
    this.updateLoop();
  }
  this.updateLoop = function (t) {
    serverUpdateBuffer.update(gameState);
    this.dt = ((t - this.lastframetime) / 1000);
    var minDelay = 0.03;
    if (this.dt > minDelay) {
      this.lastframetime = t;
      gameState.update(this.dt);
      if (gameClient.activePlayer) {
        grid.update(gameClient.activePlayer.position)
      }
      canvasDrawer.clear();
      if (gameClient.activePlayer) {
        canvasDrawer.setPerspective(gameClient.activePlayer.position.x, gameClient.activePlayer.position.y);
      }
      canvasDrawer.drawTiles(grid.tiles);
      if (gameClient.activePlayer) {
        canvasDrawer.drawDarkness(1 - getBiomeLight(gameClient.activePlayer.position).value);
      }

      canvasDrawer.drawPlayers();
    }
    this.updateid = window.requestAnimationFrame(this.updateLoop.bind(this), this.viewport);
  }
}

export default GameClient