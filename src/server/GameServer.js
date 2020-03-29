import { Actions } from '../shared/constants'
import GameState from '../shared/GameState'
import UpdatePackage from '../shared/UpdatePackage'
import addAnimationMethode from './addAnimationMethode'
import { getToken, getPlayers, updatePlayer, updatePlayers} from './auth/indentityAuth';

const gameState = new GameState();
var GameServer = function () {
  const clients = [];
  this.start = () => {
    
    getToken().then(token=>{
      console.log('access token')
      console.log(token.access_token)
      getPlayers();
    });

    this.webSocketServer.on('request', function (request) {
      var connection = request.accept(null, request.origin);
      clients.push(connection);
      connection.on('message', function (message) {
        if (message.type === 'utf8') {
          try {
            console.log(message.utf8Data)
            var messageData = JSON.parse(message.utf8Data);
            if (messageData.action === Actions.CONNECTION && messageData.value) {
              connection.id = messageData.playerServiceObj._id;
              gameState.addPlayer(messageData.playerServiceObj)
            }
            if (messageData.action === Actions.DIRECTION_CHANGE && messageData.userId ) gameState.setPlayerDirection(messageData.userId, messageData.value);
            if (messageData.action === Actions.MOVEMENT_CHANGE && messageData.userId ) gameState.setPlayerMovement(messageData.userId, messageData.value);
            if (messageData.action === Actions.STORY_STEP_CHANGE && messageData.userId ) gameState.setPlayerStory(messageData.userId, messageData.value);
          } catch (e) {
            console.log('Invalid socket message: ', message.data);
            return;
          }
        }
      });
      connection.on('close', function (connection) {
        // close user connection
      });
    });
    
    addAnimationMethode(this.runningOnServer);
    console.log('gameserver is running');
    this.lastframetime = 0;
    this.updateLoop();
  }
  this.updateLoop = function(t) {
    this.dt = ( (t - this.lastframetime)/1000);
    var minPackageDelay = 0.1;
    var minPlayerUpdateDelay = 10;
    if (this.dt>minPlayerUpdateDelay){
      updatePlayers(gameState.players).catch(error => {
        console.log(error)
      })
    }
    if (this.dt>minPackageDelay){
      this.lastframetime = t;
      gameState.update(this.dt)
      const updatePackage = new UpdatePackage (gameState)
      clients.forEach((connection, index, array)=>{
        connection.send(JSON.stringify({action:Actions.UPDATE_PACKAGE, value:updatePackage}))
        if (connection.state === "closed"){
          if (connection.id) {
            const player = gameState.players.find(player=>player._id === connection.id);
            updatePlayer(player).catch(error => {
              console.log(error)
            })
            gameState.players = gameState.players.filter(player=>player._id!== connection.id);
          }
          array.splice(index, 1);
        }
      })
    }
    this.updateid = window.requestAnimationFrame( this.updateLoop.bind(this), this.viewport );
  }
}

export default GameServer