<template>
  <v-main>
    <toolbar :username="items.username" :score="items.score" />
    <v-container>
      <v-row class="text-center">
        <v-col class="mb-4">
          <h1 class="display-2 font-weight-bold mb-3">Dashboard</h1>
        </v-col>

        <v-col class="mb-5" cols="12">
          <v-btn
            color="primary"
            elevation="2"
            x-large
            to="/monster-attack/quests"
          >Quests</v-btn>
        </v-col>

        <v-col class="mb-5" cols="12">
          <v-btn
            color="primary"
            elevation="2"
            x-large
            to="/monster-attack/leaderboard"
          >Leaderboard</v-btn>
        </v-col>

        <v-col class="mb-5" cols="12">
          <v-btn
            color="primary"
            elevation="2"
            x-large
            @click="logout"
          >Signout</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import axios from "axios";
import Toolbar from "../components/Toolbar.vue"

export default {
  data: () => ({
    creds: {
      email: localStorage.getItem("email"),
      password: localStorage.getItem("password"),
    },
    items: {},
  }),
  components: {
    Toolbar
  },
  methods: {
    logout() {
      localStorage.clear()
      this.$router.push('/login')
    }
  },
  mounted() {
    axios
      .post(`http://${window.location.hostname}:8080/get-data`, this.creds)
      .then((response) => {
        this.items = response.data.data[0];
        console.log(this.items);
      })
      .catch((error) => console.log(error));
  },
};
</script>