import { LOAD_LEVEL, LOAD_STATS } from './gameActions'
import levels from './levels'

const initialState = {
  level: levels[0],
  stats: {},
}

function GameReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_LEVEL:
      return {
        level: action.level,
        stats: state.stats,
      }

    case LOAD_STATS:
      return {
        level: state.level,
        stats: action.stats,
      }

    default:
      return state
  }
}

export default GameReducer
