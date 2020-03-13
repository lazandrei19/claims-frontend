<template>
  <div class="opponents-wrapper">
    <Opponent v-for="player in players" :key="player.uuid" :player="player"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Opponent from '@/components/Opponent.vue';
import Player from '@/game/player';

@Component({
  components: {
    Opponent,
  },
})

export default class Opponents extends Vue {
  get players(): Array<Player> {
    return this.$store.state.game.players;
  }
}
</script>

<style lang="sass" scoped>
.opponents-wrapper
  display: flex
  flex-direction: row
  justify-content: space-evenly
  width: 100%
  margin-left: -100px
</style>
