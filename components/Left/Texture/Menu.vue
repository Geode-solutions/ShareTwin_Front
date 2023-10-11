<template>
  <v-expansion-panels multiple accordion dense>
    <v-expansion-panel class="pa-0 align-self-center">
      <v-expansion-panel-title>
        <v-row>
          <v-col cols="auto" class="pa-0 align-self-center">
            <v-icon icon="mdi-texture-box" />
          </v-col>
          <v-col cols="auto" class="align-self-center">
            <h4 class="overflow-x-hidden">Textures</h4>
          </v-col>
        </v-row>
      </v-expansion-panel-title>
      <v-expansion-panel-text clas="pa-0">
        <v-container
          v-for="(item, texture_index) in textures"
          :key="object_tree_index"
          class="pa-3"
        >
          <LeftTextureSelector
            :object_tree_index="object_tree_index"
            :texture_index="texture_index"
          />
        </v-container>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
  const app_store = use_app_store()

  const props = defineProps({
    object_tree_index: { type: Number, required: true },
  })

  const { object_tree_index } = props
  const { object_tree } = storeToRefs(app_store)

  const textures = object_tree.value[object_tree_index].textures
</script>
