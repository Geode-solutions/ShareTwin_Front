<template>
  <v-navigation-drawer clipped permanent app fixed disable-resize-watcher width="350">
    <v-expansion-panels v-if="is_cloud_running" multiple accordion dense>
      <v-expansion-panel v-for="(item, index) in object_tree.items" :key="index">
        <v-expansion-panel-title>
          <div>
            <v-icon color="primary" size="30">
              mdi-file-upload
            </v-icon>
            {{ item.object_name }}
          </div>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

  </v-navigation-drawer>
</template>

<script setup>
import { use_app_store } from '@/stores/app'
import { use_cloud_store } from '@/stores/cloud'

const app_store = use_app_store()
const cloud_store = use_cloud_store()

const { is_cloud_running } = storeToRefs(cloud_store)
const { object_tree } = storeToRefs(app_store)
</script>
