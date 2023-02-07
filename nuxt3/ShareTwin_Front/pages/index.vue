<template>
  <div style="position: relative; width: 100%; height: 100%">
    <Launcher v-if="!cloud_running" />
    <remote-rendering-view v-else :client="client" />
  </div>
</template>

<script setup>
// ...mapState({ID: 'ID', cloud_running: 'cloud_running'}),
// ...mapGetters({
//   client: 'wslink/WS_CLIENT',
</script>

<style scoped>
.content--wrap {
  position: relative;
}

.appContent {
  height: 0;
}

.logo {
  height: 35px;
  padding-right: 10px;
}

.switch {
  max-width: 100px;
  width: auto;
  flex: 0;
  padding-left: 20px;
  padding-top: 20px !important;
}
</style>
