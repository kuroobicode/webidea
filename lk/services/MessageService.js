import axios from 'axios'
//import NProgress from 'nprogress'

// json-server --d 3000 db.json

const apiClient = axios.create({
  baseURL: `http://localhost:3001`,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

// apiClient.interceptors.request.use(config => { // Called on request
//   NProgress.start()
//   return config
// })
// apiClient.interceptors.response.use(response => { // Called on response
//   NProgress.done()
//   return response
// })

export default {
  getMessages() {
    //console.log('getMessages called')
    return apiClient.get('/messages/')
  },
  postMessage(message) {
    return apiClient.post('/messages', message)
  },
}
