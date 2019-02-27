
var WebSocketServer = require('websocket').server;
var port = 3000;

import GameServer from './server/GameServer.js'
import httpServer from './server/httpserver.js'

global.window = global.document = global;
httpServer.listen(port);
console.log('http server running at http://127.0.0.1:' + port + '/');

var webSocketServer = new WebSocketServer({
  httpServer: httpServer
});
var gameServer = new GameServer();


  gameServer.webSocketServer = webSocketServer;
  gameServer.start();
