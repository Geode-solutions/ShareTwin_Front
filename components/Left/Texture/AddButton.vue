<template>
  <v-tooltip text="Add a texture" location="right">
    <template v-slot:activator="{ props }">
      <v-btn icon flat size="30" @click="add_texture_item(object_tree_index)">
        <v-icon icon="mdi-plus-circle" size="20" v-bind="props"></v-icon>
      </v-btn>
    </template>
  </v-tooltip>
</template>

<script setup>
import { use_app_store } from '@/stores/app'
const app_store = use_app_store()

const props = defineProps({
  object_tree_index: { type: Number, required: true }
})

const { object_tree_index } = props

function add_texture_item (object_tree_index) {
  const texture_item = { 'texture_name': '', 'texture_file_name': '' }
  app_store.add_texture_item(object_tree_index, texture_item)
}
</script>