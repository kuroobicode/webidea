
<template>


<div class="message">

<v-container fluid>

  <v-row>
    <v-select
      v-model="selected_message_to"
      :items="default_addresses"
      item-text="name"
      item-value="id"
      label="宛先"
      return-object
      multiple
    >
    </v-select>

  </v-row>

  <v-row>
    <v-col>
      <v-textarea
        v-model="new_message"
        outlined
        name="input-7-4"
        label="メッセージを入力してください"
        value=""
      ></v-textarea>
    </v-col>
  </v-row>

  <v-row>

    <v-col cols="3">
      <v-file-input multiple label="File input"></v-file-input>
    </v-col>
    <v-col cols="6">
      <v-spacer></v-spacer>
    </v-col>

    <v-col cols="2">
      <v-select
        v-model="selected_status"
        :items="status"
        item-text="name"
        item-value="id"
        label="ステータス"
      >

      </v-select>

    </v-col>

    <v-col>

      <v-btn
        depressed
        color="primary"
        @click="postMessage"
      >
        送信
      </v-btn>

    </v-col>

  </v-row>


</v-container>
</div>

</template>


<script>


import Message from '@/components/Message.vue'
import { mapState } from 'vuex'
import { uuid } from 'vue-uuid'

export default {
  name: 'MessagePost',
  components: {
    Message
  }
  ,created() {
    console.log('MessagePost created ')
    this.status = [{id:"10" ,name:"新規"},{id:"20" ,name:"作業中"},{id:"30" ,name:"完了"}]
    this.new_message = ""
    this.selected_status = "";
    this.selected_message_to = "";
  },
  computed: mapState({
    default_addresses: state => state.address_to.default_addresses
  }), 

  methods: {
    postMessage() {
      console.log('postMessage');

      console.log(this.selected_message_to);

      let users = [];
      for (let id in this.selected_message_to) {
        console.log('key:' + id + ' value:' + this.selected_message_to[id]['name']); 
        let user = {name: this.selected_message_to[id]['name']}
        users.push(user);

      }

      const newid = uuid.v1();
      //console.log(newid)

      //const timestamp = moment().format('MMMM Do YYYY, h:mm:ss a');

      console.log(this.$moment().format('YYYY-MM-DD kk:mm:ss a'))

      let newMessage = {
        message: this.new_message,
        id: newid,
        user: users,
        create_timestamp: this.$moment().format('YYYY-MM-DD kk:mm:ss a')
      };

      //console.log(newMessage);

      this.$store.dispatch('message/addMessage',newMessage);
    }

  }


}



</script>