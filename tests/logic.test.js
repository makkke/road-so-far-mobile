import test from 'ava'

import * as logic from '../app/modules/game/logic'

test('getMinValue() should return min value from array', t => {
  let values = [7, 2, 6, 4, 9, 5, 6]

  t.is(logic.getMinValue(values), 2)

  values = [7, 6, 4, 9, 5, 6]
  t.is(logic.getMinValue(values), 4)

  values = [7, 6, 9, 6]
  t.is(logic.getMinValue(values), 6)

  values = [7, 9]
  t.is(logic.getMinValue(values), 7)
})
