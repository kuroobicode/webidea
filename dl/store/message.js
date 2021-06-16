import MessageService from '@/services/MessageService.js'

export const namespaced = true

export const state = () => ({
  messages: [],
  message: {}
})

export const mutations = {
  
  ADD_MESSAGE(state, message) {
    //state.messages.push(message)
    state.messages.unshift(message)

  },

  SET_MESSAGES(state, messages) {
    state.messages = messages
  },

  SET_MESSAGE(state, message) {
    state.message = message
  }
}

export const actions = {

  addMessage({ commit, dispatch }, message) {
    return MessageService.postMessage(message)
      .then(() => {
        commit('ADD_MESSAGE', message)
      })
      .catch(error => {
        throw error
      })
  },
  setMessages({ commit, dispatch }) {
    MessageService.getMessages()
      .then(response => {
        for (let id in response.data) {
         console.log('key:' + id + ' value:' + response.data[id]['message']); 
        }

        let ary = response.data
        console.log('ソート前');
        console.log(ary);
        ary = ary.sort(function(a,b){
          // console.log('a');
          // console.log(a.create_timestamp)
          // console.log('b');
          // console.log(b.create_timestamp)
          // console.log(a.create_timestamp - b.create_timestamp)
          // console.log(a.create_timestamp > b.create_timestamp)
          // console.log(a.id - b.id)
          // return a.create_timestamp < b.create_timestamp

          if (a.create_timestamp > b.create_timestamp) {
            return -1;
          }
          if (a.create_timestamp < b.create_timestamp) {
            return 1;
          }
          return 0;

        })
        console.log('ソート後');
        console.log(ary);
        commit('SET_MESSAGES', ary)
      })
      .catch(error => {
      })
  },

}

export const getters = {
  getMessageById: state => id => {
    return state.messages.find(message => message.id === id)
  },

  getMessages: state => {
    // https://qiita.com/ryomaDsakamoto/items/eae134f6d8af36519560
    // ソート

    // let ary = state.messages;
    // console.log('ソート前');
    // console.log(ary);

    // ary = ary.sort(function (a, b) {
    //   return b.create_timestamp - a.create_timestamp
    // });

    // console.log('ソート後');
    // console.log(ary);
    // state.messages = ary;

    return state.messages;

    

  }

}
