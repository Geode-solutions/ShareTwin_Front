<template class="toto">
  <LayoutSideMenu />
  <FileLoaderWrapper />
  <CrsConvertWrapper />
  <CrsAssignWrapper />
  <ErrorsBanner />
  <ErrorsSnackers />
  <RightDrawer />
  <v-container class="pa-0 fill-height" fluid>
    <v-row v-if="!accepted_gtcu" no-gutters class="fill-height">
      The use the app, you must accept the terms and conditions of use first:
    </v-row>
    <v-row v-else no-gutters class="fill-height">
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


onMounted(() => {
  console.log('mounted')
  watchOnce(accepted_gtcu, (value) => {
    console.log('watch')
    if (value) {
      console.log('true')
      app_store.$patch({ display_menu: true })
    }
  })
  // app_store.$patch({ accepted_gtcu: true })
})
</script>

<style scoped>
html {
  overflow-y: hidden;
}
</style>
  