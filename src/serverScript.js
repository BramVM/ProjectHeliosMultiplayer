
var WebSocketServer = require('websocket').server;
var port = 3000;

import GameServer from './server/GameServer'
import httpServer from './server/httpServer'

global.window = global.document = global;
httpServer.listen(process.env.PORT||port);
console.log('http server running at http://127.0.0.1:' + (process.env.PORT||port) + '/');

var webSocketServer = new WebSocketServer({
  httpServer: httpServer
});
var gameServer = new GameServer();


  gameServer.webSocketServer = webSocketServer;
  gameServer.start();
