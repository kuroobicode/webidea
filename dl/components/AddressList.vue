<template>

 
<!--  Addressにパラメーターを渡す  -->
        <v-container fluid>

          <!-- 
          <v-row v-for="item in items" >
              {{item}}
          </v-row>
          
          <v-row v-for="address in address_to.addresses" >
              {{address.id}}
          </v-row>
          -->
        
  <h1 v-if="this.$store.getters['address_to/getMode'] == 'read'">見出し</h1>
  <p v-if="this.$store.getters['address_to/getMode'] == 'edit'">段落1</p>
  <p v-if="this.$store.getters['address_to/getMode'] == 'edit'">段落2</p>

        <v-row>
          <v-btn
            class="mx-1"
            fab
            dark
            small
            color="primary"
            @click="changeToEditMode"
          >
            <v-icon dark>
              mdi-edit
            </v-icon>
          
          </v-btn>

          &nbsp;&nbsp;&nbsp;
          <v-btn
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

        </v-row>

          <v-row v-for="(address, id) in address_to" :key="id" >
              <Address :address="address"/>
          </v-row>

        </v-container>


</template>

<script>

import Address from '@/components/Address.vue'
import * as address_to from '@/store/address_to.js'
import { mapState,mapGetters } from 'vuex'
import { uuid } from 'vue-uuid'

export default {
  name: 'AddressList',
  components: {
    Address
  }
  ,created() {
    console.log('created AddressList')
    //console.log(state.addresses)
    // this.$store.dispatch('address_to/setMode', address_to.MODE_READ);
    // this.$store.dispatch('address_to/setAddresses');
  },
  // computed: {
  //   ...mapState(['address_to','notification'])
  //  }, 

  computed: mapState({
    address_to: state => state.address_to.addresses,
    //mode: state => state.address_to.mode
  }), 

  // computed: {
  //     ...mapGetters({
  //       address_to: 'address_to/getAddresses',
  //       mode: 'address_to/getMode'
  //     })

  // },

   data() {
    return {
      selectedItem: 1,
      // items: [
      //   { text: 'Real-Time', icon: 'mdi-clock' },
      //   { text: 'Audience', icon: 'mdi-account' },
      //   { text: 'Conversions', icon: 'mdi-flag' },
      // ],
//      items: addresses,
      // date: '2018-03-02',
      // menu: [],

    }
  },

  methods: {
    changeToEditMode() {

      console.log('changeToEditMode 今 state=' + this.$store.state.address_to.perPage)

      console.log(this.$store.state.address_to.mode);
      this.$store.dispatch('address_to/toggleMode');
      console.log('mode changed');
      console.log(this.$store.state.address_to.mode);
      //this.$store.getters['address_to/getMode']
      //console.log(this.$store.address_to.mode);
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
          "id": "ryu",
          "name": "竜",
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
    }    
  }

}


</script>