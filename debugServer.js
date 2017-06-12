var express = require('express');
var app = express();
var browserify = require('browserify');
var fs = require('fs');
var UglifyJS = require('uglify-js');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var bundler = browserify(__dirname + '/gameSrc/clientScript.js');

bundler.bundle()
  .pipe(fs.createWriteStream(__dirname + '/bundle.js')
  	.on('finish', function() {
  		global.window = global.document = global;
  		var gameCore = require('./gameSrc/gameCore.js');
  		var gameInstance = new gameCore(true, io);
  		gameInstance.start();
  		runServer();
  	}));

function runServer (){
	app.set('port', (process.env.PORT || 5000));

	app.use(express.static(__dirname + '/'));

	app.get('/', function(request, response) {
	  response.render('index');
	});

	http.listen(app.get('port'), function() {
	  console.log('Node app is running on port', app.get('port'));
	});
}