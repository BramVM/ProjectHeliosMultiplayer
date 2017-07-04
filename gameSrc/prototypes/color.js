var color = function(r,g,b){
	this.r = r;
	this.g = g;
	this.b = b;
	this.darken = function(number){
		this.r = this.r + number;
		if (this.r>255) this.r=255;
		this.g = this.g + number;
		if (this.g>255) this.g=255;
		this.b = this.b + number;
		if (this.b>255) this.b=255;
	}
	this.lighten = function(number){
		this.r = this.r - number;
		if (this.r<0) this.r=0;
		this.g = this.g - number;
		if (this.g<0) this.g=0;
		this.b = this.b - number;
		if (this.b<0) this.b=0;
	}
}
if (typeof(module) !== 'undefined') module.exports = color;