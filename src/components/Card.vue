<template>
  <strong v-if="selected">
    <label :for="cardId" class="card" :class="[classrank, suit, {'card-disabled': cantSelectThis}]">
      <span class="rank">{{ rank }}</span>
      <span class="suit" v-html="suitHtml"></span>
      <input type="checkbox" v-model="selected" :id="cardId" :name="cardId" @change="onChange"/>
    </label>
  </strong>
  <label :for="cardId" class="card"
      :class="[classrank, suit, {'card-disabled': cantSelectThis}]" v-else>
    <span class="rank">{{ rank }}</span>
    <span class="suit" v-html="suitHtml"></span>
    <input type="checkbox" v-model="selected" :id="cardId" :name="cardId"
      :disabled="cantSelectThis" @change="onChange"/>
  </label>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Card extends Vue {
  @Prop() readonly rank!: string;

  @Prop() readonly suit!: string;

  selected = false;

  get suitHtml(): string {
    return `&${this.suit};`;
  }

  get classrank(): string {
    if (this.suit === 'joker') {
      return (this.rank === '+') ? 'big' : 'little';
    }
    return `rank-${this.rank}`;
  }

  get cardId(): string {
    if (this.suit === 'joker') {
      return `c-${this.suit.toUpperCase()[0]}${this.rank}`;
    }
    return `c-${this.rank}${this.suit.toUpperCase()[0]}`;
  }

  get cantSelectThis(): boolean {
    const { selectedCards } = this.$store.state;
    let diff = false;
    selectedCards.forEach((el: string) => {
      if (el.slice(0, -1) !== this.cardId.slice(0, -1)) {
        diff = true;
      }
    });
    return diff || !this.$store.getters.myTurn;
  }

  onChange(): void {
    if (this.selected) {
      this.$store.commit('SELECT_CARD', this.cardId);
    } else {
      this.$store.commit('DESELECT_CARD', this.cardId);
    }
  }
}
</script>

<style lang="sass" scoped>
.card .suit::after
  bottom: 0.25em !important
  right: 0.25em !important

input[type="checkbox"]
  display: none

label.card-disabled
  cursor: default
</style>
