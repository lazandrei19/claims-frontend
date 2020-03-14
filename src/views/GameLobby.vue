<template>
  <v-app>
    <v-list>
      <v-card v-for="player in players" :key="player.username">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ player.username }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-list>
    <v-card v-if="hosting" class="host-card">
      <v-btn block :loading="enoughPlayers" color="primary"
        class="host-btn" @click="startGame">Start game</v-btn>
    </v-card>
  </v-app>
</template>

<style lang="sass" scoped>
.v-card
  margin: 15px 20px

.host-card
  position: absolute
  bottom: 0
  left: 0
  right: 0
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class GameLobby extends Vue {
  startGame() {
    this.$socket.client.emit('start', `game-${this.$store.state.id}`);
  }

  get players() {
    return [this.$store.state.self, ...this.$store.state.players];
  }

  get hosting() {
    return this.$store.state.hosting;
  }

  get enoughPlayers() {
    return this.$store.state.players.length < 1;
  }
}
</script>
