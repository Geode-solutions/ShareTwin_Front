<template>
  <v-app-bar dark color="primary" fixed app clipped-left>
    <v-row class="pa-2">
      <v-col cols="11
            ">
        <v-btn :active="false" active-class="no-active" to="/">
          <ShareTwinLogo />
        </v-btn>

      </v-col>
      <v-col cols="1">
        <v-btn active-class="no-active" @click="app_store.$patch({ display_object_selector: true })">
          <v-icon icon="mdi-folder"></v-icon> Load
        </v-btn>
      </v-col>
    </v-row>
    <v-progress-linear :active="busy" :indeterminate="busy" absolute bottom />
  </v-app-bar>
</template>

<script setup>
import { use_ws_link_store } from '@/stores/ws_link'
import { use_app_store } from '@/stores/app'

const ws_link_store = use_ws_link_store()
const app_store = use_app_store()
const { busy } = storeToRefs(ws_link_store)
</script>