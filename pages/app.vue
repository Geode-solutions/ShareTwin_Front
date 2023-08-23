<template>
  <v-container class="pa-0 fill-height" fluid>
    <!-- {{ app_store.accepted_gtcu }} -->
    <!-- <v-row v-if="!accepted_gtcu" no-gutters class="fill-height">
      Please accept the CGU first
    </v-row> -->
    <v-row no-gutters class="fill-height">
      <AppLauncher v-if="!is_cloud_running || !is_client_created" class="pa-5" />
      <AppRemoteRenderingView v-else :client="client" />
    </v-row>
  </v-container>
</template>
  
<script setup>

const cloud_store = use_cloud_store()
const ws_link_store = use_ws_link_store()
const app_store = use_app_store()

const { accepted_gtcu } = storeToRefs(app_store)
const { is_cloud_running } = storeToRefs(cloud_store)
const { client, is_client_created } = storeToRefs(ws_link_store)
</script>
  
  