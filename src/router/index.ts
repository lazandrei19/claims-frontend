import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Game from '@/views/Game.vue';
import GameLobby from '@/views/GameLobby.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/game',
    name: 'Game',
    component: Game,
  },
  {
    path: '/lobby',
    name: 'Game lobby',
    component: GameLobby,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
