<template>
  <v-navigation-drawer v-model="display_menu" clipped permanent app fixed disable-resize-watcher width="350">
    <v-expansion-panels v-if="is_cloud_running" multiple accordion dense>
      <v-expansion-panel v-for="(item, object_tree_index) in object_tree" :key="object_tree_index">
        <LeftDatasets :object_tree_index="object_tree_index" />
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
const { display_menu, object_tree } = storeToRefs(app_store)

</script>
