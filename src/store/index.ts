import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import Player from '@/game/player';
import Card from '@/game/card';
import Event from '@/game/event';

Vue.use(Vuex);

export default new Store({
  state: {
    self: new Player('', ''),
    hosting: false,
    players: Array<Player>(),
    id: 0,
    hand: Array<Card>(),
    trumpCard: new Card('', '', 0),
    discardPile: Array<Card>(),
    turn: '',
    selectedCards: Array<string>(),
    events: Array<Event>(),
  },
  mutations: {
    UUID(state, newUUID: string) {
      state.self = new Player(state.self.username, newUUID);
    },
    ADD_USERNAME(state, username: string) {
      state.self = new Player(username, state.self.uuid);
    },
    SOCKET_NEWPLAYER(state, { username, uuid }) {
      state.players.push(new Player(username, uuid));
    },
    HOSTING(state, hosting: boolean) {
      state.hosting = hosting;
    },
    GAME_ID(state, id: number) {
      state.id = id;
    },
    SOCKET_DELPLAYER(state, uuid: string) {
      state.players = state.players.filter((e) => e.uuid !== uuid);
    },
    SOCKET_DRAWCARD(state, { rank, suit, value }) {
      state.hand.push(new Card(suit, rank, value));
    },
    SOCKET_TRUMPCARD(state, card: Card) {
      state.trumpCard = card;
    },
    SOCKET_DISCARDPILE(state, pile: Array<Card>) {
      state.discardPile = pile;
    },
    SOCKET_PLAYER(state, uuid: string) {
      state.turn = uuid;
    },
    SELECT_CARD(state, card: string) {
      state.selectedCards = [...state.selectedCards, card];
    },
    DESELECT_CARD(state, card: string) {
      state.selectedCards = state.selectedCards.filter((el) => el !== card);
    },
    CLEAR_SELECTED_CARDS(state) {
      state.selectedCards = [];
    },
    SOCKET_STARTGAME(state, { hand, trumpCard, discardPile }) {
      state.hand = hand.map(({ rank, suit, value }:
          { rank: string; suit: string; value: number }) => new Card(suit, rank, value));
      state.trumpCard = trumpCard;
      state.discardPile = discardPile;
    },
    DELETE_CARDS_BY_IDS(state, cardIds: Array<string>) {
      state.hand = state.hand.filter((card) => !cardIds.includes(card.id));
    },
    SOCKET_PLAYERHANDS(state, playerHands) {
      state.players = state.players.map((player) => {
        const newPlayer = new Player(player.username, player.uuid);
        newPlayer.noCards = playerHands[player.uuid];
        newPlayer.score = player.score;
        return newPlayer;
      });
    },
    SOCKET_PLAYERSCORES(state, scores) {
      state.players = state.players.map((player) => {
        const newPlayer = new Player(player.username, player.uuid);
        newPlayer.score = scores[player.uuid];
        newPlayer.noCards = 5;
        return newPlayer;
      });
      state.self = { ...state.self, score: scores[state.self.uuid] };
    },
  },
  getters: {
    myTurn: (state) => state.turn === state.self.uuid,
    currentPlayer: (state) => state.players.find((player) => player.uuid === state.turn),
    handScore: (state) => state.hand.filter((card) => card.rank !== state.trumpCard.rank)
      .map((card) => card.value).reduce((acc, el) => acc + el, 0),
  },
  actions: {
    removeCardsFromHand({ state, commit }) {
      commit('DELETE_CARDS_BY_IDS', state.selectedCards);
      commit('CLEAR_SELECTED_CARDS');
    },
  },
});
