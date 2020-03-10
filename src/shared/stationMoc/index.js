import {StationTileTypes} from '../constants'

export const stations = [{
  name: 'Hallo World',
  position: {
    x: -2000,
    y: 0,
  },
  tiles: [{
    x: 0,
    y: 0,
    type: StationTileTypes.ACCESS,
    broken: false
  },
  {
    x: 0,
    y: 1,
    type: StationTileTypes.POWER_GENERATOR,
    broken: true
  }
]
}]