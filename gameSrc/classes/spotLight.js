var spotLight = function(intensity,angle,range,state){
	this.intensity = intensity;
	this.angle = angle;
	this.range = range;
	this.state = true;
	if(state) this.state = state;
}
if (typeof(module) !== 'undefined') module.exports = spotLight;