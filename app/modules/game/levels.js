import { NORMIE, CLICKER } from './tileTypes'

const level0 = {
  layout: [
    [{ type: NORMIE, value: 1 }, { type: NORMIE, value: 2 }],
  ],
  values: [],
}

const level1 = {
  layout: [
    [{ type: NORMIE, value: 2 }, { type: NORMIE, value: 3 }, { type: NORMIE, value: 1 }],
  ],
  values: [],
}

const level2 = {
  layout: [
    [{ type: NORMIE, value: 3 }],
    [{ type: NORMIE, value: 2 }],
    [{ type: NORMIE, value: 1 }],
  ],
  values: [],
}

const level3 = {
  layout: [
    [{ type: NORMIE, value: 2 }, { type: NORMIE, value: 3 }],
    [{ type: NORMIE, value: 4 }, { type: NORMIE, value: 1 }],
  ],
  values: [],
}

const level4 = {
  layout: [
    [{ type: NORMIE, value: 3 }, { type: NORMIE, value: 1 }],
    [{ type: NORMIE, value: 2 }, { type: NORMIE, value: 4 }],
  ],
  values: [],
}

const level5 = {
  layout: [
    [{ type: NORMIE, value: 3 }],
    [{ type: NORMIE, value: 1 }],
    [{ type: NORMIE, value: 2 }],
    [{ type: NORMIE, value: 4 }],
  ],
  values: [],
}

const level6 = {
  layout: [
    [{ type: NORMIE, value: 4 }, { type: NORMIE, value: 3 }, { type: NORMIE, value: 2 }, { type: NORMIE, value: 1 }],
  ],
  values: [],
}

const level7 = {
  layout: [
    [{ type: NORMIE, value: 1 }, { type: NORMIE, value: 3 }, { type: NORMIE, value: 5 }, { type: NORMIE, value: 4 }, { type: NORMIE, value: 2 }],
  ],
  values: [],
}

const level8 = {
  layout: [
    [{ type: NORMIE, value: 6 }, { type: NORMIE, value: 1 }, { type: NORMIE, value: 4 }],
    [{ type: NORMIE, value: 5 }, { type: NORMIE, value: 2 }, { type: NORMIE, value: 3 }],
  ],
  values: [],
}

const level9 = {
  layout: [
    [{ type: NORMIE, value: 2 }, { type: NORMIE, value: 3 }],
    [{ type: NORMIE, value: 6 }, { type: NORMIE, value: 5 }],
    [{ type: NORMIE, value: 4 }, { type: NORMIE, value: 1 }],
  ],
  values: [],
}

// const level3 = {
//   layout: [
//     [{ type: NORMIE, value: 3 }, { type: CLICKER, values: [2, 4] }, { type: NORMIE, value: 1 }],
//   ],
//   values: [],
// }

export default [
  level0,
  level1,
  level2,
  level3,
  level4,
  level5,
  level6,
  level7,
  level8,
  level9,
]
