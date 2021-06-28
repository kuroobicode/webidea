<template>

<v-container fluid>
  <v-row>

    <v-col cols="9">
      <h3>宛先</h3>
    </v-col>

    <v-col cols="3">
      <v-btn
        @click="changeToEditMode"
      >
        <span  v-if="this.$store.getters['address_to/getMode'] == 'read'">編集</span>
        <span  v-if="this.$store.getters['address_to/getMode'] == 'edit'">完了</span>
      </v-btn> 

      <v-btn v-if="this.$store.getters['address_to/getMode'] == 'edit'"
        class="mx-1"
        fab
        dark
        small
        color="primary"
        @click="addAddress"
      >   

        <v-icon dark>
          mdi-plus
        </v-icon>
    
      </v-btn>

    </v-col>

  </v-row>

  <div v-for="(address, id) in address_to" :key="id" >
      <Address :address="address"/>
      <!-- {{address.name}}:{{address.deadline}} -->
  </div>

</v-container>

</template>

<script>

import Address from '@/components/Address.vue'
import { mapState } from 'vuex'
import { uuid } from 'vue-uuid'

export default {
  name: 'AddressList',
  components: {
    Address
  }
  ,created() {
    console.log('created AddressList')
  },

  computed: { 
    ...mapState({
      address_to: state => state.address_to.addresses,
    }),

  }, 


  methods: {
    changeToEditMode() {

      console.log(this.$store.state.address_to.mode);
      this.$store.dispatch('address_to/toggleMode');
      console.log('mode changed');
      console.log(this.$store.state.address_to.mode);
    },

    addAddress() {

      let newid = uuid.v1();
      let newAddress = {
      "db_user_id": newid,
      "id": newid,
      "name": "new_なまえ",
      "user_id": newid,
      "title": "Pet Adoption Day",
      "date": "Dec 2 2018",
      "deadline": "2021-07-01",
      "time": "12:00",
      "location": "132 N Magnolia Street, Orlando, Florida",
      "description": "Help animals find new homes.",
      "organizer": "Gregg Pollack",
      "category": "animal welfare",
      "attendees": [
        {
          "id": "hanako",
          "name": "はなこ",
          "email": "hanako@ca.cjp"
        },
        {
          "id": "riki",
          "name": "りき",
          "email": "riki@ca.cjp"
        },
        {
          "id": "ken",
          "name": "けん",
          "email": "ken@ca.cjp"
        },
        {
          "id": "ryu",
          "name": "りゅう",
          "email": "ryu@ca.cjp"
        },
        {
          "id": "mei",
          "name": "めい",
          "email": "mei@ca.cjp"
        }
      ]
    }
      console.log('addAddress');
      this.$store.dispatch('address_to/addAddress',newAddress);
    },

    
  }

}

</script>