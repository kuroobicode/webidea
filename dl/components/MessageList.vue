<template>

 
<!--  Addressにパラメーターを渡す  -->
        <v-container fluid>

          <v-row v-for="(message, id) in messages" :key="id" >
              <Message :message="message"/>
          </v-row>


        </v-container>


</template>

<script>

import Message from '@/components/Message.vue'
import { mapState,mapGetters } from 'vuex'

export default {
  name: 'MessageList',
  components: {
    Message
  }
  ,created() {
    console.log('MessageList created ')
    //console.log(state.addresses)
    // this.$store.dispatch('address_to/setMode', address_to.MODE_READ);
    // this.$store.dispatch('address_to/setAddresses');
  },
  // computed: {
  //   ...mapState(['address_to','notification'])
  //  }, 

  computed: mapState({
    messages: state => state.message.messages,
    //mode: state => state.address_to.mode
  }), 


}


</script>