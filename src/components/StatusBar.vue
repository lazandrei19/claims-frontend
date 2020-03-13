<template>
  <div class="status-bar">
    <v-btn color="primary" :disabled="denyDone" @click="done">Done</v-btn>
    <v-btn color="green accent-4" :disabled="denyClaim" @click="claim">Claim</v-btn>
    <span v-if="currentPlayer">{{ currentPlayer.username }}'s turn</span>
    <span v-else>Your turn</span>
    <v-btn icon @click="playerListDiag = true">
      <v-icon color="black">mdi-account-multiple</v-icon>
    </v-btn>
    <v-btn icon><v-icon color="black">mdi-forum</v-icon></v-btn>
    <v-dialog v-model="playerListDiag"><PlayerList /></v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import PlayerList from '@/components/PlayerList.vue';

@Component({
  components: {
    PlayerList,
  },
})

export default class StatusBar extends Vue {
  @Prop() readonly selected!: string | null;

  @Prop() readonly done!: Function;

  playerListDiag = false;

  get currentPlayer(): string {
    return this.$store.getters.currentPlayer;
  }

  get denyDone(): boolean {
    return this.$store.state.selectedCards.length === 0 || !this.$store.getters.myTurn
            || this.selected === null;
  }

  get denyClaim(): boolean {
    return this.$store.getters.handScore > 5 || !this.$store.getters.myTurn;
  }

  claim() {
    this.$socket.client.emit('claims');
  }
}
</script>

<style lang="sass" scoped>
.status-bar
  display: grid
  width: 100%
  margin-top: 10px
  padding: 0 20px
  grid-template-columns: 80px 80px auto 80px 40px 40px


  .v-btn
    margin: 0 5px

    &:nth(1)
      grid-column-start: 1
      grid-column-end: 2

    &:nth(2)
      grid-column-start: 2
      grid-column-end: 3

    &:nth(3)
      grid-column-start: -3
      grid-column-end: -2
      margin: 0

    &:nth(4)
      grid-column-start: -2
      grid-column-end: -1
      margin: 0

  span
    grid-column-start: 3
    grid-column-end: 4
    text-align: center
    font-size: 1.5rem
</style>
