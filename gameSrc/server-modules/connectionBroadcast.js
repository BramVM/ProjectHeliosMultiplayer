
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
			connectionBroadcast.bufferedUpdatePackage.fresh = false;
			connectionBroadcast.players = connectionBroadcast.bufferedUpdatePackage.players;
		}
	},
	sentUpdatePackage: function(io){
		_updatePackage = new updatePackage(connectionBroadcast.players,true);
		io.sockets.emit("updatePackage", _updatePackage);
	},
	listenToClients: function(io){
		//add connection event
		io.on('connection', function(socket){
			var _player = new player(socket.id)
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
	}/*,
	updatePlayers: function(players){
		_players = players
		//removed buffered players to delete
		for (var i = this.playersToRemove.length - 1; i >= 0; i--) {
			removeFromObjectArrayByProperty(players,"id",this.playersToRemove[i].id)
		}
		this.playersToRemove[i]=[];
		//get buffered addable players
		for (var i = connectionBroadcast.playersToAdd.length - 1; i >= 0; i--) {
			_alreadyListed = false;
			for (var j = players.length - 1; j >= 0; j--) {
				if (players[j].id === connectionBroadcast.playersToAdd[i].id){
					_alreadyListed = true;
				}
			}
			if(!_alreadyListed) _players.push(connectionBroadcast.playersToAdd[i]);
		}
		connectionBroadcast.playersToAdd=[];
		return _players;
	}*/
}
if (typeof(module) !== 'undefined') module.exports = connectionBroadcast;