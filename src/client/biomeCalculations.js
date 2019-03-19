import { Biomes, BiomeTypes } from '../shared/constants'

export function getBiomeAtPosition(position) {
  const { biome, intensity } = checkBiome(position)
  const biomeA = Biomes.find(biome => biome.type === BiomeTypes.DEFAULT)
  const biomeB = biome
  return mergeVars(biomeA, biomeB, intensity)
}

export function getBiomeNebulaColorRange(position) {
  const { biome, intensity } = checkBiome(position)
  const colorRangeA = Biomes.find(biome => biome.type === BiomeTypes.DEFAULT).nebula.colorRange
  const colorRangeB = biome.nebula.colorRange
  return mergeVars(colorRangeA, colorRangeB, intensity)
}

function mergeVars(varA, varB, intensity) {
  let result = {};
  if (isNumber(varA) && isNumber(varB)) {
    return varA * (1 - intensity) + varB * intensity
  }
  if (typeof varB === 'string') {
    return varB
  }
  if (typeof varA === 'string') {
    return varA
  }
  for (var prop in varA) {
    result[prop] = mergeVars(varA[prop], varB[prop], intensity)
  }
  return result;
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export function getBiomeStars(position) {
  const { biome, intensity } = checkBiome(position)
  const starsA = Biomes.find(biome => biome.type === BiomeTypes.DEFAULT).stars
  const starsB = biome.stars
  return mergeVars(starsA, starsB, intensity)
}

export function getBiomeLight(position) {
  const { biome, intensity } = checkBiome(position)
  const lightA = Biomes.find(biome => biome.type === BiomeTypes.DEFAULT).light
  const lightB = biome.light
  return mergeVars(lightA, lightB, intensity)
}

export function checkBiome(position) {
  const { x, y } = position
  const frequency = Math.PI / 9000;
  const sinA = 0.5 * Math.sin((x - y) * frequency);
  const sinB = 0.5 * Math.sin((x + y) * frequency);
  const indexOfSinA = Math.floor((x) / (Math.PI / frequency))
  const indexOfSinB = Math.floor((y + Math.PI / frequency / 2) / (Math.PI / frequency));
  // const seedstring = "biome" + indexOfSinA + "" +indexOfSinB;
  // Math.seedrandom(seedstring);
  const biomeMid = {
    x: indexOfSinA * Math.PI / frequency + Math.PI / frequency / 2,
    y: indexOfSinB * Math.PI / frequency,
  }
  return {
    biome: Biomes.find(biome => biome.type === BiomeTypes.TOXIC),
    intensity: Math.abs(sinA + sinB),
    mid: biomeMid,
    size: Math.PI / frequency
  };
}