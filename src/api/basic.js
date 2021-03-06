import axios from 'axios'
const qs = require('qs')
const API_ERROR_TYPE = {
  NETWORK_ERROR: 0,
  HTTP_STATUS_ERROR: 1,
  SERVER_STATUS_ERROR: 2,
  NOT_AUTHORIZED_ERROR: 3
}

class APIError {
  constructor (type, data) {
    this.type = type
    this.data = data
  }
}

// const isServerStatusError = response => response.code !== 'undefined' && response.code !== 0
const isServerStatusError = response => {
  if (response) {
    return false
  } else {
    return true
  }
}

const apiResponseHandler = (res) => {
  const response = res.data
  if (isServerStatusError(response)) {
    console.warn(`业务逻辑请求错误:${response.msg}`)
    return Promise.reject(new APIError(API_ERROR_TYPE.SERVER_STATUS_ERROR, response))
  }
  return response
}

const httpErrorHandler = (error) => {
  console.error('HTTP错误', error)
  if (error.response && error.response.status === 401) {
    console.error('Session过期，重新登录')
    return Promise.reject(new APIError(API_ERROR_TYPE.NOT_AUTHORIZED_ERROR, error.response))
  }
  return Promise.reject(new APIError(API_ERROR_TYPE.HTTP_STATUS_ERROR, error.response))
}

const API = axios.create({
  baseURL: '/index.php/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformRequest: [function (data) {
    let postBody = qs.stringify(data)
    return postBody
  }]
})

API.interceptors.response.use(apiResponseHandler, httpErrorHandler)

export {
  API
}
