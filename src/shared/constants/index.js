export const Actions = {
  CONNECTION: 'CONNECTION',
  DIRECTION_CHANGE: 'DIRECTION CHANGE',
  MOVEMENT_CHANGE: 'MOVEMENT CHANGE',
  UPDATE_PACKAGE: 'UPDATE PACKAGE'
};

export const BiomeTypes = {
  DEFAULT: 'DEFAULT',
  TOXIC: 'TOXIC',
  ICED: 'ICED',
  HOT: 'HOT'
};

export const Biomes = [
  {
    type: BiomeTypes.DEFAULT,
    backgroundColor: {
      r: 30,
      g: 10,
      b: 30,
      a: 1
    },
    light: {
      value: 0.8
    },
    nebula: {
      minNumberOfFields: 1,
      maxNumberOfFields: 5,
      minSizeFactor: 0.3,
      maxSizeFactor: 0.6,
      colorRange: {
        rMin: 0,
        rMax: 255,
        gMin: 0,
        gMax: 0,
        bMin: 90,
        bMax: 255,
        aMin: 0,
        aMax: 0.5,
      }
    },
    stars: {
      densety: 10,
      minSize: 0,
      maxSize: 15,
      colorRange: {
        rMin: 200,
        rMax: 255,
        gMin: 150,
        gMax: 200,
        bMin: 200,
        bMax: 255,
        aMin: 1,
        aMax: 1,
      }
    },
    planets: {
      maxNumberOfPlanets: 0.9,
      minNumberOfPlanets: 0,
      minSizeFactor: 0.3,
      maxSizeFactor: 0.5,
      baseColorRange: {
        rMin: 100,
        rMax: 200,
        gMin: 100,
        gMax: 200,
        bMin: 100,
        bMax: 200,
        aMin: 1,
        aMax: 1,
      },
      textureColorRange: {
        rMin: 40,
        rMax: 70,
        gMin: 40,
        gMax: 70,
        bMin: 40,
        bMax: 70,
        aMin: 1,
        aMax: 1,
      }
    }
  },
  {
    type: BiomeTypes.TOXIC,
    backgroundColor: {
      r: 30,
      g: 30,
      b: 0,
      a: 1
    },
    light: {
      value: 0.5
    },
    nebula: {
      minNumberOfFields: 1,
      maxNumberOfFields: 3,
      minSizeFactor: 0.3,
      maxSizeFactor: 0.6,
      colorRange: {
        rMin: 50,
        rMax: 100,
        gMin: 0,
        gMax: 255,
        bMin: 0,
        bMax: 0,
        aMin: 0,
        aMax: 0.2,
      }
    },
    stars: {
      densety: 5,
      minSize: 3,
      maxSize: 5,
      colorRange: {
        rMin: 255,
        rMax: 255,
        gMin: 255,
        gMax: 255,
        bMin: 255,
        bMax: 255,
        aMin: 1,
        aMax: 1,
      }
    },
    planets: {
      maxNumberOfPlanets: 1,
      minNumberOfPlanets: 1,
      minSizeFactor: 0.3,
      maxSizeFactor: 0.6,
      baseColorRange: {
        rMin: 100,
        rMax: 100,
        gMin: 100,
        gMax: 200,
        bMin: 100,
        bMax: 100,
        aMin: 1,
        aMax: 1,
      },
      textureColorRange: {
        rMin: 40,
        rMax: 70,
        gMin: 40,
        gMax: 40,
        bMin: 40,
        bMax: 40,
        aMin: 1,
        aMax: 1,
      }
    }
  },
  {
    type: BiomeTypes.ICED,
    backgroundColor: {
      r: 10,
      g: 50,
      b: 50,
      a: 1
    },
    light: {
      value: 1
    },
    nebula: {
      minNumberOfFields: 2,
      maxNumberOfFields: 5,
      minSizeFactor: 0.3,
      maxSizeFactor: 0.6,
      colorRange: {
        rMin: 0,
        rMax: 255,
        gMin: 0,
        gMax: 255,
        bMin: 50,
        bMax: 100,
        aMin: 0,
        aMax: 0.2,
      }
    },
    stars: {
      densety: 13,
      minSize: 0,
      maxSize: 20,
      colorRange: {
        rMin: 255,
        rMax: 255,
        gMin: 255,
        gMax: 255,
        bMin: 255,
        bMax: 255,
        aMin: 1,
        aMax: 1,
      }
    },
    planets: {
      maxNumberOfPlanets: 1,
      minNumberOfPlanets: 1,
      minSizeFactor: 0.3,
      maxSizeFactor: 0.6,
      baseColorRange: {
        rMin: 100,
        rMax: 100,
        gMin: 100,
        gMax: 100,
        bMin: 100,
        bMax: 200,
        aMin: 1,
        aMax: 1,
      },
      textureColorRange: {
        rMin: 40,
        rMax: 70,
        gMin: 40,
        gMax: 40,
        bMin: 40,
        bMax: 40,
        aMin: 1,
        aMax: 1,
      }
    }
  },
  {
    type: BiomeTypes.HOT,
    backgroundColor: {
      r: 0,
      g: 0,
      b: 0,
      a: 1
    },
    light: {
      value: 0.8
    },
    nebula: {
      minNumberOfFields: 2,
      maxNumberOfFields: 5,
      minSizeFactor: 0.3,
      maxSizeFactor: 0.6,
      colorRange: {
        rMin: 0,
        rMax: 255,
        gMin: 0,
        gMax: 255,
        bMin: 50,
        bMax: 100,
        aMin: 0,
        aMax: 0.2,
      }
    },
    stars: {
      densety: 13,
      minSize: 0,
      maxSize: 20,
      colorRange: {
        rMin: 255,
        rMax: 255,
        gMin: 100,
        gMax: 255,
        bMin: 100,
        bMax: 255,
        aMin: 1,
        aMax: 1,
      }
    },
    planets: {
      maxNumberOfPlanets: 1,
      minNumberOfPlanets: 1,
      minSizeFactor: 0.3,
      maxSizeFactor: 0.6,
      baseColorRange: {
        rMin: 100,
        rMax: 100,
        gMin: 100,
        gMax: 100,
        bMin: 100,
        bMax: 200,
        aMin: 1,
        aMax: 1,
      },
      textureColorRange: {
        rMin: 40,
        rMax: 70,
        gMin: 40,
        gMax: 40,
        bMin: 40,
        bMax: 40,
        aMin: 1,
        aMax: 1,
      }
    }
  },
]