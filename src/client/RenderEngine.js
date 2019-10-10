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
  drawVirtualFace
} from './CanvasDrawer'
import seedrandom from 'seedrandom'

export function render(activePlayer, gameState, grid) {
  if (activePlayer) {
    grid.update(activePlayer.position)
  }
  clear();
  if (activePlayer) {
    setPerspective(activePlayer.position.x, activePlayer.position.y);
  }
  drawTiles(grid.tiles);
  if (activePlayer) {
    const biome = checkBiome(activePlayer.position);
    Math.seedrandom(biome.mid.x + "rotation" + biome.mid.y);
    drawRainbow(5000, biome.intensity, Math.random() * Math.PI * 2)
  }
  if (activePlayer) {
    drawDarkness(1 - getBiomeLight(activePlayer.position).value, gameState.players);
  }
  gameState.players.forEach((player) => {
    drawPlayer(player);
  })
  if (activePlayer) {
    drawPowerGuage(activePlayer.power.value, activePlayer.power.capacity)
  }
  drawVirtualFace();
}
