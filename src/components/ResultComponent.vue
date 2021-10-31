<template>
  <v-col class="mb-5" cols="12">
    <v-card class="mx-auto" max-width="344" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="text-h5 mb-4">
            {{ text }}
          </div>
          <v-list-item-subtitle>
            {{ desc }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-actions>
        <v-btn
          outlined
          rounded
          text
          color="primary"
          to="/monster-attack/quests"
        >Return</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: ['text', 'desc']
}
</script>