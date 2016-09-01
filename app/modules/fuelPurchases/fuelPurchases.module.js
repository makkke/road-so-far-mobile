import { secureApi } from '../../utils/api'

// ------------------------------------
// Constants
// ------------------------------------
const LOAD_REQUEST = 'simple-ifta/fuelPurchases/LOAD_REQUEST'
const LOAD_SUCCESS = 'simple-ifta/fuelPurchases/LOAD_SUCCESS'
const LOAD_FAILURE = 'simple-ifta/fuelPurchases/LOAD_FAILURE'

const CREATE_REQUEST = 'simple-ifta/fuelPurchases/CREATE_REQUEST'
const CREATE_SUCCESS = 'simple-ifta/fuelPurchases/CREATE_SUCCESS'
const CREATE_FAILURE = 'simple-ifta/fuelPurchases/CREATE_FAILURE'

const REMOVE_REQUEST = 'simple-ifta/fuelPurchases/REMOVE_REQUEST'
const REMOVE_SUCCESS = 'simple-ifta/fuelPurchases/REMOVE_SUCCESS'
const REMOVE_FAILURE = 'simple-ifta/fuelPurchases/REMOVE_FAILURE'

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

// Create
export const createRequest = () => ({
  type: CREATE_REQUEST,
})

export const createSuccess = (fuelPurchase) => ({
  type: CREATE_SUCCESS,
  fuelPurchase,
})

export const createFailure = (error) => ({
  type: CREATE_FAILURE,
  error,
})

export const create = (fuelPurchase) => {
  return (dispatch, getState) => {
    const { token } = getState().auth
    dispatch(createRequest())

    return secureApi(token, 'fuelPurchases', 'POST', fuelPurchase)
      .then(response => dispatch(createSuccess(response)))
      .catch(err => {
        dispatch(createFailure(err))
        throw err
      })
  }
}

// Remove
export const removeRequest = () => ({
  type: REMOVE_REQUEST,
})

export const removeSuccess = (id) => ({
  type: REMOVE_SUCCESS,
  id,
})

export const removeFailure = (error) => ({
  type: REMOVE_FAILURE,
  error,
})

export const remove = (id) => {
  return (dispatch, getState) => {
    const { token } = getState().auth
    dispatch(removeRequest())

    return secureApi(token, `fuelPurchases/${id}`, 'DELETE')
      .then(() => dispatch(removeSuccess(id)))
      .catch(err => {
        dispatch(removeFailure(err))
        throw err
      })
  }
}

export const actions = {
  loadFuelPurchases: load,
  createFuelPurchase: create,
  removeFuelPurchase: remove,
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

  [CREATE_REQUEST]: (state) => ({
    ...state,
    isLoading: true,
  }),

  [CREATE_SUCCESS]: (state, { fuelPurchase }) => {
    const { fuelPurchases } = state
    fuelPurchases.push(fuelPurchase)
    // Alert.alert('debug', JSON.stringify(fuelPurchases.length))
    return {
      ...state,
      isLoading: false,
      fuelPurchases,
    }
  },

  [CREATE_FAILURE]: (state) => ({
    ...state,
    isLoading: false,
  }),

  [REMOVE_REQUEST]: (state) => ({
    ...state,
    isLoading: true,
  }),

  [REMOVE_SUCCESS]: (state, { id }) => {
    const fuelPurchases = state.fuelPurchases.filter(x => x.id !== id)

    return {
      ...state,
      isLoading: false,
      fuelPurchases,
    }
  },

  [REMOVE_FAILURE]: (state) => ({
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
