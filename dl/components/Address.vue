

  <!-- statusによって表示モードを変える。編集か表示か -->
 <template>

 

<div>
  
  <!--
  <v-row>
    <v-col>
      <span v-if="this.$store.getters['address_to/getMode'] == 'edit'">編集モード</span>
      <span v-else-if="this.$store.getters['address_to/getMode'] == 'read'">Readモード</span>
    </v-col>
  </v-row>
  -->

      <div>
        <div class="row" >
          <!--
          <div class="col-4 pl-12 pr-12" style="background-color: silver;"></div>
          <div class="col-4 pl-12 pr-12" style="background-color: aqua;"></div>
          <div class="col-4 pl-12 pr-12" style="background-color: cadetblue;"></div>
          -->
          <div class="col-2 pl-12 pr-12"></div>
          <div class="col-5 pl-12 pr-12"></div>
          <div class="col-5 pl-12 pr-12"></div>
        </div>
      </div>

  <v-row align="center" v-if="this.$store.getters['address_to/getMode'] == 'read'">


    <v-col
      cols="2"
      style="background-color: #CC00D2"
    >


   </v-col>



    <v-col
      cols="5"
      style="background-color: #FF00D2"
      align-self="center"
    >
    {{address.name}}

   </v-col>

 
    <v-col
      cols="5" 
      style="background-color: #FFCDD2"
    >

    {{address.deadline}}

    
      </v-col>


  </v-row>

<!-- 
  <v-row>
    <v-col d-flex justify-content-center style="background-color: #60CDD2">1</v-col>
    <v-col style="background-color: #6055CC">2</v-col>
  </v-row>
-->

  <v-row align="center" v-if="this.$store.getters['address_to/getMode'] == 'edit'">

    <v-col
      cols="2 pr-12"
      md="2"
    >

      <v-btn
          class="mx-1"
          fab
          dark
          small
          color="primary"
          @click="delAddress"
        >
          <v-icon dark>
            mdi-minus
          </v-icon>
        </v-btn>

   </v-col>

    <v-col
      cols="5"
    >
    

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


    <v-col
      cols="5"
    >


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
              v-model="date"
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

    </v-col>

  </v-row>




</div>

</template>




<script>

export default {
  name: 'Address',
  props: {
    // 'user_id',
    // 'user_name',
    // 'mail_address',
    // 'deadline',
    address: Object,
    //date: "2020-01-01"
    
  }
  ,created() {
    //初期値をdeadlineで設定
    this.id = this.address.id;
    console.log('Address created id:' + this.id);
    this.date = this.address.deadline;
    this.mode = this.$store.state.address_to.mode;
    //console.log(this.mode);
    this.selected_label = this.address.db_user_id;
  },
  computed: {

  },
  methods: {
    changeAddress(obj) {
      console.log('this.id:',  this.address.id)
      console.log('name:',  obj.name)
      console.log('id:',  obj.id)
      console.log('email:',  obj.email)

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
      console.log('changeDate called')
      
      console.log('this.id:',  this.address.id)
      console.log('date:',  date)

      //let updData = this.address
      let updData = {};
      updData.deadline = date
      console.log('updData:',  updData)
      this.$store.dispatch('address_to/updAddress', {id:this.address.id, updData: updData});

    },

  },

  data(){
    return {
      selected_label: "",
      menu:false,
    }
  },
  computed: {

  },
  // mounted(){
  //   this.$store.state.address_to.modestore.subscribe((mutation, state)=>{
  //     console.log("呼ばれた");
  //     if(mutation.type === "set") {
  //       console.log("変更");
  //     }
  //   })
  // },  

}



</script>