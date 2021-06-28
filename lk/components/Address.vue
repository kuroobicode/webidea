<!-- statusによって表示モードを変える。編集か表示か -->
<template>

<div>
  <v-row v-if="this.$store.getters['address_to/getMode'] == 'read'" class="pt-2">

    <v-col cols="2">
      <v-avatar>
        <img
          v-bind:src="this.pngpath"
          alt="John"
        >
      </v-avatar>
    </v-col>

    <v-col cols="3">
      {{address.name}} 
   </v-col>

    <v-col cols="7">
      {{address.deadline}}
    </v-col>
  
  </v-row>

  <v-row v-if="this.$store.getters['address_to/getMode'] == 'edit'">

    <v-col cols="2 pr-12" md="2">
      <v-btn
        class="mx-1"
        fab
        dark
        small
        color="error"
        @click="delAddress"
      >
        <v-icon dark>
          mdi-minus
        </v-icon>
      </v-btn>

    </v-col>

    <v-col cols="5">

      <!--
      <v-select
        v-model="address.db_user_id"
        :items="address.attendees"
        item-text="name"
        item-value="id"
        return-object          
        @change="changeAddress"
      >
      </v-select>
      -->
      <v-select
        v-model="selected_label"
        :items="address.attendees"
        item-text="name"
        item-value="id"
        return-object
        @change="changeAddress"
      >
      </v-select>


  </v-col>

  <v-col cols="5">

    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :return-value.sync="date"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="address.deadline"
          label="Picker in menu"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>

      <v-date-picker
        v-model="date"
        no-title
        scrollable
      >

        <v-spacer></v-spacer>

        <v-btn
          text
          color="primary"
          @click="menu = false"
        >
          Cancel
        </v-btn>
        
        <v-btn
          text
          color="primary"
          @click="changeDate(date),$refs.menu.save(date)"
        >
          OK
        </v-btn>
    
      </v-date-picker>
      
    </v-menu>

  <!-- {{address.name}}:{{address.deadline}} -->

  </v-col>

</v-row>
</div>

</template>

<script>

export default {
  name: 'Address',
  props: {
    address: Object,
  }
  ,created() {
    //初期値をdeadlineで設定
    this.id = this.address.id;
    this.name = this.address.name;
    //console.log('Address created id:' + this.id);
    this.date = this.address.deadline;
    this.mode = this.$store.state.address_to.mode;
    //console.log(this.mode);
    this.selected_label = this.address.db_user_id;
    this.pngpath = "/image/" +  Math.floor(Math.random() * 15 + 1)  + ".png";
  },
  methods: {
    changeAddress(obj) {

      //let updData = this.address
      let updData = {};
      updData.db_user_id = obj.id
      updData.name = obj.name
      console.log('updData:',  updData)
      this.$store.dispatch('address_to/updAddress', {id:this.address.id, updData: updData});
    },
    
    delAddress() {
      if(!window.confirm('削除していいですか'))return;
      console.log('delete');
      this.$store.dispatch('address_to/delAddress', this.address.id);
      
    },
    

    changeDate(date) {
      let updData = {};
      updData.deadline = date
      console.log('updData:',  updData)
      this.$store.dispatch('address_to/updAddress', {id:this.address.id, updData: updData});

    },

    getPngPath() {
      console.log('getPngPath called')
      let path = "/image/" +  Math.floor(Math.random() * 16 + 1)  + ".png"
      return path
    },

  },

  computed: {
    selected_label: {
      get(){
        return this.address.db_user_id
      },
      set(value){
        let updData = {};
        updData.db_user_id = value
        updData.name = this.name
        console.log('updData:',  updData)
        this.$store.dispatch('address_to/updAddress', {id:this.address.id, updData: updData});
      }
      
    }
  },

  data(){
    return {
      // selected_label: "",
      menu:false,
    }
  },

}


</script>