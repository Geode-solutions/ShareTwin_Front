<template>
  <v-tooltip text="Apply the texture" location="right">
    <template v-slot:activator="{ props }">
      <v-btn :loading="loading" class="btn" flat @click="apply_textures(object_tree_index)" color="primary"
        :disabled="!are_textures_valid">
        Apply
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

const are_textures_valid = computed(() => app_store.are_textures_valid(object_tree_index))
console.log('are_textures_valid', are_textures_valid)
const loading = ref(false)


function apply_textures (object_tree_index) {
  loading.value = true
  app_store.apply_textures(object_tree_index)
  loading.value = false
}
</script>

<style>
.btn {
  text-transform: unset !important;
}
</style>