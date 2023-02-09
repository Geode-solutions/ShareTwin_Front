<template>
  <v-app>
    <v-app-bar dark color="primary" fixed app clipped-left>
      <v-row class="pa-2">
        <v-col>
          <v-btn :active="false" active-class="no-active" to="/">
            <ShareTwinLogo />
          </v-btn>
          <v-spacer />
        </v-col>
      </v-row>
      <v-progress-linear :active="busy" :indeterminate="busy" absolute bottom />
    </v-app-bar>

    <v-navigation-drawer clipped permanent app fixed disable-resize-watcher width="350">
      <SideMenu />
    </v-navigation-drawer>

    <v-main class="secondary">
      <slot />
    </v-main>
  </v-app>
</template>

<script setup>
import { use_ws_link_store } from '@/stores/ws_link'

const ws_link_store = use_ws_link_store()
const { busy } = storeToRefs(ws_link_store)
</script>

<style scoped>
* {
  text-transform: none !important;
}
</style>

<style>
.card {
  border-radius: 15px
}
</style>
