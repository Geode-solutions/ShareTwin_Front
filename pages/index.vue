<template>
  <div style="position: relative; width: 100%; height: 100%">
    <Launcher v-if="!is_cloud_running" class="pa-5" />
    <RemoteRenderingView v-else :client="client" view-id="-1" />
  </div>
</template>

<script setup>
import { use_cloud_store } from '@/stores/cloud'
import { use_ws_link_store } from '@/stores/ws_link'

const cloud_store = use_cloud_store()
const ws_link_store = use_ws_link_store()

const { is_cloud_running } = storeToRefs(cloud_store)
const { client } = storeToRefs(ws_link_store)
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
