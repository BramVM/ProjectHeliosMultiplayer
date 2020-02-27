import Grain from './client/Grain'
import GameClient from './client/GameClient'
import { isAuthenticated, authenticate } from './client/auth/indentityAuth'

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
  if (isAuthenticated()) {
    var uri = window.location.toString();
    if (uri.indexOf("#") > 0) {
        var clean_uri = uri.substring(0, uri.indexOf("#"));
        window.history.replaceState({}, document.title, clean_uri);
    }
    grain.initCanvas(grainLayer);
    grain.initGrain();
    requestAnimationFrame(grain.loop);
    gameClient.initGameCanvas(gameCanvas);
    gameClient.start();
  } else {
    authenticate();
  }
};