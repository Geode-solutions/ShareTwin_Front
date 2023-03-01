<template>
  <v-container class="pa-0 fill-height">
    <v-row no-gutters class="fill-height">
      <AppLauncher v-if="!is_cloud_running || !is_client_created" class="pa-5" />
      <AppRemoteRenderingView v-else :client="client" />
    </v-row>
  </v-container>
</template>

<script setup>
import { use_cloud_store } from '@/stores/cloud'
import { use_ws_link_store } from '@/stores/ws_link'

const cloud_store = use_cloud_store()
const ws_link_store = use_ws_link_store()

const { is_cloud_running } = storeToRefs(cloud_store)
const { client, is_client_created } = storeToRefs(ws_link_store)
</script>

