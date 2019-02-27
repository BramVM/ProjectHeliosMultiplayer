import Grain from './client/Grain'
import GameClient from './client/GameClient'

var gameClient = new GameClient();

const grain = new Grain();
var cavasLayer = (index) => {
  let element = document.createElement('canvas');
  element.id = 'layer' + index;
  return element;
}

const gameCanvas = cavasLayer(1);
document.body.appendChild(gameCanvas);

const grainLayer = cavasLayer(2);
document.body.appendChild(grainLayer);

window.onload = function () {
  grain.initCanvas(grainLayer);
  grain.initGrain();
  requestAnimationFrame(grain.loop);
  gameClient.initGameCanvas(gameCanvas);
  gameClient.start();
};