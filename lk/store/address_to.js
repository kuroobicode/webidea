import AddressService from '@/services/AddressService.js'

export const namespaced = true

export const MODE_READ = 'read'
export const MODE_EDIT = 'edit'

export const state = () => ({
  mode: MODE_READ,
  addresses: [],
  address: {},
  default_addresses: [],
})

export const mutations = {
  
  //表示モードを設定する
  SET_MODE(state, mode) {
    state.mode = mode
  },
  ADD_ADDRESS(state, addresse) {
    state.addresses.push(addresse)
  },
  DEL_ADDRESS(state, id) {
    console.log(id + '削除')
    console.log(state.addresses)
    state.addresses = state.addresses.filter((address)=>{
        return(address.id != id);
      }
    )
    console.log(id + '削除後')
    console.log(state.addresses)
  },
  UPD_ADDRESS(state, {target ,data}) {
    for (let key in data) {
      console.log('key:' + key + ' value:' + data[key]);
      target[key] = data[key];
    }
    state.address = target;

  },

  SET_ADDRESSES(state, addresses) {
    state.addresses = addresses
  },
  SET_ADDRESS(state, address) {
    state.address = address
  },

  SET_DEFAULT_ADDRESSES(state, default_addresses) {
    state.default_addresses = default_addresses
  },
  
}

export const actions = {

  setMode({ commit }, mode) {
      commit('SET_MODE', mode)
  },

  toggleMode({ commit }) {

    if(this.state.address_to.mode == MODE_READ){
      commit('SET_MODE', MODE_EDIT)
    } else {
      commit('SET_MODE', MODE_READ)
    }

  },
  addAddress({ commit, dispatch }, address) {
    return AddressService.postAddress(address)
      .then(() => {
        commit('ADD_ADDRESS', address)
        const notification = {
          type: 'success',
          message: 'Your event has been created!'
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem creating your event: ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
  delAddress({ commit, dispatch }, id) {
    return AddressService.deleteAddress(id)
      .then(() => {
        commit('DEL_ADDRESS', id)
        const notification = {
          type: 'success',
          message: 'Your event has been deleted!'
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem creating your event: ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  }, 
  updAddress({ commit, getters, dispatch }, {id, updData}) {
    let address = getters.getAddressById(id);

    commit('UPD_ADDRESS', {target:address ,data:updData})
    address = getters.getAddressById(id);

    return AddressService.updateAddress(address)
      .then(() => {
        const notification = {
          type: 'success',
          message: 'Your event has been updated!'
        }
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem creating your event: ' + error.message
        }
        dispatch('notification/update', notification, { root: true })
        throw error
      })
  },    
  setAddresses({ commit, dispatch }) {
    AddressService.getAddresses()
      .then(response => {
        commit('SET_ADDRESSES', response.data)

      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching address: ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  setDefaultAttendees({ commit, dispatch }) {
    AddressService.getDefaultAttendees()
      .then(response => {
        commit('SET_DEFAULT_ADDRESSES', response.data)
      
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching address: ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  },



  fetchAddress({ commit, getters, dispatch }, id) {
    
    var address = getters.getAddressById(id);

    if (address) {
      commit('SET_ADDRESS', address)
      return address
    } else {
      AddressService.getAddress(id)
        .then(response => {
          commit('SET_ADDRESS', response.data)
          return response.data
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message: 'There was a problem fetching address: ' + error.message
          }
          dispatch('notification/add', notification, { root: true })
        })
    }
  }
}
export const getters = {
  getAddressById: state => id => {
    return state.addresses.find(address => address.id === id)
  },

  getMode: state => {
    return state.mode
  },

  getAddresses: state => {
     return state.addresses
  },

  getDefaultAddresses: state => {
    return state.default_addresses
 }  

}
