<template>
  <LayoutSideMenu />
  <FileLoaderWrapper />
  <CrsConvertWrapper />
  <CrsAssignWrapper />
  <ErrorsBanner />
  <ErrorsSnackers />
  <RightDrawer />
  <v-container class="pa-0 fill-height" fluid>
    <v-row v-if="!accepted_gtcu" no-gutters class=".align-self-center">
      <v-col cols="12" class="d-flex justify-center align-center">
        <p class="font-weight-bold">
          The use the app, you must accept the terms and conditions of use first:
        </p>
        <a :href="'/'">Landing page</a>
      </v-col>
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
  console.log('accepted_gtcu', accepted_gtcu.value)
  if (accepted_gtcu.value) {
    app_store.$patch({ display_menu: true })
  }
})
</script>

<style scoped>
html {
  overflow-y: hidden;
}
</style>