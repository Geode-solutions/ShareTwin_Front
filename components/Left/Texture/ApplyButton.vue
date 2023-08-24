<template>
  <v-tooltip :text="tooltip" location="bottom">
    <template v-slot:activator="{ props }">
      <div class="pa-0" v-bind="props">
        <v-btn :loading="loading" class="btn" flat @click="apply_textures(object_tree_index)" color="primary"
          :disabled="!are_textures_valid">
          Apply
        </v-btn>
      </div>
    </template>
  </v-tooltip>
</template>

<script setup>
const app_store = use_app_store()

const props = defineProps({
  object_tree_index: { type: Number, required: true }
})
const { object_tree_index } = props

const are_textures_valid = ref(computed(() => app_store.are_textures_valid(object_tree_index)))

const loading = ref(false)
const tooltip = ref('One or more texture isn\'t valid')

watch(are_textures_valid, (value) => {
  if (value) {
    tooltip.value = 'Apply the texture(s)'
  } else {
    tooltip.value = 'One or more texture isn\'t valid'
  }
})



function apply_textures (object_tree_index) {
  loading.value = true
  app_store.apply_textures(object_tree_index)
  loading.value = false
}
</script>

<style scoped>
.btn {
  text-transform: unset !important;
}
</style>