import { api } from '../../utils/api'

// ------------------------------------
// Constants
// ------------------------------------
const LOAD_REQUEST = 'LOAD_REQUEST'
const LOAD_SUCCESS = 'LOAD_SUCCESS'
const LOAD_FAILURE = 'LOAD_FAILURE'

const CREATE_REQUEST = 'CREATE_REQUEST'
const CREATE_SUCCESS = 'CREATE_SUCCESS'
const CREATE_FAILURE = 'CREATE_FAILURE'

const REMOVE_REQUEST = 'REMOVE_REQUEST'
const REMOVE_SUCCESS = 'REMOVE_SUCCESS'
const REMOVE_FAILURE = 'REMOVE_FAILURE'

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

    return api('fuelPurchases', 'GET', undefined, { Authorization: `Bearer ${token}` })
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

    return api('fuelPurchases', 'POST', { fuelPurchase }, { Authorization: `Bearer ${token}` })
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

    return api(`fuelPurchases/${id}`, 'DELETE', undefined, { Authorization: `Bearer ${token}` })
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
