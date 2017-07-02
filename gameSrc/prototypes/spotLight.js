var spotLight = function(intensety,angle,range,state){
	this.intensety = intensety;
	this.angle = angle;
	this.range = range;
	this.state = true;
	if(state) this.state = state;
}
if (typeof(module) !== 'undefined') module.exports = spotLight;