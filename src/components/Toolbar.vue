<template>
  <v-system-bar height="30" color="primary">
    <span class="mr-2">
      <h3 class="white--text">Hi, {{ username }}!</h3>
    </span>
    <span class="ml-2">
      <h3 class="white--text">{{ score }} points</h3>
    </span>
  </v-system-bar>
</template>

<script>
export default {
  props: ['username', 'score']
}
</script>