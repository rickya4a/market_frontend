<template>
  <v-container>
    <v-row class="text-center">

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Monster Attack
        </h1>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <v-btn
          color="primary"
          elevation="2"
          x-large
          to="/register"
        >Register</v-btn>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <v-btn
          color="primary"
          elevation="2"
          x-large
          to="/login"
        >Login</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'MainMenu',
  }
</script>
