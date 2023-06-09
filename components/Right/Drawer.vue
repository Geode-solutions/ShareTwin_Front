<template>
  <v-navigation-drawer clipped permanent app fixed disable-resize-watcher width="200" location="right">
    <v-card v-for="(picked_point, index) in picked_points">
      <v-card-title>

        Point {{ index + 1 }}
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            x: {{ picked_point.x }}
          </v-col>
          <v-col cols="6">
            y: {{ picked_point.y }}
          </v-col>
        </v-row>
        <v-row>

        </v-row>
        <v-row>
          <v-col>

            <v-input type="number" append-icon="mdi-alpha-x"></v-input>
          </v-col>
          <v-col>
            <v-input type="number" append-icon="mdi-alpha-y"></v-input>
          </v-col>
        </v-row>
        <v-row>

        </v-row>
      </v-card-text>
    </v-card>

  </v-navigation-drawer>
</template>

<script setup>
import { use_app_store } from '@/stores/app'
const app_store = use_app_store()

// const props = defineProps({
//   object_tree_index: { type: Number, required: true }
// })

const { display_georeferencing_drawer, picked_points } = storeToRefs(app_store)


</script>



<style scoped></style>
