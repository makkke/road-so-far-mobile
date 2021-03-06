import config from '../config'

export function api(endpoint, method = 'GET', body, headers) {
  return fetch(`${config.api.url}/${endpoint}`, {
    headers: {
      ...headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method,
    body: JSON.stringify(body),
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (response.status >= 200 && response.status < 300) {
      return json
    }

    const error = new Error(response.statusText)
    error.response = response
    throw error
  })
}

export default api
