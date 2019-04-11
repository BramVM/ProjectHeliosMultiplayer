import Cord from '../shared/Cord'
import seedrandom from 'seedrandom'
import { Biomes, BiomeTypes } from '../shared/constants'

let canvas = null;
let context = null;
let perspective = { x: 0, y: 0 }
// this.drawRandomShape = function(context,position, size){
// 	var minDistance = size/5;
// 	var numberOfPoints = 6
// 	context.beginPath();
// 	Math.seedrandom(""+String(position.x) + String(position.y));
// 	for (var i = 0; i < numberOfPoints; i++) {
// 		if(i!=0){
// 			bezierpoint1 = new this.classes.cord(prevPoint.x, prevPoint.y);
// 			bezierpoint1.moveByDistanceAndAngle(prevOffset/2,prevAngle+Math.PI/2);
// 		}

// 		calculatedPosition = new this.classes.cord(position.x, position.y);
// 		prevAngle = Math.PI*2/numberOfPoints*i;
// 		prevOffset = minDistance + Math.random()*(size-minDistance);
// 		calculatedPosition.moveByDistanceAndAngle(prevOffset,Math.PI*2/numberOfPoints*i);
// 		Math.seedrandom(""+String(calculatedPosition.x) + String(calculatedPosition.y));
// 		if(i===0){
// 			context.moveTo(calculatedPosition.x, calculatedPosition.y);
// 			firstpoint = calculatedPosition;
// 			firstAngle= prevAngle;
// 			firstOffset= prevOffset;
// 		}
// 		else{
// 			bezierpoint2 = new this.classes.cord(calculatedPosition.x, calculatedPosition.y);
// 			bezierpoint2.moveByDistanceAndAngle(prevOffset/2,prevAngle-Math.PI/2);
// 			context.bezierCurveTo(bezierpoint1.x, bezierpoint1.y, bezierpoint2.x, bezierpoint2.y, calculatedPosition.x, calculatedPosition.y);
// 		}
// 		prevPoint = calculatedPosition;
// 	}
// 	bezierpoint1 = new this.classes.cord(calculatedPosition.x, calculatedPosition.y);
// 	bezierpoint1.moveByDistanceAndAngle(prevOffset/2,prevAngle+Math.PI/2);
// 	bezierpoint2 = new this.classes.cord(firstpoint.x, firstpoint.y);
// 	bezierpoint2.moveByDistanceAndAngle(firstOffset/2,firstAngle-Math.PI/2);
// 	context.bezierCurveTo(bezierpoint1.x, bezierpoint1.y, bezierpoint2.x, bezierpoint2.y, firstpoint.x, firstpoint.y);
// 	Math.seedrandom();
// 	context.fillStyle = "rgba(0, 0, 0, 0.4)";
// 	context.fill();
// 	context.closePath();

// }
export function clear() {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  context.beginPath();
  context.closePath();
}
export function initCanvas(canvasElement) {
  canvas = canvasElement
  if (canvas.clientWidth) { canvas.width = canvas.clientWidth; }
  if (canvas.clientHeight) { canvas.height = canvas.clientHeight; }
  context = canvas.getContext('2d');
}
export function setPerspective(x, y) {
  perspective = {
    x: x - canvas.width / 2,
    y: -y - canvas.height / 2
  }
}
export function drawPlayer(player) {
  player.trail.forEach((item, index) => {
    context.save();
    context.translate(item.x, -item.y);
    context.translate(-perspective.x, -perspective.y);
    context.beginPath();
    context.shadowBlur = 5;
    context.shadowColor = "rgba(255, 255, 255, " + (index + 1) / 7 + ")";
    context.fillStyle = "rgba(100, 100, 255, " + (index + 1) / 14 + ")";
    context.arc(1 - Math.random() * 2, 1 - Math.random() * 2, 8, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
    context.restore();
  })
  context.save();
  context.translate(player.position.x, -player.position.y);
  context.translate(-perspective.x, -perspective.y);
  context.rotate(player.rotation);
  var bowPoint = {
    x: 0,
    y: -73
  }
  var scale = 0.25;
  context.beginPath();
  context.moveTo(bowPoint.x, bowPoint.y)
  context.bezierCurveTo(bowPoint.x + 18 * scale, bowPoint.y, bowPoint.x + 26 * scale, bowPoint.y + 12 * scale, bowPoint.x + 36 * scale, bowPoint.y + 31 * scale);
  context.bezierCurveTo(bowPoint.x + 96 * scale, bowPoint.y + 41 * scale, bowPoint.x + 222 * scale, bowPoint.y + 46 * scale, bowPoint.x + 250 * scale, bowPoint.y + 85 * scale);
  context.bezierCurveTo(bowPoint.x + 256 * scale, bowPoint.y + 90 * scale, bowPoint.x + 270 * scale, bowPoint.y + 102 * scale, bowPoint.x + 286 * scale, bowPoint.y + 117 * scale);
  context.bezierCurveTo(bowPoint.x + 285 * scale, bowPoint.y + 118 * scale, bowPoint.x + 269 * scale, bowPoint.y + 137 * scale, bowPoint.x + 237 * scale, bowPoint.y + 137 * scale);
  context.bezierCurveTo(bowPoint.x + 226 * scale, bowPoint.y + 137 * scale, bowPoint.x + 208 * scale, bowPoint.y + 125 * scale, bowPoint.x + 187 * scale, bowPoint.y + 111 * scale);
  context.bezierCurveTo(bowPoint.x + 152 * scale, bowPoint.y + 88 * scale, bowPoint.x + 104 * scale, bowPoint.y + 57 * scale, bowPoint.x + 48 * scale, bowPoint.y + 57 * scale);
  context.lineTo(bowPoint.x + 48 * scale, bowPoint.y + 67 * scale);
  context.bezierCurveTo(bowPoint.x + 101 * scale, bowPoint.y + 67 * scale, bowPoint.x + 146 * scale, bowPoint.y + 96 * scale, bowPoint.x + 182 * scale, bowPoint.y + 120 * scale);
  context.bezierCurveTo(bowPoint.x + 204 * scale, bowPoint.y + 135 * scale, bowPoint.x + 222 * scale, bowPoint.y + 147 * scale, bowPoint.x + 237 * scale, bowPoint.y + 147 * scale);
  context.bezierCurveTo(bowPoint.x + 271 * scale, bowPoint.y + 147 * scale, bowPoint.x + 290 * scale, bowPoint.y + 127 * scale, bowPoint.x + 293 * scale, bowPoint.y + 124 * scale);
  context.bezierCurveTo(bowPoint.x + 345 * scale, bowPoint.y + 175 * scale, bowPoint.x + 420 * scale, bowPoint.y + 256 * scale, bowPoint.x + 395 * scale, bowPoint.y + 279 * scale);
  context.bezierCurveTo(bowPoint.x + 390 * scale, bowPoint.y + 282 * scale, bowPoint.x + 381 * scale, bowPoint.y + 283 * scale, bowPoint.x + 369 * scale, bowPoint.y + 282 * scale);
  context.bezierCurveTo(bowPoint.x + 351 * scale, bowPoint.y + 269 * scale, bowPoint.x + 184 * scale, bowPoint.y + 176 * scale, bowPoint.x + 153 * scale, bowPoint.y + 176 * scale);
  context.bezierCurveTo(bowPoint.x + 138 * scale, bowPoint.y + 176 * scale, bowPoint.x + 118 * scale, bowPoint.y + 188 * scale, bowPoint.x + 92 * scale, bowPoint.y + 211 * scale);
  context.bezierCurveTo(bowPoint.x + 73 * scale, bowPoint.y + 229 * scale, bowPoint.x + 56 * scale, bowPoint.y + 250 * scale, bowPoint.x + 56 * scale, bowPoint.y + 250 * scale);
  context.lineTo(bowPoint.x + 51 * scale, bowPoint.y + 251 * scale);
  context.bezierCurveTo(bowPoint.x + 41 * scale, bowPoint.y + 295 * scale, bowPoint.x + 22 * scale, bowPoint.y + 290 * scale, bowPoint.x + 0 * scale, bowPoint.y + 290 * scale);
  context.bezierCurveTo(bowPoint.x - 22 * scale, bowPoint.y + 290 * scale, bowPoint.x - 41 * scale, bowPoint.y + 295 * scale, bowPoint.x - 51 * scale, bowPoint.y + 251 * scale);
  context.lineTo(bowPoint.x - 56 * scale, bowPoint.y + 250 * scale);
  context.bezierCurveTo(bowPoint.x - 56 * scale, bowPoint.y + 250 * scale, bowPoint.x - 73 * scale, bowPoint.y + 229 * scale, bowPoint.x - 92 * scale, bowPoint.y + 211 * scale);
  context.bezierCurveTo(bowPoint.x - 118 * scale, bowPoint.y + 188 * scale, bowPoint.x - 138 * scale, bowPoint.y + 176 * scale, bowPoint.x - 153 * scale, bowPoint.y + 176 * scale);
  context.bezierCurveTo(bowPoint.x - 184 * scale, bowPoint.y + 176 * scale, bowPoint.x - 351 * scale, bowPoint.y + 269 * scale, bowPoint.x - 369 * scale, bowPoint.y + 282 * scale);
  context.bezierCurveTo(bowPoint.x - 381 * scale, bowPoint.y + 283 * scale, bowPoint.x - 390 * scale, bowPoint.y + 282 * scale, bowPoint.x - 395 * scale, bowPoint.y + 279 * scale);
  context.bezierCurveTo(bowPoint.x - 420 * scale, bowPoint.y + 256 * scale, bowPoint.x - 345 * scale, bowPoint.y + 175 * scale, bowPoint.x - 293 * scale, bowPoint.y + 124 * scale);
  context.bezierCurveTo(bowPoint.x - 290 * scale, bowPoint.y + 127 * scale, bowPoint.x - 271 * scale, bowPoint.y + 147 * scale, bowPoint.x - 237 * scale, bowPoint.y + 147 * scale);
  context.bezierCurveTo(bowPoint.x - 222 * scale, bowPoint.y + 147 * scale, bowPoint.x - 204 * scale, bowPoint.y + 135 * scale, bowPoint.x - 182 * scale, bowPoint.y + 120 * scale);
  context.bezierCurveTo(bowPoint.x - 146 * scale, bowPoint.y + 96 * scale, bowPoint.x - 101 * scale, bowPoint.y + 67 * scale, bowPoint.x - 48 * scale, bowPoint.y + 67 * scale);
  context.lineTo(bowPoint.x - 48 * scale, bowPoint.y + 57 * scale);
  context.bezierCurveTo(bowPoint.x - 104 * scale, bowPoint.y + 57 * scale, bowPoint.x - 152 * scale, bowPoint.y + 88 * scale, bowPoint.x - 187 * scale, bowPoint.y + 111 * scale);
  context.bezierCurveTo(bowPoint.x - 208 * scale, bowPoint.y + 125 * scale, bowPoint.x - 226 * scale, bowPoint.y + 137 * scale, bowPoint.x - 237 * scale, bowPoint.y + 137 * scale);
  context.bezierCurveTo(bowPoint.x - 269 * scale, bowPoint.y + 137 * scale, bowPoint.x - 285 * scale, bowPoint.y + 118 * scale, bowPoint.x - 286 * scale, bowPoint.y + 117 * scale);
  context.bezierCurveTo(bowPoint.x - 270 * scale, bowPoint.y + 102 * scale, bowPoint.x - 256 * scale, bowPoint.y + 90 * scale, bowPoint.x - 250 * scale, bowPoint.y + 85 * scale);
  context.bezierCurveTo(bowPoint.x - 222 * scale, bowPoint.y + 46 * scale, bowPoint.x - 96 * scale, bowPoint.y + 41 * scale, bowPoint.x - 36 * scale, bowPoint.y + 31 * scale);
  context.bezierCurveTo(bowPoint.x - 26 * scale, bowPoint.y + 12 * scale, bowPoint.x - 18 * scale, bowPoint.y, bowPoint.x, bowPoint.y);
  context.fillStyle = "rgba(0, 0, 0, 1)";
  context.fill();
  context.closePath();

  context.shadowBlur = 5;
  var accelerator = 0
  if (player.poweringUp > 0) accelerator = Math.sin(player.poweringUp / 100 * Math.PI / 2);
  var power = (1 + Math.sin(accelerator * Math.PI * 5 - 0.5 * Math.PI)) / 2
  if (player.poweringUp < 100 && power * Math.random() < 0.5) power = 0;
  if (player.poweringUp < 70) power = power * Math.random();
  context.shadowColor = "rgba(200, 230, 255, " + power + ")";
  context.fillStyle = "rgba(200, 230, 255, " + power + ")";
  context.closePath();
  context.beginPath();
  context.moveTo(bowPoint.x + 286 * scale, bowPoint.y + 117 * scale)
  context.bezierCurveTo(bowPoint.x + 285 * scale, bowPoint.y + 118 * scale, bowPoint.x + 269 * scale, bowPoint.y + 137 * scale, bowPoint.x + 237 * scale, bowPoint.y + 137 * scale);
  context.bezierCurveTo(bowPoint.x + 226 * scale, bowPoint.y + 137 * scale, bowPoint.x + 208 * scale, bowPoint.y + 125 * scale, bowPoint.x + 187 * scale, bowPoint.y + 111 * scale);
  context.bezierCurveTo(bowPoint.x + 152 * scale, bowPoint.y + 88 * scale, bowPoint.x + 104 * scale, bowPoint.y + 57 * scale, bowPoint.x + 48 * scale, bowPoint.y + 57 * scale);
  context.lineTo(bowPoint.x + 48 * scale, bowPoint.y + 67 * scale);
  context.bezierCurveTo(bowPoint.x + 101 * scale, bowPoint.y + 67 * scale, bowPoint.x + 146 * scale, bowPoint.y + 96 * scale, bowPoint.x + 182 * scale, bowPoint.y + 120 * scale);
  context.bezierCurveTo(bowPoint.x + 204 * scale, bowPoint.y + 135 * scale, bowPoint.x + 222 * scale, bowPoint.y + 147 * scale, bowPoint.x + 237 * scale, bowPoint.y + 147 * scale);
  context.bezierCurveTo(bowPoint.x + 271 * scale, bowPoint.y + 147 * scale, bowPoint.x + 290 * scale, bowPoint.y + 127 * scale, bowPoint.x + 293 * scale, bowPoint.y + 124 * scale);
  context.lineTo(bowPoint.x + 286 * scale, bowPoint.y + 117 * scale);
  context.fill();
  context.closePath();
  context.beginPath();
  context.moveTo(bowPoint.x - 293 * scale, bowPoint.y + 124 * scale)
  context.bezierCurveTo(bowPoint.x - 290 * scale, bowPoint.y + 127 * scale, bowPoint.x - 271 * scale, bowPoint.y + 147 * scale, bowPoint.x - 237 * scale, bowPoint.y + 147 * scale);
  context.bezierCurveTo(bowPoint.x - 222 * scale, bowPoint.y + 147 * scale, bowPoint.x - 204 * scale, bowPoint.y + 135 * scale, bowPoint.x - 182 * scale, bowPoint.y + 120 * scale);
  context.bezierCurveTo(bowPoint.x - 146 * scale, bowPoint.y + 96 * scale, bowPoint.x - 101 * scale, bowPoint.y + 67 * scale, bowPoint.x - 48 * scale, bowPoint.y + 67 * scale);
  context.lineTo(bowPoint.x - 48 * scale, bowPoint.y + 57 * scale);
  context.bezierCurveTo(bowPoint.x - 104 * scale, bowPoint.y + 57 * scale, bowPoint.x - 152 * scale, bowPoint.y + 88 * scale, bowPoint.x - 187 * scale, bowPoint.y + 111 * scale);
  context.bezierCurveTo(bowPoint.x - 208 * scale, bowPoint.y + 125 * scale, bowPoint.x - 226 * scale, bowPoint.y + 137 * scale, bowPoint.x - 237 * scale, bowPoint.y + 137 * scale);
  context.bezierCurveTo(bowPoint.x - 269 * scale, bowPoint.y + 137 * scale, bowPoint.x - 285 * scale, bowPoint.y + 118 * scale, bowPoint.x - 286 * scale, bowPoint.y + 117 * scale);
  context.lineTo(bowPoint.x - 293 * scale, bowPoint.y + 124 * scale)
  context.fill();
  context.closePath();
  context.beginPath();
  context.moveTo(bowPoint.x + 51 * scale, bowPoint.y + 77 * scale);
  context.bezierCurveTo(bowPoint.x + 68 * scale, bowPoint.y + 95 * scale, bowPoint.x + 77 * scale, bowPoint.y + 114 * scale, bowPoint.x + 77 * scale, bowPoint.y + 134 * scale);
  context.bezierCurveTo(bowPoint.x + 77 * scale, bowPoint.y + 153 * scale, bowPoint.x + 70 * scale, bowPoint.y + 170 * scale, bowPoint.x + 58 * scale, bowPoint.y + 183 * scale);
  context.lineTo(bowPoint.x + 59 * scale, bowPoint.y + 165 * scale);
  context.bezierCurveTo(bowPoint.x + 64 * scale, bowPoint.y + 156 * scale, bowPoint.x + 67 * scale, bowPoint.y + 145 * scale, bowPoint.x + 67 * scale, bowPoint.y + 134 * scale);
  context.bezierCurveTo(bowPoint.x + 67 * scale, bowPoint.y + 121 * scale, bowPoint.x + 62 * scale, bowPoint.y + 108 * scale, bowPoint.x + 55 * scale, bowPoint.y + 96 * scale);
  context.lineTo(bowPoint.x + 51 * scale, bowPoint.y + 77 * scale);
  context.fill();
  context.closePath();
  context.beginPath();
  context.moveTo(bowPoint.x - 51 * scale, bowPoint.y + 77 * scale);
  context.bezierCurveTo(bowPoint.x - 68 * scale, bowPoint.y + 95 * scale, bowPoint.x - 77 * scale, bowPoint.y + 114 * scale, bowPoint.x - 77 * scale, bowPoint.y + 134 * scale);
  context.bezierCurveTo(bowPoint.x - 77 * scale, bowPoint.y + 153 * scale, bowPoint.x - 70 * scale, bowPoint.y + 170 * scale, bowPoint.x - 58 * scale, bowPoint.y + 183 * scale);
  context.lineTo(bowPoint.x - 59 * scale, bowPoint.y + 165 * scale);
  context.bezierCurveTo(bowPoint.x - 64 * scale, bowPoint.y + 156 * scale, bowPoint.x - 67 * scale, bowPoint.y + 145 * scale, bowPoint.x - 67 * scale, bowPoint.y + 134 * scale);
  context.bezierCurveTo(bowPoint.x - 67 * scale, bowPoint.y + 121 * scale, bowPoint.x - 62 * scale, bowPoint.y + 108 * scale, bowPoint.x - 55 * scale, bowPoint.y + 96 * scale);
  context.lineTo(bowPoint.x - 51 * scale, bowPoint.y + 77 * scale);
  context.fill();
  context.closePath();
  context.beginPath();
  context.moveTo(bowPoint.x + 275 * scale, bowPoint.y + 166 * scale);
  context.lineTo(bowPoint.x + 343 * scale, bowPoint.y + 225 * scale);
  context.lineTo(bowPoint.x + 336 * scale, bowPoint.y + 233 * scale);
  context.lineTo(bowPoint.x + 269 * scale, bowPoint.y + 174 * scale);
  context.lineTo(bowPoint.x + 275 * scale, bowPoint.y + 166 * scale);
  context.fill();
  context.closePath();
  context.beginPath();
  context.moveTo(bowPoint.x - 275 * scale, bowPoint.y + 166 * scale);
  context.lineTo(bowPoint.x - 343 * scale, bowPoint.y + 225 * scale);
  context.lineTo(bowPoint.x - 336 * scale, bowPoint.y + 233 * scale);
  context.lineTo(bowPoint.x - 269 * scale, bowPoint.y + 174 * scale);
  context.lineTo(bowPoint.x - 275 * scale, bowPoint.y + 166 * scale);
  context.fill();
  context.closePath();
  context.beginPath();
  context.moveTo(bowPoint.x + 50 * scale, bowPoint.y + 247 * scale);
  context.lineTo(bowPoint.x - 50 * scale, bowPoint.y + 247 * scale);
  context.lineTo(bowPoint.x - 50 * scale, bowPoint.y + 258 * scale);
  context.lineTo(bowPoint.x + 50 * scale, bowPoint.y + 258 * scale);
  context.lineTo(bowPoint.x + 50 * scale, bowPoint.y + 247 * scale);
  context.fill();
  context.restore();
}
export function drawDarkness(darkness, players) {
  const darknessCanvas = new OffscreenCanvas(context.canvas.width, context.canvas.height)
  const offscreenContext = darknessCanvas.getContext('2d');
  //draw visual effect for lights

  //var fullCanvasPath = new Path2D();
  //radial darkness
  var _radialLightGradient = offscreenContext.createRadialGradient(offscreenContext.canvas.width / 2, offscreenContext.canvas.height / 2, 0, offscreenContext.canvas.width / 2, offscreenContext.canvas.height / 2, 1000);
  _radialLightGradient.addColorStop(0, "rgba(0, 0, 0, " + darkness + ")");
  _radialLightGradient.addColorStop(1, "#000");
  offscreenContext.beginPath();
  offscreenContext.moveTo(0, 0);
  offscreenContext.lineTo(offscreenContext.canvas.width, 0);
  offscreenContext.lineTo(offscreenContext.canvas.width, offscreenContext.canvas.height);
  offscreenContext.lineTo(0, offscreenContext.canvas.height);
  offscreenContext.lineTo(0, 0);
  offscreenContext.closePath();
  offscreenContext.fillStyle = _radialLightGradient;
  offscreenContext.fill();
  //extract player headlights
  offscreenContext.globalCompositeOperation = "destination-out";
  players.forEach(player => {
    offscreenContext.save();
    offscreenContext.translate(player.position.x, -player.position.y);
    offscreenContext.translate(-perspective.x, -perspective.y);
    offscreenContext.rotate(player.rotation - Math.PI / 2);
    offscreenContext.translate(60, 0);
    offscreenContext.beginPath();
    offscreenContext.moveTo(0, 0);
    offscreenContext.arc(0, 0, player.headlight.range, -player.headlight.angle / 2, player.headlight.angle / 2);
    offscreenContext.moveTo(0, 0);
    offscreenContext.closePath();
    var _spotLightGradient = offscreenContext.createRadialGradient(0, 0, 0, 0, 0, player.headlight.range);
    var accelerator = 0
    if (player.poweringUp > 0) accelerator = Math.sin(player.poweringUp / 100 * Math.PI / 2);
    var power = (1 + Math.sin(accelerator * Math.PI * 5 - 0.5 * Math.PI)) / 2
    if (player.poweringUp < 100 && power * Math.random() < 0.5) power = 0;
    _spotLightGradient.addColorStop(0, "rgba(0, 0, 0, " + 1 * player.headlight.intensity * power + ")");
    _spotLightGradient.addColorStop(1, "transparent");
    offscreenContext.fillStyle = _spotLightGradient;
    offscreenContext.fill();
    var numberOfRays = 3;
    if (numberOfRays > 1) {
      var angleOffset = 0;
      var angleOfRay = player.headlight.angle / (numberOfRays * 2 - 1);
      for (var j = numberOfRays - 1; j >= 0; j--) {
        angleOffset = j * player.headlight.angle / (numberOfRays * 2 - 1) * 2;
        offscreenContext.beginPath();
        offscreenContext.moveTo(0, 0);
        offscreenContext.arc(0, 0, player.headlight.range, -player.headlight.angle / 2 + angleOffset, -player.headlight.angle / 2 + angleOffset + angleOfRay);
        offscreenContext.moveTo(0, 0);
        offscreenContext.closePath();
        offscreenContext.fillStyle = _spotLightGradient;
        offscreenContext.fill();
      }
    }
    offscreenContext.restore();
  })
  offscreenContext.globalCompositeOperation = "source-over";
  context.drawImage(darknessCanvas, 0, 0);
}
export function drawTile(tile) {
  const defualtColor = Biomes.find(biome => biome.type === BiomeTypes.DEFAULT).backgroundColor
  const { biomeBackgroundColor, biomeMid, biomeSize } = tile
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(context.canvas.width, 0);
  context.lineTo(context.canvas.width, context.canvas.height);
  context.lineTo(0, context.canvas.height);
  context.lineTo(0, 0);
  context.closePath();
  context.fillStyle = "rgba(" + defualtColor.r + ", " + defualtColor.g + ", " + defualtColor.b + ", 1)";
  context.fill();
  // context.strokeStyle = "rgba(0,255,255,1)";
  // context.stroke();
  context.beginPath();
  context.arc(biomeMid.x, biomeMid.y, biomeSize / 2, 0, 2 * Math.PI, false);
  const biomeGradient = context.createRadialGradient(biomeMid.x, biomeMid.y, 0, biomeMid.x, biomeMid.y, biomeSize / 2);
  biomeGradient.addColorStop(0, "rgba(" + biomeBackgroundColor.r + ", " + biomeBackgroundColor.g + ", " + biomeBackgroundColor.b + ", " + biomeBackgroundColor.a + ")");
  biomeGradient.addColorStop(1, "transparent");
  context.fillStyle = biomeGradient;
  // context.strokeStyle = "rgba(0,255,255,1)";
  // context.stroke();
  context.fill();
  context.closePath();
  tile.nebulaFields.forEach(nebula => drawNebula(nebula));
  tile.stars.forEach(star => { drawStar(star); })
  tile.planets.forEach(planet => { drawPlanet(planet); })
  // if (tile.biomeReceptors) tile.biomeReceptors.forEach(point => { drawBiomePoints(point); })
}
export function drawTiles(tiles) {
  tiles.forEach(tile => {
    context.putImageData(tile.imageData, tile.position.x - perspective.x, tile.position.y - perspective.y);
  })
}
function drawBiomePoints(point) {
  const { position, size } = point
  const context = this.ctx;
  context.beginPath();
  context.arc(position.x, position.y, size / 2, 0, 2 * Math.PI, false);
  context.fillStyle = "rgba(0,255,255,1)";
  context.fill();
  context.closePath();
}
function drawStar(star) {
  const { position, size, color } = star
  const starGradient = context.createRadialGradient(position.x, position.y, 0, position.x, position.y, size / 2);
  starGradient.addColorStop(0, "rgba(" + color.r + ", " + color.g + ", " + color.b + ", " + color.a + ")");
  starGradient.addColorStop(1, "transparent");
  context.beginPath();
  context.arc(position.x, position.y, size / 2, 0, 2 * Math.PI, false);
  context.fillStyle = starGradient;
  context.fill();
  context.closePath();
}
function drawNebula(nebula) {
  nebula.circles.forEach(circle => {
    context.save();
    context.translate(nebula.position.x, nebula.position.y);
    context.rotate(circle.angle);
    context.beginPath();
    context.arc(0, circle.distance, circle.size, 0, 2 * Math.PI, false);
    const fog = context.createRadialGradient(0, circle.distance, 0, 0, circle.distance, circle.size);
    fog.addColorStop(0, "rgba(" + circle.color.r + "," + circle.color.g + ", " + circle.color.b + "," + circle.color.a + ")");
    fog.addColorStop(1, "transparent");
    context.fillStyle = fog;
    context.fill();
    context.closePath();
    context.restore();
  })
}
function drawPlanet(planet) {
  var color = planet.color;
  var radius = planet.size / 2
  context.save();
  context.translate(planet.positionInTile.x, planet.positionInTile.y);
  context.rotate(planet.rotation);
  const atmosphere = context.createRadialGradient(0, 0, radius / 2, 0, 0, radius);
  atmosphere.addColorStop(0, "rgba(" + color.r + "," + color.g + ", " + color.b + ", 0.4)");
  atmosphere.addColorStop(1, "transparent");
  context.beginPath();
  context.arc(0, 0, radius, 0, 2 * Math.PI, false);
  context.fillStyle = atmosphere;
  context.fill();
  context.closePath();

  const ring = context.createRadialGradient(0, 0, radius / 2, 0, 0, radius / 1.5);
  const stops = planet.atmosphereRings * 2 + 1;
  for (let index = 0; index < planet.atmosphereRings; index++) {
    const stop1 = (2 * (index + 1) - 1) / stops
    const stop2 = 2 * (index + 1) / stops
    ring.addColorStop(stop1, "transparent");
    ring.addColorStop(stop2, "rgba(" + color.r + "," + color.g + ", " + color.b + ", 0.2)");
  }
  ring.addColorStop(1, "transparent");
  context.beginPath();
  context.arc(0, 0, radius, 0, 2 * Math.PI, false);
  context.fillStyle = ring;
  context.fill();
  context.closePath();
  //clip
  context.beginPath();
  context.arc(0, 0, radius / 2, 0, 2 * Math.PI, false);
  context.closePath();
  context.clip();
  //base
  context.beginPath();
  context.arc(0, 0, radius / 2, 0, 2 * Math.PI, false);
  context.fillStyle = "rgb(" + color.r + "," + color.g + ", " + color.b + ")";
  context.fill();
  context.closePath();
  //texture
  if (planet.texture && planet.texture.type === "ringTexture") {
    var color = planet.texture.color;
    const rings = planet.texture.rings;
    const offset = Math.sqrt(Math.pow(radius, 2) + Math.pow(radius, 2))
    for (let index = 0; index < rings; index++) {
      const lineWidth = radius / rings / 5 * 2
      const size = radius * 3 / 2 + (index + 1) * radius / (rings + 1);
      context.beginPath();
      context.arc(offset, offset, size, 0, 2 * Math.PI, false);
      context.strokeStyle = "rgba(" + color.r + "," + color.g + ", " + color.b + ", " + color.a + ")";
      context.lineWidth = lineWidth;
      context.stroke();
      context.closePath();
    }
  }
  if (planet.texture && planet.texture.type === "cicleTexture") {
    var color = planet.texture.color;
    const textureCanvas = new OffscreenCanvas(planet.size, planet.size)
    const textureContext = textureCanvas.getContext('2d');
    textureContext.beginPath();
    textureContext.moveTo(0, 0);
    textureContext.lineTo(textureContext.canvas.width, 0);
    textureContext.lineTo(textureContext.canvas.width, textureContext.canvas.height);
    textureContext.lineTo(0, textureContext.canvas.height);
    textureContext.lineTo(0, 0);
    textureContext.closePath();
    textureContext.strokeStyle = "rgba(" + color.r + "," + color.g + ", " + color.b + ", " + color.a + ")";
    textureContext.stroke();
    planet.texture.circles.forEach(circle => {
      textureContext.save();
      textureContext.translate(planet.size / 2, planet.size / 2);
      textureContext.rotate(circle.angle);
      textureContext.translate(circle.distance, 0);
      textureContext.beginPath();
      textureContext.arc(0, 0, circle.size / 2, 0, 2 * Math.PI, false);
      textureContext.fillStyle = "rgba(" + color.r + "," + color.g + ", " + color.b + ", " + color.a + ")";
      textureContext.fill();
      textureContext.closePath();
      textureContext.restore();
    })
    context.drawImage(textureCanvas, -planet.size / 2, -planet.size / 2);
  }
  //shadow
  const outlineShadow = context.createRadialGradient(0, 0, radius / 4, 0, 0, radius / 4 * 3);
  outlineShadow.addColorStop(0, "transparent");
  outlineShadow.addColorStop(1, "rgba(0, 0, 0, 1)");
  context.beginPath();
  context.arc(0, 0, radius / 2, 0, 2 * Math.PI, false);
  context.fillStyle = outlineShadow;
  context.fill();
  context.closePath();
  const ambientShadow = context.createRadialGradient(0, 0, 0, 0, 0, radius / 1.5);
  ambientShadow.addColorStop(0, "transparent");
  ambientShadow.addColorStop(1, "rgba(0, 0, 0, 0.5)");
  context.beginPath();
  context.arc(0, 0, radius / 2, 0, 2 * Math.PI, false);
  context.fillStyle = ambientShadow;
  context.fill();
  context.closePath();
  context.restore();

}
export function drawRainbow(size, intensity, rotation) {
  context.save()
  context.translate(context.canvas.width / 2, context.canvas.height / 2)
  context.rotate(rotation)
  context.translate(size / 2 - context.canvas.height / 2 * intensity, 0)
  let _ring = context.createRadialGradient(0, 0, 0, 0, 0, size / 2);
  _ring.addColorStop(0.98, "transparent");
  _ring.addColorStop(0.985, "rgba(0, 0, 255, " + intensity / 10 + ")");
  _ring.addColorStop(0.99, "rgba(0, 255, 0, " + intensity / 10 + ")");
  _ring.addColorStop(0.995, "rgba(255, 0, 0, " + intensity / 10 + ")");
  _ring.addColorStop(1, "transparent");
  context.beginPath();
  context.arc(0, 0, size / 2, 0, 2 * Math.PI, false);
  context.fillStyle = _ring;
  context.fill();
  context.closePath();
  context.restore()
}
export function drawPowerGuage(actual, max) {
  context.save()
  context.shadowBlur = 15;
  context.shadowColor = "rgba(200, 230, 255, " + 1 + ")";
  context.strokeStyle = "rgba(200, 230, 255, " + 1 + ")";
  context.fillStyle = "rgba(200, 230, 255, " + 1 + ")";
  context.translate(100, context.canvas.height - 100)
  context.translate(0, -45)
  context.beginPath();
  context.moveTo(2, 0);
  context.lineTo(2, 16);
  context.lineTo(10, 16);
  context.lineTo(-2, 45);
  context.lineTo(-2, 24);
  context.lineTo(-10, 24);
  context.closePath();
  context.fill();
  context.translate(0, 45)
  context.font = "30px Arial, Helvetica, sans-serif";
  context.textAlign = "center";
  context.fillText(Math.ceil(actual * 10), 0, 40);
  context.beginPath();
  context.arc(0, 0, 75, 0, 2 * Math.PI, false);
  context.closePath();
  context.lineWidth = 4
  context.stroke();
  context.beginPath();
  context.rotate(-Math.PI / 2)
  context.arc(0, 0, 82, 0, 2 * Math.PI * actual / max, false);
  context.lineWidth = 15
  context.stroke();
  context.restore()
}