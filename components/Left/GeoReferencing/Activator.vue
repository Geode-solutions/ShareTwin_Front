<template>
  <v-expansion-panels multiple accordion dense>
    <v-expansion-panel class="pa-0 align-self-center">
      <v-expansion-panel-title>
        <v-row>
          <v-col cols="auto" class="pa-0 align-self-center">
            <v-icon icon="mdi-earth" />
          </v-col>
          <v-col cols="auto" class="align-self-center">
            <h4 class="overflow-x-hidden">
              Geo Referencing
            </h4>
          </v-col>
        </v-row>
      </v-expansion-panel-title>
      <v-expansion-panel-text clas="pa-0">
        <v-row>
          <v-col align-self-center>

            <v-btn text="Assign georeferencing" @click="app_store.toggle_display_georeferencing_drawer(true)"
              color="primary">

            </v-btn>
          </v-col>
        </v-row>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
import { use_app_store } from '@/stores/app'
const app_store = use_app_store()

const props = defineProps({
  object_tree_index: { type: Number, required: true }
})

// const { object_tree_index } = props
// const { object_tree } = storeToRefs(app_store)
</script>
<style scoped></style>
