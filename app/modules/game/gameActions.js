import levels from './levels'

export const LOAD_LEVEL = 'LOAD_LEVEL'
export const LOAD_STATS = 'LOAD_STATS'

export function loadLevel(level) {
  return {
    type: LOAD_LEVEL,
    level,
  }
}

export const loadNextLevel = () => {
  return (dispatch, getState) => {
    const currentLevel = getState().game.level
    const index = levels.indexOf(currentLevel)
    const nextLevel = levels[index + 1]

    return dispatch(loadLevel(nextLevel))
  }
}

export function loadStats(stats) {
  return {
    type: LOAD_STATS,
    stats,
  }
}

export const actions = {
  loadNextLevel,
  loadStats,
}
