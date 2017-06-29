var gameCore = require('./gameSrc/gameCore.js');

var gameInstance = new gameCore(false,io);
gameInstance.start();