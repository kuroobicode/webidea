<template>
  <v-container>
    <h1>List</h1>


    <v-row>
      <v-col cols="4">

        <template>
          <v-card
            class="mx-auto"
            max-width="400"
            tile
          >

          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title>Three-line item</v-list-item-title>
              <v-list-item-subtitle>
                Secondary line text Lorem ipsum dolor sit amet,
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                consectetur adipiscing elit.
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </template>

      <template>
        <v-container fluid>
 
        <!-- https://teratail.com/questions/318582 -->





       <AddressList />

<!--
          <v-row v-for="(item, index) in items" :key="index">
             <Address />

          </v-row>
-->
 


        </v-container>
      </template>

    </v-col>

    <v-col cols="8">
        <template>
          <MessagePost />
        </template>

      <v-divider></v-divider>
      
  メッセージ
  <br/>
  <br/>
  
      <template>
          <MessageList />
      </template>

    </v-col>

  </v-row>

  </v-container>

</template>

<script>
import AddressList from '@/components/AddressList.vue'
import MessageList from '@/components/MessageList.vue'
import * as address_to from '@/store/address_to.js'
import { mapState } from 'vuex'
import { uuid } from 'vue-uuid'


export default {
  name: 'List',
  components: {
    AddressList,
    MessageList
  },
  async fetch({ store, error }) {
    try {
      console.log('fetch called')
      await store.dispatch('address_to/setAddresses')
      await store.dispatch('address_to/setDefaultAttendees')
      await store.dispatch('message/setMessages')
      // console.log(store)

      // let {data} = await axios.get('http://my-api/stars')
      // let {data} = await axios.get('/addresses/')
      // store.commit('SET_ADDRESSES', data)

    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch events at this time. Please try again.'
      })
    }
  },
  data() {
    return {
      //   headers: [
      //     {
      //       text: 'Dessert (100g serving)',
      //       align: 'start',
      //       sortable: false,
      //       value: 'name',
      //     },
      //     { text: 'Calories', value: 'calories' },
      //     { text: 'Fat (g)', value: 'fat' },
      //     { text: 'Carbs (g)', value: 'carbs' },
      //     { text: 'Protein (g)', value: 'protein' },
      //     { text: 'Iron (%)', value: 'iron' },
      //   ],
      //   desserts: [
      //     {
      //       name: 'Frozen Yogurt',
      //       calories: 159,
      //       fat: 6.0,
      //       carbs: 24,
      //       protein: 4.0,
      //       iron: '1%',
      //     },
      //   ]
      // ,
      // page: 1,
      // selectedItem: 1,
      // items: [
      //   { text: 'Real-Time', icon: 'mdi-clock' },
      //   { text: 'Audience', icon: 'mdi-account' },
      //   { text: 'Conversions', icon: 'mdi-flag' },
      // ],
      // date: '2018-03-02',
      // menu: [],

    }
  },
  methods: {


  }
}

</script>