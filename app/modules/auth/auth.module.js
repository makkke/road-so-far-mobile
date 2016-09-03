import { AsyncStorage } from 'react-native'

import api from '../../utils/api'

// ------------------------------------
// Constants
// ------------------------------------
const LOGIN_REQUEST = 'LOGIN_REQUEST'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILURE = 'LOGIN_FAILURE'

const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
const SIGNUP_FAILURE = 'SIGNUP_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

// Login
export const loginRequest = () => ({
  type: LOGIN_REQUEST,
})

export const loginSuccess = (token) => ({
  type: LOGIN_SUCCESS,
  token,
})

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  error,
})

export const login = (email, password) => {
  return (dispatch) => {
    dispatch(loginRequest())

    return api('auth/login', 'POST', { email, password })
      .then(response => dispatch(loginSuccess(response.token)))
      .catch(err => {
        dispatch(loginFailure(err))
        throw err
      })
  }
}

// Signup
export const signupRequest = () => ({
  type: SIGNUP_REQUEST,
})

export const signupSuccess = (token) => ({
  type: SIGNUP_SUCCESS,
  token,
})

export const signupFailure = (error) => ({
  type: SIGNUP_FAILURE,
  error,
})

export const signup = (user) => {
  return (dispatch) => {
    dispatch(signupRequest())

    return api('auth/signup', 'POST', user)
      .then(response => dispatch(signupSuccess(response.token)))
      .catch(err => {
        dispatch(signupFailure(err))
        throw err
      })
  }
}

// Authenticate
export const authenticate = () => {
  return (dispatch) => {
    dispatch(loginRequest())

    return AsyncStorage.getItem('token')
      .then(token => {
        if (token) {
          return dispatch(loginSuccess(token))
        }

        return dispatch(loginFailure())
      })
  }
}
export const actions = {
  authenticate,
  login,
  signup,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGIN_REQUEST]: (state) => {
    return {
      ...state,
      isAuthenticating: true,
    }
  },

  [LOGIN_SUCCESS]: (state, action) => {
    const { token } = action
    AsyncStorage.setItem('token', token)

    return {
      ...state,
      isAuthenticated: true,
      isAuthenticating: false,
      token,
    }
  },

  [LOGIN_FAILURE]: (state) => {
    AsyncStorage.removeItem('token')

    return {
      ...state,
      isAuthenticated: false,
      isAuthenticating: false,
      token: null,
    }
  },

  [SIGNUP_REQUEST]: (state) => {
    return {
      ...state,
      isAuthenticating: true,
    }
  },

  [SIGNUP_SUCCESS]: (state, action) => {
    const { token } = action
    AsyncStorage.setItem('token', token)

    return {
      ...state,
      isAuthenticated: true,
      isAuthenticating: false,
      token,
    }
  },

  [SIGNUP_FAILURE]: (state) => {
    AsyncStorage.removeItem('token')

    return {
      ...state,
      isAuthenticated: false,
      isAuthenticating: false,
      token: null,
    }
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isAuthenticated: false,
  isAuthenticating: true,
  token: null,
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
