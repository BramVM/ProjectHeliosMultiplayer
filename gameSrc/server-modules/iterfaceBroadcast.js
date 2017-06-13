iterfaceBroadcast = {
	listen: function(io, players){
		io.on('connection', function(socket){
			socket.on('direction change', function(direction, userId){
				for (var i = players.length - 1; i >= 0; i--) {
					if(userId === players[i].id ){
						players[i].direction = direction;
					}
				}
				console.log('direction ' + direction);
				//io.emit('direction change', direction, userId);
			});

			socket.on('movement change', function(movement, userId){
				for (var i = players.length - 1; i >= 0; i--) {
					if(userId === players[i].id ){
						players[i].movement = movement;
					}
				}
				console.log('movement ' + movement);
				//io.emit('movement change', movement, userId);
			});
		});
	}
}
if (typeof(module) !== 'undefined') module.exports = iterfaceBroadcast;