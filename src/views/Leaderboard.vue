<template>
  <v-main>
    <toolbar :username="items.username" :score="items.score" />
    <v-container>
      <v-row class="text-center">
        <v-col class="mb-4">
          <h1 class="display-2 font-weight-bold mb-3">Top Players</h1>
        </v-col>

        <v-col cols="12">

          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">
                    Nickname
                  </th>
                  <th class="text-center">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(player, index) in topPlayers"
                  :key="index"
                >
                  <td>{{ player.username }}</td>
                  <td>{{ player.score }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import axios from "axios";
import Toolbar from '../components/Toolbar.vue'

export default {
  data: () => ({
    creds: {
      email: localStorage.getItem("email"),
      password: localStorage.getItem("password"),
    },
    items: {},
    topPlayers: []
  }),
  components: { Toolbar },
  mounted() {
    axios
      .post(`http://${window.location.hostname}:8080/get-data`, this.creds)
      .then((response) => {
        this.items = response.data.data[0];
      })
      .catch((error) => console.log(error));
    axios
      .get(`http://${window.location.hostname}:8080/get-leaderboard`)
      .then((response) => {
        this.topPlayers = response.data;
      })
      .catch((error) => console.log(error));
  },
};
</script>