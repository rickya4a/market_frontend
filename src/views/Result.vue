<template>
  <v-main>
    <toolbar :username="userData.username" :score="userData.score" />
    <v-container>
      <v-row class="text-center">
        <result-component :text="text" :desc="desc"/>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import axios from "axios";
import ResultComponent from '../components/ResultComponent.vue'
import Toolbar from '../components/Toolbar.vue'

export default {
  data: () => ({
    creds: {
      email: localStorage.getItem("email"),
      password: localStorage.getItem("password"),
    },
    userData: {},
    text: '',
    desc: '',
    prevScore: localStorage.getItem('prev-score'),
    currScore: "",
    monster: localStorage.getItem('monster'),
    monsterPoint: localStorage.getItem('monster-point')
  }),
  components: { ResultComponent, Toolbar },
  mounted() {
    axios
    .post(`http://${window.location.hostname}:8080/get-data`, this.creds)
    .then((response) => {
      this.userData = response.data.data[0];
      this.currScore = response.data.data[0].score;
      console.log(this.currScore);
      if (this.currScore > this.prevScore) {
        this.text = 'Victory'
        this.desc = `You have defeated ${this.monster}. You have earned ${this.monsterPoint} points`
      } else {
        this.text = 'Defeated'
        this.desc = `Your troops failed to defeat ${this.monster}`
      }
    })
    .catch((error) => console.log(error));
  },
};
</script>