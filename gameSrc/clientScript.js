var gameCore = require('./gameCore.js');

var gameInstance = new gameCore(false,io);
gameInstance.start();