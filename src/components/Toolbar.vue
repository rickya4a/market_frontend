<template>
  <v-system-bar height="30" color="primary">
    <span class="mr-2">
      <h3 class="white--text">Hi, {{ username }}!</h3>
    </span>
    <span class="ml-2">
      <h3 v-if="score" class="white--text">{{ score }} points</h3>
      <h3 v-else class="white--text">You don't have any points yet</h3>
    </span>
  </v-system-bar>
</template>

<script>
export default {
  props: ['username', 'score']
}
</script>