<template>
  <v-tooltip text="Apply the texture" location="right">
    <template v-slot:activator="{ props }">
      <v-btn flat @click="app_store.apply_textures(object_tree_index)" color="primary">
        <!-- <v-btn flat @click="app_store.apply_textures(object_tree_index, texture_index)" color="primary"> -->
        <!-- <v-icon icon="mdi-check-circle" size="20" v-bind="props" color="success" /> -->
        Apply
      </v-btn>
    </template>
  </v-tooltip>
</template>

<script setup>
import { use_app_store } from '@/stores/app'

const app_store = use_app_store()

const props = defineProps({
  object_tree_index: { type: Number, required: true },
  texture_index: { type: Number, required: true }
})

const { object_tree_index, texture_index } = props


function validate_textures () {

}
</script>