var cord = function(x,y){
	this.x = x;
	this.y = y;
	this.moveByDistanceAndAngle = function(distance, angle){
		if(!isNaN(Math.cos(angle)*distance)) this.x = this.x + Math.cos(angle)*distance;
		if(!isNaN(Math.sin(angle)*distance)) this.y = this.y + Math.sin(angle)*distance;
	}
}
if (typeof(module) !== 'undefined') module.exports = cord;