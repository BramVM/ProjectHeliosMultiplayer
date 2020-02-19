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
  drawBeacon
} from './CanvasDrawer'
import {
  textConsole
} from './TextConsole'

function powerUpLightAnimation(powerUpProgress) {
  var accelerator = 0;
  if (powerUpProgress > 0) accelerator = Math.sin(powerUpProgress / 100 * Math.PI / 2);
  var lightIntensity = (1 + Math.sin(accelerator * Math.PI * 5 - 0.5 * Math.PI)) / 2;
  if (powerUpProgress < 100 && lightIntensity * Math.random() < 0.5) lightIntensity = 0;
  if (powerUpProgress < 70) lightIntensity = lightIntensity * Math.random();
  return lightIntensity;
}

export function render(activePlayer, gameState, grid) {
  var lightPower = powerUpLightAnimation(activePlayer.poweringUp);
  var activePlayerToRender = {
    ...activePlayer,
    lightPower
  }

  var playersToRender = [...gameState.players].map(player => ({
    ...player,
    lightPower: player.id === activePlayer.id ? lightPower : powerUpLightAnimation(player.poweringUp)
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
    activePlayerToRender.beacons.forEach((beacon) => {
      drawBeacon(beacon, activePlayer.rotation);
    })
  }
  playersToRender.forEach((player) => {
    drawPlayer(player);
  })
  if (activePlayerToRender) {
    drawPowerGuage(activePlayerToRender.power.value, activePlayerToRender.power.capacity, activePlayerToRender.lightPower)
    if (activePlayerToRender.poweringUp > 100) textConsole.hold(false);
    textConsole.render(activePlayerToRender.lightPower);
  }
}

