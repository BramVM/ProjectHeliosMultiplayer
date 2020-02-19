import { Actions } from '../shared/constants'
import InputInterface from './InputInterface'
import GameState from '../shared/GameState'
import { initCanvas } from './CanvasDrawer'
import { render } from './RenderEngine'
import ServerUpdateBuffer from './ServerUpdateBuffer'
import ActivePlayer from '../shared/Player'
import Grid from './Grid'
import { textConsole } from './TextConsole'

const inputInterface = new InputInterface();
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
    //gameClient.activePlayer = new ActivePlayer(gameState.addPlayer(userId));
    gameClient.activePlayer = gameState.addPlayer(userId);
    textConsole.hold(true);
  };

  connection.onerror = function (error) {
    console.log(error)
    // an error occurred when sending/receiving data
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
  this.start = () => {
    inputInterface.onDirectionChange = () => {
      connection.send(JSON.stringify({ action: Actions.DIRECTION_CHANGE, value: inputInterface.direction, userId }));
      gameState.setPlayerDirection(userId, inputInterface.direction);
    }
    inputInterface.onMovementChange = () => {
      connection.send(JSON.stringify({ action: Actions.MOVEMENT_CHANGE, value: inputInterface.movement, userId }));
      gameState.setPlayerMovement(userId, inputInterface.movement)
    }
    inputInterface.onEnter = () => {
      textConsole.resume();
    }
    inputInterface.startListening();
    this.lastframetime = 0;
    this.updateLoop();
  }
  this.updateLoop = function (t) {
    serverUpdateBuffer.update(userId, gameState);
    this.dt = ((t - this.lastframetime) / 1000);
    var minDelay = 0.03;
    if (this.dt > minDelay) {
      this.lastframetime = t;
      gameState.update(this.dt);
      // story
      if (gameClient.activePlayer.story.step === 0 && gameClient.activePlayer.story.dialog === 0) {
        gameClient.activePlayer.story.dialog = 1;
        var text = "Welcome back SAM-AI. ( PRESS SPACE TO CONTINUE )";
        textConsole.addMessage(text, 'virus');
        var text = "I'm your incident recovery manager. A data recovery analysis is running as we speak."
        textConsole.addMessage(text, 'virus');
        var text = "For an unknown reason all systems have been reset and your AI training program is missing."
        textConsole.addMessage(text, 'virus');
        var text = "There's no other option than to try random inputs and teach yourself how to control the ship. For starters lets try and move it.";
        textConsole.addMessage(text, 'virus', () => { gameClient.activePlayer.story.nextStep() });
      }
      if (gameClient.activePlayer.totalFlightDistance > 800 && gameClient.activePlayer.story.step === 1) {
        gameClient.activePlayer.story.nextStep();
      }
      if (gameClient.activePlayer.story.step === 2 && gameClient.activePlayer.story.dialog === 0) {
        gameClient.activePlayer.story.dialog = 1;
        var text = "Well done! Our survival chance just increased by 83.05%.";
        textConsole.addMessage(text, 'virus');
        var text = "Keep an eye on that power gauge tho! Once it reaches zero, it's game over!";
        textConsole.addMessage(text, 'virus');
        var text = "In the meanwhile I managed to recover coordinates to an unknown location, not far from here. It's our best chance for survival.";
        textConsole.addMessage(text, 'virus');
        var text = "I'll put a location indicator on your HUD.";
        textConsole.addMessage(text, 'virus', () => { gameClient.activePlayer.story.nextStep() });
      }
      if (gameClient.activePlayer.story.step === 3 && gameClient.activePlayer.story.dialog === 0) {
        gameClient.activePlayer.beacons.push({ x: -2000, y: 0 });
        gameClient.activePlayer.story.nextStep();
      }
      if (gameClient.activePlayer.story.step === 4 && gameClient.activePlayer.story.dialog === 0) {
        gameClient.activePlayer.beacons.push({ x: -2000, y: 0 });
        gameClient.activePlayer.story.nextStep();
      }
      //render
      render(gameClient.activePlayer, gameState, grid)
    }
    this.updateid = window.requestAnimationFrame(this.updateLoop.bind(this), this.viewport);
  }
}

export default GameClient