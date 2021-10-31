<template>
  <v-main>
    <toolbar :username="items.username" :score="items.score" />
    <v-container>
      <v-row class="text-center">
        <v-col class="mb-4">
          <h1 class="display-2 font-weight-bold mb-3">Quests</h1>
        </v-col>

        <v-col cols="12">
          <v-simple-table>
            <template v-slot:default>
              <tbody>
                <tr
                  v-for="(quest, index) in quests"
                  :key="index"
                >
                  <td>Attack {{ quest.action }}</td>
                  <td>
                    <v-btn
                      color="primary"
                      elevation="2"
                      small
                      :loading="disabled"
                      :disabled="disabled"
                      @click="attack(quest.percentage, quest.reward, quest.action)"
                    >
                      Attack
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
        <v-overlay :value="overlay">
          <h3 class="white--text">Calculating...</h3>
        </v-overlay>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
/* eslint-disable no-unused-vars */
import axios from "axios";
import Toolbar from '../components/Toolbar.vue';

export default {
  data: () => ({
    creds: {
      email: localStorage.getItem("email"),
      password: localStorage.getItem("password"),
    },
    items: {},
    quests: [],
    disabled: false,
    timeout: null,
    overlay: false,
    progress: 0
  }),
  components: { Toolbar },
  methods: {
    calc(percentage, point, monster) {
      let chance = Math.floor(Math.random() * (100 - 0 + 1) + 0)
      let possibility = percentage * 100

      if (chance < possibility) {
        let newScore = this.items.score + point

        let postData = {
          username: this.items.username,
          score: newScore
        }

        axios.post(`http://${window.location.hostname}:8080/update-point`, postData)
        .then(res => console.log(res))
      }

      localStorage.setItem('monster', monster)
      localStorage.setItem('monster-point', point)
      localStorage.setItem('prev-score', this.items.score)
      this.$router.push('/monster-attack/result')
    },
    attack(percentage, point, monster) {
      this.disabled = true
      this.overlay = true

      this.timeout = setTimeout(() => {
        this.disabled = false
        this.overlay = false
        this.calc(percentage, point, monster)
      }, 30000)

    },
  },
  beforeDestroy() {
    // clear the timeout before the component is destroyed
    clearTimeout(this.timeout)
  },
  mounted() {
    localStorage.removeItem('prev-score')
    localStorage.removeItem('monster')
    localStorage.removeItem('monster-point')
    axios
    .post(`http://${window.location.hostname}:8080/get-data`, this.creds)
    .then((response) => {
      this.items = response.data.data[0];
    })
    .catch((error) => console.log(error));

    axios
    .get(`http://${window.location.hostname}:8080/get-quests`)
    .then((response) => {
      this.quests = response.data;
    })
    .catch((error) => console.log(error));
  },
};
</script>