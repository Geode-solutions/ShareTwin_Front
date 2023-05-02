<template>
  <v-expansion-panel-title>
    <v-row>
      <v-col cols="auto" class="pa-0 align-self-center">

        <v-btn flat icon small v-on:click.stop="app_store.toggle_object_visibility(object_tree_index)">
          <v-icon>
            {{ object_tree[object_tree_index].is_visible ? 'mdi-checkbox-marked-outline' : 'mdi-checkbox-blank-outline' }}
          </v-icon>
        </v-btn>
      </v-col>
      <v-col cols="auto" class="pa-0 align-self-center">
        <v-img :src="geode_objects[object_tree[object_tree_index].geode_object].image" width="35" />
      </v-col>
      <v-col cols="8" class="align-self-center">
        <h4 class="overflow-x-hidden">
          {{ object_tree[object_tree_index].name }}
        </h4>
      </v-col>
    </v-row>
  </v-expansion-panel-title>
  <v-expansion-panel-text>
    <LeftTextureMenu :object_tree_index="object_tree_index" />
  </v-expansion-panel-text>
</template>

<script setup>
import { use_app_store } from '@/stores/app'
import geode_objects from '@/assets/geode_objects'
import { storeToRefs } from 'pinia'

const app_store = use_app_store()

const props = defineProps({
  object_tree_index: { type: Number, required: true }
})

const { object_tree_index } = props
const { object_tree } = storeToRefs(app_store)
</script>

<style scoped>
.v-expansion-panel-text :deep(.v-expansion-panel-text__wrapper) {
  padding: 4px 4px 4px 15px !important;
}
</style>