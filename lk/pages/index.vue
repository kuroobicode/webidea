<template>
<div>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        <logo />
        <vuetify-logo />
      </div>

    </v-col>
  </v-row>

  <!-- <v-row class="justify-content-lg-center" style="width: 800px;"> -->
  <v-row class="justify-content-center pl-16 pr-16 ml-16 mr-16">
    <v-col
      v-for="n in 15"
      :key="n"
      class="d-flex child-flex justify-center"
      cols="4"
    >
      <v-img
        :src="`image/${n}.png`"
        :lazy-src="`image/${n}.png`"
        aspect-ratio="1"
        class="grey lighten-2"
        max-width="200"
        max-height="200"
      >
      </v-img>
    </v-col>
  </v-row>

</div>

</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  }
}
</script>
