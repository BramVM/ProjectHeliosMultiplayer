var player = function(id){
	this.id = id;
	this.direction = 0;
	this.movement = false;
}

connectionBroadcast = {
	listen: function(io, players){
		io.on('connection', function(socket){
			players.push(new player(socket.id));
		 	console.log('a user connected ' + socket.id);
			//client.send(client.id); 
		  	//io.sockets.connected(socket.id).emit('create id', socket.id);
			socket.on('disconnect', function(){
				var playerIndexToRemove = -1;
				for (var i = players.length - 1; i >= 0; i--) {
					if (players[i].id === socket.id) playerIndexToRemove = i;
				}
				players.splice(playerIndexToRemove, 1);
			});
		});
	}
}
if (typeof(module) !== 'undefined') module.exports = connectionBroadcast;