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
          The use the app, you must accept the terms and conditions of use
          first:
        </p>
        <a :href="'/'">Landing page</a>
      </v-col>
    </v-row>
    <v-row v-else no-gutters class="fill-height pa-0">
      <v-col v-if="cloud_store.is_running" class="pa-0">
        <RemoteRenderingView :client="client" />
      </v-col>
      <Launcher v-else class="pa-5" :site_key="site_key" />
    </v-row>
  </v-container>
</template>

<script setup>
  const cloud_store = use_cloud_store()
  const websocket_store = use_websocket_store()
  const app_store = use_app_store()

  const { is_captcha_validated } = storeToRefs(cloud_store)
  const { accepted_gtcu } = storeToRefs(app_store)
  const { client } = storeToRefs(websocket_store)

  const site_key = useRuntimeConfig().public.RECAPTCHA_SITE_KEY

  watch(is_captcha_validated, (value) => {
    if (value) {
      app_store.$patch({ display_menu: true })
    }
  })
</script>

<style scoped>
  html {
    overflow-y: hidden;
  }
</style>
