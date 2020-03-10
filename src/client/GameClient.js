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
    serverUpdateBuffer.update(gameClient.activePlayer._id, gameState);
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
        textConsole.addMessage(text, 'virus');
      }
      if (gameClient.activePlayer.totalFlightDistance > 800 && gameClient.activePlayer.story.step === 0) {
        gameClient.activePlayer.story.nextStep();
      }
      if (gameClient.activePlayer.story.step === 1 && gameClient.activePlayer.story.dialog === 0) {
        gameClient.activePlayer.story.dialog = 1;
        var text = "Well done! Our survival chance just increased by 83.05%.";
        textConsole.addMessage(text, 'virus');
        var text = "Keep an eye on that power gauge tho! Once it reaches zero, it's GAME OVER!";
        textConsole.addMessage(text, 'virus');
        var text = "In the meanwhile I managed to recover coordinates to an unknown location, not far from here. It's our best chance for survival.";
        textConsole.addMessage(text, 'virus');
        var text = "I'll put a location indicator on your HUD.";
        textConsole.addMessage(text, 'virus', () => { 
          gameClient.activePlayer.story.dialog = 2;
        });
      }
      if (gameClient.activePlayer.story.step === 1 && gameClient.activePlayer.story.dialog === 2) {
        gameClient.activePlayer.story.dialog = 3;
        gameClient.activePlayer.beacons.push({ x: -2000, y: 0 });
      }
      if (gameClient.activePlayer.story.step === 1 && gameClient.activePlayer.story.dialog === 3 && gameClient.activePlayer.position.distanceToPoint({x:-2000,y:0})<20) {
        gameClient.activePlayer.story.dialog = 4;
        gameClient.activePlayer.beacons = [];
        gameClient.activePlayer.story.nextStep();
      }
      if (gameClient.activePlayer.story.step === 2 && gameClient.activePlayer.story.dialog === 0) {
        gameClient.activePlayer.story.dialog = 1;
        var text = "It seems to be an abandoned station. Hold on, let me try something.";
        textConsole.addMessage(text, 'virus');
        var text = "... ... ...";
        textConsole.addMessage(text, 'virus');
        var text = "We are saved. This station reacted to our ID and is now recharging the ship.";
        textConsole.addMessage(text, 'virus');
        var text = "Apparently the power generating unit is broken and running at 32% of it's potential efficiency.";
        textConsole.addMessage(text, 'virus');
      }
      //render
      render(gameClient.activePlayer, gameState, grid)
    }
    this.updateid = window.requestAnimationFrame(this.updateLoop.bind(this), this.viewport);
  }
}

export default GameClient