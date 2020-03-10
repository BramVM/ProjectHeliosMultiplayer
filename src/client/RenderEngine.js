import {
  getBiomeLight,
  checkBiome
} from './biomeCalculations'
import {
  setPerspective,
  drawPlayer,
  clear,
  drawTiles,
  drawRainbow,
  drawDarkness,
  drawPowerGuage,
  drawBeacon,
  drawStation
} from './CanvasDrawer'
import {
  textConsole
} from './TextConsole'

import { stations } from '../shared/stationMoc'

function powerUpLightAnimation(powerUpProgress) {
  var accelerator = 0;
  if (powerUpProgress > 0) accelerator = Math.sin(powerUpProgress / 100 * Math.PI / 2);
  var lightIntensity = (1 + Math.sin(accelerator * Math.PI * 5 - 0.5 * Math.PI)) / 2;
  if (powerUpProgress < 100 && lightIntensity * Math.random() < 0.5) lightIntensity = 0;
  if (powerUpProgress < 70) lightIntensity = lightIntensity * Math.random();
  return lightIntensity;
}

var frame = 0;

function brokenLightAnimation() {
  var lightIntensity = (1 + Math.sin(frame / 10)) / 2;
  if (lightIntensity < 0.9) lightIntensity = 0.1;
  if (lightIntensity > 0.9) lightIntensity = lightIntensity * Math.random();
  return lightIntensity;
}

export function render(activePlayer, gameState, grid) {
  frame++;
  var lightPower = powerUpLightAnimation(activePlayer.poweringUp);
  var activePlayerToRender = {
    ...activePlayer,
    lightPower
  }

  var playersToRender = [...gameState.players].map(player => ({
    ...player,
    lightPower: player._id === activePlayer._id ? lightPower : powerUpLightAnimation(player.poweringUp)
  }));

  if (activePlayerToRender) {
    grid.update(activePlayerToRender.position);
  }
  clear();
  if (activePlayerToRender) {
    setPerspective(activePlayerToRender.position.x, activePlayerToRender.position.y);
  }
  drawTiles(grid.tiles);
  if (activePlayerToRender) {
    const biome = checkBiome(activePlayerToRender.position);
    Math.seedrandom(biome.mid.x + "rotation" + biome.mid.y);
    drawRainbow(5000, biome.intensity, Math.random() * Math.PI * 2)
  }
  if (activePlayerToRender) {
    drawDarkness(1 - getBiomeLight(activePlayerToRender.position).value, playersToRender);
  }
  stations.forEach((station) => {
    drawStation(station, brokenLightAnimation());
  })
  playersToRender.forEach((player) => {
    drawPlayer(player);
  })
  if (activePlayerToRender) {
    activePlayerToRender.beacons.forEach((beacon) => {
      drawBeacon(beacon, activePlayer.rotation);
    })
    drawPowerGuage(activePlayerToRender.power.value, activePlayerToRender.power.capacity, activePlayerToRender.lightPower)
    if (activePlayerToRender.poweringUp > 100) textConsole.hold(false);
    textConsole.render(activePlayerToRender.lightPower);
  }
}

