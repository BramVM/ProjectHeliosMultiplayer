var express = require('express');
var app = express();
var browserify = require('browserify');
var fs = require('fs');
var UglifyJS = require('uglify-js');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var bundler = browserify(__dirname + '/gameSrc/clientScript.js');

bundler.transform({
  global: true
}, 'uglifyify');

bundler.bundle()
  .pipe(fs.createWriteStream(__dirname + '/bundle.js')
  	.on('finish', function() {
  		var result = UglifyJS.minify('bundle.js', {
			mangle: true,
			compress: {
				sequences: true,
				dead_code: true,
				conditionals: true,
				booleans: true,
				unused: true,
				if_return: true,
				join_vars: true,
				drop_console: true
			}
		});
  		fs.writeFileSync('bundle.js', result.code);
  		global.window = global.document = global;
      var gameCore = require('./gameSrc/gameCore.js');
      var gameInstance = new gameCore(true);
      gameInstance.start();
  		runServer()
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