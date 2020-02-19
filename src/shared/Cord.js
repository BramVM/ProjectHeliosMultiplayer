var Cord = function (x, y) {
  this.x = 0;
  this.y = 0;
  if (x) this.x = x;
  if (y) this.y = y;
  this.moveByVector = function (vector) {
    this.x = this.x + vector.x;
    this.y = this.y + vector.y;
    return this;
  }
  this.moveByDistanceAndAngle = function (distance, angle) {
    if (!isNaN(Math.cos(angle) * distance)) this.y = this.y + Math.cos(angle) * distance;
    if (!isNaN(Math.sin(angle) * distance)) this.x = this.x + Math.sin(angle) * distance;
    return this;
  }
  this.relativeToPerspective = function(perspective){
		var result = new Cord();
		result.x = result.x + perspective.x;
		result.y = result.y + perspective.y;
		return result;
	}
  this.distanceToPoint = function (point) {
    return Math.sqrt(Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2));
  }
  this.angleToPoint = function (point) {
    var result = Math.acos((this.y - point.y) / this.distanceToPoint(point));
    if (this.x < point.x) result = 2 * Math.PI - result;
    return result;
  }
}
export default Cord