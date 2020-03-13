<template>
  <div class="opponent-wrapper">
    <span class="username">{{ player.username }}</span>
    <div class="playingCards simpleCards">
      <ul class="hand">
        <li v-for="index in player.noCards" :key="index"><BackCard /></li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Deck from '@/components/Deck.vue';
import Player from '@/game/player';

import BackCard from '@/components/BackCard.vue';

@Component({
  components: {
    Deck,
    BackCard,
  },
})

export default class Opponent extends Vue {
  @Prop() readonly player!: Player;

  mount() {
    console.log(this.player.noCards);
  }
}
</script>

<style lang="sass" scoped>
.oponent-wrapper
  display: flex
  flex-direction: column
  justify-content: flex-start
  align-items: center

  span
    font-size: 1.5rem

ul.hand
  margin: 0 !important
</style>
