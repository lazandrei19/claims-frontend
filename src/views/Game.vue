<template>
  <v-app>
    <v-layout align-center column justify-space-between fill-height>
      <StatusBar :selected="selected" :done="nextPlayer"/>
      <Opponents />
      <div class="center playingCards simpleCards" :class="{ disabled: denySelect }">
        <SimpleCard :rank="trumpCard.rank" :suit="trumpCard.suit" class="trumpCard" />
        <BackCard @click.native="select('draw')"
          :class="{ selected: selected === 'draw' }" />
        <SimpleCard :rank="topCard.rank" :suit="topCard.suit"
          @click.native="select('discard')"
          :class="{ selected: selected === 'discard' }" />
      </div>
      <Deck :hand="hand"/>
    </v-layout>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Deck from '@/components/Deck.vue';
import StatusBar from '@/components/StatusBar.vue';
import Opponents from '@/components/Opponents.vue';
import BackCard from '@/components/BackCard.vue';
import SimpleCard from '@/components/SimpleCard.vue';
import GameCard from '@/game/card';

@Component({
  components: {
    Deck,
    StatusBar,
    Opponents,
    BackCard,
    SimpleCard,
  },
})

export default class Game extends Vue {
  selected: string | null = null;

  get hand() {
    return this.$store.state.hand;
  }

  get topCard(): GameCard {
    return this.$store.state.discardPile[this.$store.state.discardPile.length - 1];
  }

  get trumpCard(): GameCard {
    return this.$store.state.trumpCard;
  }

  get denySelect(): boolean {
    return !this.$store.getters.myTurn;
  }

  select(pile: string): void {
    if (this.denySelect) return;
    if (this.selected !== pile) {
      this.selected = pile;
    } else {
      this.selected = null;
    }
  }

  nextPlayer(): void {
    this.$socket.client.emit('move', this.$store.state.selectedCards, this.selected);
    this.$store.dispatch('removeCardsFromHand');
    this.selected = null;
  }
}
</script>

<style lang="sass" scoped>
.center
  display: flex
  position: relative
  transform: scale(1.5)

  &:not(.disabled) .card:not(.trumpCard):hover
    cursor: pointer

  &:not(.disabled) .card:not(.trumpCard):hover, .card.selected
    transform: scale(1.1)

.trumpCard
  transform: rotate(-90deg) translateY(50%)
  position: absolute
  left: -50%
</style>
