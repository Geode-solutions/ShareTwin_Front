<template>
  <v-row class="pa-0 align-self-center">
    <v-col cols="1" class="pa-0 align-self-center">
      <v-container v-if="textures.length > 1" class="pa-0">
        <LeftTextureDeleteButton :object_tree_index="object_tree_index" :texture_index="texture_index" />
      </v-container>
    </v-col>
    <v-col cols="7" class="pa-0 align-self-center">
      <LeftTextureNameSelector :object_tree_index="object_tree_index" :texture_index="texture_index" />
    </v-col>
    <v-col cols="2" class="pa-0 align-self-center">
      <LeftTextureFileSelector :object_tree_index="object_tree_index" :texture_index="texture_index" />
    </v-col>
    <v-spacer />

  </v-row>
  <v-row v-if="texture_index == textures.length - 1" class="pa-0">
    <v-col cols="1" class="pa-0 align-self-center">
      <LeftTextureAddButton :object_tree_index="object_tree_index" />
    </v-col>
    <v-spacer />
    <v-col cols="auto" class="pa-0 align-self-center">
      <LeftTextureApplyButton :object_tree_index="object_tree_index" />
    </v-col>

  </v-row>
</template>

<script setup>

const app_store = use_app_store()

const props = defineProps({
  object_tree_index: { type: Number, required: true },
  texture_index: { type: Number, required: true }
})

const { object_tree_index, texture_index } = props
const { object_tree } = storeToRefs(app_store)

const textures = object_tree.value[object_tree_index].textures
</script>
