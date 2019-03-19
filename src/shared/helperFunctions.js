import seedrandom from 'seedrandom'

export function seedrandomBetween(minValue, maxValue, seedString) {
  minValue = maxValue < minValue ? maxValue : minValue;
  Math.seedrandom(seedString);
  return minValue + Math.random() * (maxValue - minValue)
}
