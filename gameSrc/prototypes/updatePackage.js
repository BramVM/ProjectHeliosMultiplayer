var updatePackage = function(players,fresh){
	this.players = players;
	this.fresh = fresh;
}

if (typeof(module) !== 'undefined') module.exports = updatePackage;