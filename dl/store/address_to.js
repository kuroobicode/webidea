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
    console.log('表示モードを設定する' + state.mode);
  },
  ADD_ADDRESS(state, addresse) {
    state.addresses.push(addresse)
  },
  DEL_ADDRESS(state, id) {
    state.addresses = state.addresses.filter((address)=>{
        return(address.id != id);
      }
    )
  },
  UPD_ADDRESS(state, {target ,data}) {
    console.log('===========================start');
    console.log(target);
    for (let key in data) {
      console.log('key:' + key + ' value:' + data[key]);
      target[key] = data[key];
      //commit(key, updData[key]);
    }
    //state.address.push(addresse)
    state.address = target;
    console.log(state.address);
    console.log('===========================end');

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

      console.log('SET_MODE state=' + state)
      console.log('SET_MODE state.mode=' + state.mode)
      console.log('SET_MODE state.addressTotal=' + state.addressTotal)
      console.log('SET_MODE state.addresses=' + state.addresses)

  },

  toggleMode({ commit }) {

    // if(state.mode == MODE_READ){
    //   commit('SET_MODE', 'edit')
    //   console.log('SET_MODE read to edit:' + MODE_EDIT)
    // } else {
    //   commit('SET_MODE', 'read')
    //   console.log('SET_MODE edit to read:'  + MODE_READ)
    // }

    console.log('今 state=' + this.state)
    console.log(this.state)
    console.log('今 state.mode=' + this.state.address_to.mode)
    console.log('今 state.addressTotal=' + this.state.address_to.addressTotal)
    console.log('今 state.addresses=' + this.state.address_to.addresses)
    
    if(this.state.address_to.mode == MODE_READ){
      commit('SET_MODE', MODE_EDIT)
      console.log('SET_MODE read to edit:' + MODE_EDIT)
      console.log('変えたよstate.mode=' + this.state.address_to.mode)
    } else {
      commit('SET_MODE', MODE_READ)
      console.log('SET_MODE edit to read:' + MODE_READ)
      console.log('変えたよstate.mode=' + this.state.address_to.mode)
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
    console.log('updAddress called');

    console.log('id:' + id);
    console.log(address);
    console.log(updData);


    commit('UPD_ADDRESS', {target:address ,data:updData})
    address = getters.getAddressById(id);
    console.log('-----------------------');
    console.log(address);

    return AddressService.updateAddress(address)
      .then(() => {
        //commit('UPD_ADDRESS', updData)
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
     
        //commit('SET_ADDRESS_TOTAL', parseInt(response.headers['x-total-count']))
        // console.log('response.data:' + response.data);
        for (let id in response.data) {
           //console.log('key:' + id + ' value:' + response.data[id]["attendees"][0]['name']);
          console.log('key:' + id + ' value:' + response.data[id]["attendees"]);
        }
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
     
        //commit('SET_ADDRESS_TOTAL', parseInt(response.headers['x-total-count']))
        // console.log('response.data:' + response.data);
        for (let id in response.data) {
           //console.log('key:' + id + ' value:' + response.data[id]["attendees"][0]['name']);
          //console.log('key:' + id + ' value:' + response.data[id]["attendees"]);
        }
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
    
    console.log('commit:' + commit + '-----------------------');
    console.log('getters:' + getters + '-----------------------');
    console.log('dispatch:' + dispatch + '-----------------------');
    console.log('id:' + id);
    
    var address = getters.getAddressById(id);

    console.log('address:' + address);

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
