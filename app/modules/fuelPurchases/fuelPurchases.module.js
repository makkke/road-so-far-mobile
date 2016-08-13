import { secureApi } from '../../utils/api'

// ------------------------------------
// Constants
// ------------------------------------
const LOAD_REQUEST = 'simple-ifta/fuelPurchases/LOAD_REQUEST'
const LOAD_SUCCESS = 'simple-ifta/fuelPurchases/LOAD_SUCCESS'
const LOAD_FAILURE = 'simple-ifta/fuelPurchases/LOAD_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

// Load
export const loadRequest = () => ({
  type: LOAD_REQUEST,
})

export const loadSuccess = (fuelPurchases) => ({
  type: LOAD_SUCCESS,
  fuelPurchases,
})

export const loadFailure = (error) => ({
  type: LOAD_FAILURE,
  error,
})

export const load = () => {
  return (dispatch, getState) => {
    const { token } = getState().auth
    dispatch(loadRequest())

    return secureApi(token, 'fuelPurchases')
      .then(response => dispatch(loadSuccess(response)))
      .catch(err => {
        dispatch(loadFailure(err))
        throw err
      })
  }
}

export const actions = {
  loadFuelPurchases: load,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOAD_REQUEST]: (state) => ({
    ...state,
    isLoading: true,
  }),

  [LOAD_SUCCESS]: (state, { fuelPurchases }) => {
    return {
      ...state,
      isLoading: false,
      fuelPurchases,
    }
  },

  [LOAD_FAILURE]: (state) => ({
    ...state,
    isLoading: false,
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isLoading: false,
  fuelPurchases: [],
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
