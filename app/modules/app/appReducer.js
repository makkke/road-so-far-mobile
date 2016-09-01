import { LOAD_APP } from './appActions'

const initialState = {}

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_APP:
      return state

    default:
      return state
  }
}

export default AppReducer
