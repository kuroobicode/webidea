<template>

<div>
<v-container class="grey lighten-5">

  <v-row>
    <v-card
      width="100%"
      min-width="1000"
      elevation="2"
      shaped
    >

      <v-list-item three-line>
        <v-list-item-content>
          <span class="text-overline mb-4">
          From:いち &nbsp;&nbsp;&nbsp; {{message.create_timestamp}}
          </span>
          <v-list-item-title class="text-h5 mb-1">
            {{message.message}}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{message.id}}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    
      <v-row class="pb-4">
        <v-col cols="9"></v-col>
        <v-col cols="1">
          <v-btn
            outlined
            rounded
            text
          >
          このメッセージに返信
          </v-btn>        
        </v-col>
      </v-row>

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

}

</script>