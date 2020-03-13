<template>
  <v-list>
    <v-card v-for="player in players" :key="player.username">
      <v-list-item>
        <v-list-item-content>
          <span>{{ player.username }}</span>
          <span>Score: {{ player.score }}</span>
          <span>{{ player.noCards }} cards</span>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-list>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class PlayerList extends Vue {
  get players() {
    return [this.$store.state.self, ...this.$store.state.game.players];
  }
}
</script>

<style lang="sass" scoped>
.v-card
  margin: 10px

.v-list-item__content
  display: flex
  flex-direction: row
  justify-content: space-around

  *
    width: 33%
</style>
