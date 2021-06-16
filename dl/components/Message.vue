

  <!-- statusによって表示モードを変える。編集か表示か -->
 <template>

 

<div class="">
<v-container class="grey lighten-5">
  <v-row>
    <v-card
      elevation="2"
      outlined
      shaped
    >

   <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">
          {{message.id}}
        </div>
        <v-list-item-title class="text-h5 mb-1">
          {{message.create_timestamp}}
        </v-list-item-title>
        <v-list-item-subtitle>{{message.message}}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
        color="grey"
      ></v-list-item-avatar>
    </v-list-item>

      <v-card-actions>
        <v-btn
          outlined
          rounded
          text
        >
          Button
        </v-btn>
      </v-card-actions>

    </v-card>

  </v-row>

</v-container>

<br>

</div>

</template>




<script>

export default {
  name: 'Message',
  props: {
    message: Object,
  }
  ,created() {

  },
  methods: {
    changeAddress(obj) {
    },

  },

}



</script>