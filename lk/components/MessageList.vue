<template>

 
  <v-container fluid>

    <v-row v-for="(message, id) in messages" :key="id" >
        <Message :message="message"/>
    </v-row>

  </v-container>

</template>

<script>

import Message from '@/components/Message.vue'
import { mapState } from 'vuex'

export default {
  name: 'MessageList',
  components: {
    Message
  }
  ,created() {
    console.log('MessageList created ')
  },

  computed: mapState({
    messages: state => state.message.messages,
  }), 


}


</script>