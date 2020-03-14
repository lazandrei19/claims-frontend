import '@babel/polyfill';
import 'mutationobserver-shim';
import Vue from 'vue';
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';

import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

const socket = io(process.env.SOCKET_IO_LOCATION);
Vue.use(VueSocketIOExt, socket, { store });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
  vuetify,
  sockets: {
    connect(uuid: string) {
      store.commit('UUID', uuid);
    },
    message(data) {
      console.log(data);
    },
    startGame() {
      if (router.currentRoute.name !== 'Game') {
        router.push('game');
      }
    },
  },
}).$mount('#app');
