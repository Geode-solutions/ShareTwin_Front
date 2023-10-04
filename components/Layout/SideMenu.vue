<template>
  <v-navigation-drawer v-model="display_menu" clipped permanent app fixed disable-resize-watcher width="400">
    <v-expansion-panels v-if="cloud_store.is_running" multiple accordion dense>
      <v-expansion-panel v-for="(item, object_tree_index) in object_tree" :key="object_tree_index">
        <LeftDatasets :object_tree_index="object_tree_index" />
      </v-expansion-panel>
    </v-expansion-panels>
  </v-navigation-drawer>
</template>

<script setup>
const app_store = use_app_store()
const cloud_store = use_cloud_store()

const { display_menu, object_tree } = storeToRefs(app_store)
</script>
