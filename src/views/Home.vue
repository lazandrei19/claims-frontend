<template>
  <v-app>
    <v-row align="center">
      <v-row justify="space-around">
        <v-form>
          <v-text-field v-model="username" :counter="32" label="Username" required></v-text-field>
          <v-text-field v-model="gameId" type="number" label="Game ID" required></v-text-field>
          <v-btn @click="host">Host</v-btn>
          <v-btn color="primary" @click="join">Join</v-btn>
        </v-form>
      </v-row>
    </v-row>
  </v-app>
</template>

<style lang="sass" scoped>
.home
  padding-top: 25vh

button
  margin: 0 10px 0 0
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Player from '@/game/player';

@Component
export default class Home extends Vue {
  private username = '';

  private gameId = 0;

  public host(): void {
    this.$store.commit('ADD_USERNAME', this.username);
    fetch(`/host/game-${this.gameId}`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.username,
      }),
    }).then((response) => {
      if (response.status === 403) {
        // this.form.errors.id = ['This game id is already taken'];
      } else {
        this.$store.commit('GAME_ID', this.gameId);
        this.$socket.client.emit('join', `game-${this.gameId}`, this.$store.state.self.username);
        this.$store.commit('HOSTING', true);
        this.$router.push('lobby');
      }
    }).catch((response) => {
      // General error
      alert(response);
    });
  }

  public join(): void {
    this.$store.commit('ADD_USERNAME', this.username);
    fetch(`/join/game-${this.gameId}`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.username,
      }),
    }).then((response) => {
      if (response.status === 404) {
        // this.form.errors.id = ['There is no game with this id playing'];
      } else if (response.status === 401) {
        // this.form.errors.username = ['Username is already taken.'];
      } else {
        this.$store.commit('GAME_ID', this.gameId);
        this.$socket.client.emit('join', `game-${this.gameId}`, this.$store.state.self.username);
        response.json().then((data: Array<Player>) => {
          data.forEach((player) => {
            this.$store.commit('SOCKET_NEWPLAYER', player);
          });
          this.$router.push('lobby');
        });
      }
    }).catch((response) => {
      // General error
      alert(response);
    });
  }
}
</script>
