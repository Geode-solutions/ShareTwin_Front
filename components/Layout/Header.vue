<template>
  <v-app-bar dark color="primary" fixed app clipped-left>

    <v-app-bar-nav-icon @click="toggle_diplay_menu()">
    </v-app-bar-nav-icon>
    <v-row class="pa-2">
      <v-col cols="11">
        <v-btn :active="false" active-class="no-active" to="/">
          <ShareTwinLogo />
        </v-btn>

      </v-col>
      <v-col cols="1">
        <v-btn v-if="cloud_store.is_running" active-class="no-active"
          @click="app_store.$patch({ display_object_selector: true })" class="btn">
          <v-icon icon="mdi-folder"></v-icon> Load
        </v-btn>
      </v-col>
    </v-row>
    <v-progress-linear :active="cloud_store.is_busy" :indeterminate="cloud_store.is_busy" absolute bottom />
  </v-app-bar>
</template>

<script setup>
const app_store = use_app_store()
const cloud_store = use_cloud_store()

const { display_menu } = storeToRefs(app_store)

function toggle_diplay_menu () {
  app_store.$patch({ 'display_menu': !display_menu.value })
}
</script>

<style scoped>
.btn {
  text-transform: unset !important;
}
</style>