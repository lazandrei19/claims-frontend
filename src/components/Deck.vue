<template>
  <div class="playingCards simpleCards">
    <ul class="table">
      <li v-for="card in hand" :key="card.cardId">
        <SimpleCard :suit="card.suit" :rank="card.rank" v-if="simpleCards"/>
        <Card :suit="card.suit" :rank="card.rank" v-else/>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Card from '@/components/Card.vue';
import SimpleCard from '@/components/SimpleCard.vue';
import card from '@/game/card';

@Component({
  components: {
    Card,
    SimpleCard,
  },
})

export default class Deck extends Vue {
  @Prop() readonly hand!: Array<card>;

  @Prop({ default: false }) readonly simpleCards!: boolean;
}
</script>
