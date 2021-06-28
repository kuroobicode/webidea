<template>
  <v-container>
    <h1>Inbox</h1>

    <v-row>

      <v-col cols="4">
          <Issuer />
          <AddressList />
      </v-col>

      <v-col cols="8">
        <MessagePost />
        <v-divider></v-divider>
        <br/>
        <MessageList />
      </v-col>

    </v-row>

  </v-container>

</template>

<script>

import AddressList from '@/components/AddressList.vue'
import MessageList from '@/components/MessageList.vue'

export default {
  name: 'List',
  components: {
    AddressList,
    MessageList
  },
  
  async fetch({ store, error }) {
    try {
      
      await store.dispatch('address_to/setAddresses')
      await store.dispatch('address_to/setDefaultAttendees')
      await store.dispatch('message/setMessages')

    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch events at this time. Please try again.'
      })
    }
  }

}

</script>