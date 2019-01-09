
//var player = require("../prototypes/player.js");




function removeFromObjectArrayByProperty(array,prop,value){
	for (var i = 0; i<=array.length-1; i++) {
		if(array[i][prop] === value){
			array.splice(i,1);
			i --;
		}
	}
}
connectionBroadcast = function(player,logicPackage){
	var self = this;
	this.classes = {
		player : player,
		logicPackage : logicPackage		
	}
	this.players = [];
	this.bufferedlogicPackage = new self.classes.logicPackage([],false);
	this.getLogicPackage = function(){
		if(this.bufferedlogicPackage.fresh){
			var _logicPackage = this.bufferedlogicPackage;
			this.bufferedlogicPackage.fresh = false;
			//update game vars 
			this.players = [];
			for (var i = this.bufferedlogicPackage.players.length - 1; i >= 0; i--) {
				var _player = new this.classes.player(this.bufferedlogicPackage.players[i].id, this.bufferedlogicPackage.players[i].direction, this.bufferedlogicPackage.players[i].movement, this.bufferedlogicPackage.players[i].position, this.bufferedlogicPackage.players[i].poweringUp)
				this.players.push(_player);
			}
		}
	};
	this.sentLogicPackage = function(io){
		var _logicPackage = new this.classes.logicPackage(self.players,true);
		io.sockets.emit("logicPackage", _logicPackage);
	};
	this.listenToClients = function(io){
		//add connection event
		io.on('connection', function(socket){
			var _position = {x:0,y:0};
			var _player = new self.classes.player(socket.id, 0, false, _position, -100)
			//add this player to the in buffer
			//self.playersToAdd.push(_player);
		 	console.log('a user connected ' + socket.id);
		 	socket.on('direction change', function(direction, userId){
		 		var index = self.players.indexOf(_player);
		 		self.players[index].direction = direction;
				console.log('direction ' + direction);
			});
			socket.on('movement change', function(movement, userId){
				var index = self.players.indexOf(_player);
		 		self.players[index].movement = movement;
				console.log('movement ' + movement);
			});
		  	// add disconnection event
			socket.on('disconnect', function(){
				console.log('a user disconnected ' + socket.id);
				var index = self.players.indexOf(_player);
		 		self.players.splice(index,1);
				/*removeFromObjectArrayByProperty(this.players,"id",socket.id)*/
			});
			self.players.push(_player);
		});
	};
	this.listenToServer = function(socket){
		socket.on('logicPackage', function(logicPackage){
			self.bufferedlogicPackage = logicPackage;
        });
	};
}
if (typeof(module) !== 'undefined') module.exports = connectionBroadcast;