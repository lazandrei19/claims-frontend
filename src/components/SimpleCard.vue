<template>
  <div class="card" :class="[classrank, suit]">
    <span class="rank">{{ rank }}</span>
    <span class="suit" v-html="suitHtml"></span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class SimpleCard extends Vue {
  @Prop() readonly rank!: string;

  @Prop() readonly suit!: string;

  get suitHtml(): string {
    return `&${this.suit};`;
  }

  get classrank(): string {
    if (this.suit === 'joker') {
      return (this.rank === '+') ? 'big' : 'little';
    }
    return `rank-${this.rank}`;
  }
}
</script>

<style lang="sass" scoped>
.card .suit::after
  bottom: 0.25em !important
  right: 0.25em !important
</style>
