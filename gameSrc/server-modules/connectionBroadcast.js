
var player = require("../prototypes/player.js");
//var player = require("/prototypes/player.js");

var updatePackage = function(players,fresh){
	this.players = players;
	this.fresh = fresh;
};
function removeFromObjectArrayByProperty(array,prop,value){
	for (var i = 0; i<=array.length-1; i++) {
		if(array[i][prop] === value){
			array.splice(i,1);
			i --;
		}
	}
}
connectionBroadcast = {
	playersToAdd:[],
	playersToRemove:[],
	players:[],
	bufferedUpdatePackage : new updatePackage([],false),
	getUpdatePackage: function(){
		if(connectionBroadcast.bufferedUpdatePackage.fresh){
			_updatePackage = connectionBroadcast.bufferedUpdatePackage;
			connectionBroadcast.bufferedUpdatePackage.fresh = false;
			//update game vars 
			connectionBroadcast.players = [];
			for (var i = connectionBroadcast.bufferedUpdatePackage.players.length - 1; i >= 0; i--) {
				_player = new player(connectionBroadcast.bufferedUpdatePackage.players[i].id, connectionBroadcast.bufferedUpdatePackage.players[i].direction, connectionBroadcast.bufferedUpdatePackage.players[i].movement, connectionBroadcast.bufferedUpdatePackage.players[i].position)
				connectionBroadcast.players.push(_player);
			}
		}
	},
	sentUpdatePackage: function(io){
		_updatePackage = new updatePackage(connectionBroadcast.players,true);
		io.sockets.emit("updatePackage", _updatePackage);
	},
	listenToClients: function(io){
		//add connection event
		io.on('connection', function(socket){
			var _position = {x:0,y:0};
			var _player = new player(socket.id, 0, false, _position)
			//add this player to the in buffer
			//connectionBroadcast.playersToAdd.push(_player);
		 	console.log('a user connected ' + socket.id);
		 	socket.on('direction change', function(direction, userId){
		 		var index = connectionBroadcast.players.indexOf(_player);
		 		connectionBroadcast.players[index].direction = direction;
				console.log('direction ' + direction);
			});
			socket.on('movement change', function(movement, userId){
				var index = connectionBroadcast.players.indexOf(_player);
		 		connectionBroadcast.players[index].movement = movement;
				console.log('movement ' + movement);
			});
		  	// add disconnection event
			socket.on('disconnect', function(){
				//add this player to the out buffer
				connectionBroadcast.playersToRemove.push(_player);
				console.log('a user disconnected ' + socket.id);
				var index = connectionBroadcast.players.indexOf(_player);
		 		connectionBroadcast.players.splice(index,1);
				/*removeFromObjectArrayByProperty(this.players,"id",socket.id)*/
			});
			connectionBroadcast.players.push(_player);
		});
	},
	listenToServer: function(socket){
		socket.on('updatePackage', function(updatePackage){
			connectionBroadcast.bufferedUpdatePackage = updatePackage;
        });
	}
}
if (typeof(module) !== 'undefined') module.exports = connectionBroadcast;