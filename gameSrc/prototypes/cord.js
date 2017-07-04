var cord = function(x,y){
	this.x = 0;
	this.y = 0;
	if(x) this.x = x;
	if(y) this.y = y;
	this.moveByDistanceAndAngle = function(distance, angle){
		if(!isNaN(Math.cos(angle)*distance)) this.x = this.x + Math.cos(angle)*distance;
		if(!isNaN(Math.sin(angle)*distance)) this.y = this.y + Math.sin(angle)*distance;
	}
}
if (typeof(module) !== 'undefined') module.exports = cord;