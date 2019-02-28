import { Actions } from '../shared/constants'
import GameState from '../shared/GameState'
import UpsatePackage from '../shared/UpdatePackage'
import addAnimationMethode from './addAnimationMethode'

const gameState = new GameState();
var GameServer = function () {
  const gameserver = this;
  const clients = [];
  this.start = () => {
    this.webSocketServer.on('request', function (request) {
      console.log('websocket request')
      console.log(request)
      var connection = request.accept(null, request.origin);
      clients.push(connection);
      connection.on('message', function (message) {
        if (message.type === 'utf8') {
          try {
            console.log(message.utf8Data)
            var messageData = JSON.parse(message.utf8Data);
            if (messageData.action === Actions.CONNECTION && messageData.value) {
              connection.id = messageData.userId;
              gameState.addPlayer(messageData.userId)
            }
            if (messageData.action === Actions.DIRECTION_CHANGE && messageData.userId ) gameState.setPlayerDirection(messageData.userId, messageData.value);
            if (messageData.action === Actions.MOVEMENT_CHANGE && messageData.userId ) gameState.setPlayerMovement(messageData.userId, messageData.value);
          } catch (e) {
            console.log('This doesn\'t look like a valid JSON: ', message.data);
            return;
          }
        }
      });
      connection.on('close', function (connection) {
        // close user connection
        console.log('close')
        console.log(connection)
      });
    });
    
    addAnimationMethode(this.runningOnServer);
    console.log('gameserver is running');
    this.lastframetime = 0;
    this.updateLoop();
  }
  this.updateLoop = function(t) {
    this.dt = ( (t - this.lastframetime)/1000);
    var minDelay = 0.1;
    if (this.dt>minDelay){
      this.lastframetime = t;
      gameState.update(this.dt)
      const updatePackage = new UpsatePackage (gameState)
      clients.forEach((client, index, array)=>{
        client.send(JSON.stringify({action:Actions.UPDATE_PACKAGE, value:updatePackage}))
        if (client.state === "closed"){
          if (client.id) gameState.players = gameState.players.filter(player=>player.id!== client.id)
          array.splice(index, 1);
        }
      })
    }
    this.updateid = window.requestAnimationFrame( this.updateLoop.bind(this), this.viewport );
  }
}

export default GameServer