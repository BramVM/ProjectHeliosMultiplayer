import { Actions } from '../shared/constants'
import InputInterface from './InputInterface'
import GameState from '../shared/GameState'
import { initCanvas } from './CanvasDrawer'
import { render } from './RenderEngine'
import ServerUpdateBuffer from './ServerUpdateBuffer'
import ActivePlayer from '../shared/Player'
import { getPlayer } from './api/playerApi';
import Grid from './Grid'
import { textConsole } from './TextConsole'
import { storyModule } from './Story'

const inputInterface = new InputInterface();
const gameState = new GameState();
const grid = new Grid();
const serverUpdateBuffer = new ServerUpdateBuffer();


var GameClient = function () {
  const gameClient = this;
  var HOST = location.origin.replace(/^http/, 'ws');
  var connection = new WebSocket(HOST);
  connection.onopen = function () {
  };

  connection.onerror = function (error) {
    console.log(error)
  };

  connection.onmessage = function (message) {
    try {
      var json = JSON.parse(message.data);
      if (json.action === Actions.UPDATE_PACKAGE && json.value) {
        serverUpdateBuffer.queUpdate(json.value)
      }
    } catch (e) {
      console.error('This doesn\'t look like a valid JSON: ', message.data);
      return;
    }
  };

  this.initGameCanvas = (canvasElement => {
    initCanvas(canvasElement);
  })
  this.start = async () => {
    // get player for logged in user
    var player = await getPlayer()
      .catch(error => {
        console.log('error')
        console.log(error)
      });

    // let gameserver know you are here
    connection.send(JSON.stringify({ action: Actions.CONNECTION, value: true, playerServiceObj: player }));
    gameClient.activePlayer = gameState.addPlayer(player);
    textConsole.hold(true);

    inputInterface.onDirectionChange = () => {
      connection.send(JSON.stringify({ action: Actions.DIRECTION_CHANGE, value: inputInterface.direction, userId: gameClient.activePlayer._id }));
      gameState.setPlayerDirection(gameClient.activePlayer._id, inputInterface.direction);
    }
    inputInterface.onMovementChange = () => {
      connection.send(JSON.stringify({ action: Actions.MOVEMENT_CHANGE, value: inputInterface.movement, userId: gameClient.activePlayer._id }));
      gameState.setPlayerMovement(gameClient.activePlayer._id, inputInterface.movement)
    }
    inputInterface.onEnter = () => {
      textConsole.resume();
    }
    inputInterface.startListening();
    this.lastframetime = 0;
    this.updateLoop();
  }
  this.updateLoop = function (t) {
    console.log(connection.readyState === connection.OPEN ? 'socket connection open' : '! socket connection closed !')
    serverUpdateBuffer.update(gameClient.activePlayer._id, gameState);
    this.dt = ((t - this.lastframetime) / 1000);
    var minDelay = 0.03;
    if (this.dt > minDelay) {
      this.lastframetime = t;
      gameState.update(this.dt);
      // story
      storyModule.update(gameClient.activePlayer, gameState.stations.find(station => station.playerId === gameClient.activePlayer._id), connection)
      //render
      render(gameClient.activePlayer, gameState, grid)
    }
    this.updateid = window.requestAnimationFrame(this.updateLoop.bind(this), this.viewport);
  }
}

export default GameClient