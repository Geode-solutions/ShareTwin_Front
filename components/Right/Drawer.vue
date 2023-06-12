<template>
  <v-navigation-drawer v-model="display_georeferencing_drawer" clipped permanent app fixed disable-resize-watcher
    width="300" location="right">
    <v-container>
      <v-row>
        <v-spacer />
        <v-col></v-col>
        <v-btn flat icon="mdi-close" size="25" @click="app_store.toggle_display_georeferencing_drawer(false)" />
      </v-row>
    </v-container>
    <v-card v-for="(picked_point, index) in picked_points" elevation="2" class="pa-2">
      <v-card-title>
        <v-row>
          <v-col>
            Point {{ index + 1 }}
          </v-col>
        </v-row>

      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="4">
            x : {{ picked_point.x }}
          </v-col>
          <v-col cols="4">
            y : {{ picked_point.y }}
          </v-col>
          <v-spacer />
          <v-col>
            <v-tooltip text="Pick a point" location="left">
              <template v-slot:activator="{ props }">
                <v-btn flat icon size="20" @click="test(index)">
                  <v-icon size="20" color="primary">mdi-crosshairs-gps</v-icon>
                </v-btn>
              </template>
            </v-tooltip>
          </v-col>
        </v-row>
        <v-row>

        </v-row>
        <v-row>
          <v-col>
            <v-text-field label="X"></v-text-field>
            <!-- <v-input type="number" append-icon="mdi-alpha-x"></v-input> -->
          </v-col>
          <v-col>
            <v-text-field label="Y"></v-text-field>
            <!-- <v-input type="number" append-icon="mdi-alpha-y"></v-input> -->
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


const real_picked_points = []

function test (point_index) {
  app_store.set_picked_point_index(point_index)
  app_store.toggle_picking_mode(true)
}

const { display_georeferencing_drawer, picked_points } = storeToRefs(app_store)


</script>



<style scoped></style>
