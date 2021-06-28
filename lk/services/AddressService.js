import axios from 'axios'
//import NProgress from 'nprogress'

// json-server --d 3000 db.json

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
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
  getAddresses() {
    console.log('getAddresses called')
    return apiClient.get('/addresses/')
  },
  getAddress(id) {
    return apiClient.get('/addresses/' + id)
  },
  postAddress(address) {
    return apiClient.post('/addresses', address)
  },
  deleteAddress(id) {
    return apiClient.delete('/addresses/' + id, {data: {id: id}}).then(res => {        
      console.log(id);
    })
  },

  updateAddress(updData) {
    return apiClient.put('/addresses/' + updData.id, updData).then(res => {        
      console.log(res.data);     
    })
  },

  getDefaultAttendees() {
    console.log('getDefaultAttendees called')
    return apiClient.get('/default_attendees/')
  },

}
