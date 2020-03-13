<template>
  <router-view />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  created() {
    window.onbeforeunload = this.unload;
  }

  unload() {
    this.$socket.client.disconnect();
  }
}
</script>
