<template>
  <v-tooltip text="Remove the texture" location="right">
    <template v-slot:activator="{ props }">
      <v-btn
        icon
        flat
        size="30"
        v-bind="props"
        @click="
          app_store.remove_texture_object(object_tree_index, texture_index)
        "
      >
        <v-icon icon="mdi-minus-circle" size="20" color="error"></v-icon>
      </v-btn>
    </template>
  </v-tooltip>
</template>

<script setup>
  const app_store = use_app_store()

  const props = defineProps({
    object_tree_index: { type: Number, required: true },
    texture_index: { type: Number, required: true },
  })
</script>
