<template>
  <v-navigation-drawer v-model="display_georeferencing_drawer" clipped permanent app fixed disable-resize-watcher
    width="300" location="right">
    <v-row>
      <v-col>

        <v-container>
          <v-row>
            <v-spacer />
            <v-col></v-col>
            <v-btn flat icon="mdi-close" size="25" @click="app_store.toggle_display_georeferencing_drawer(false)" />
          </v-row>
        </v-container>
      </v-col>
    </v-row>
    <v-row>

      <v-card v-for="(picked_point, index) in real_picked_points" elevation="2" class="pa-0">
        <v-card-title>
          Point {{ index + 1 }}
        </v-card-title>
        <v-card-text>
          <v-row align="center">
            <v-col cols="8">
              <v-row>
                <v-col cols="6">
                  <v-chip>
                    Picked x : {{ picked_point.x }}
                  </v-chip>
                </v-col>
                <v-col cols="6">
                  <v-chip>
                    Picked y : {{ picked_point.y }}
                  </v-chip>
                </v-col>
              </v-row>
            </v-col>
            <v-spacer />
            <v-col cols="auto">
              <v-tooltip text="Toggle picking mode" location="left">
                <template v-slot:activator="{ props }">
                  <v-btn flat icon size="20" @click="test(index)">
                    <v-icon size="20" color="primary" v-bind="props">mdi-crosshairs-gps</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="py-0">
              <v-text-field label="Real x" type="number" step="0.01" density='compact' />
            </v-col>
            <v-col class="py-0">
              <v-text-field label="Real y" type="number" step="0.01" density='compact' />
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider v-if="index <= real_picked_points.length" />
      </v-card>
    </v-row>
    <v-row align="center">
      <v-col class='text-center'>

        <v-btn text="Apply georeferecing" :disabled="!are_textures_valid" color="primary" rounded />
      </v-col>
    </v-row>

  </v-navigation-drawer>
</template>

<script setup>

const app_store = use_app_store()

function create_data () {
  const world_x = ref(null)
  const world_y = ref(null)
  const real_x = ref(null)
  const real_y = ref(null)
  return { world_x, world_y, real_x, real_y }
}

const real_picked_points = [create_data(), create_data(), create_data()]
const { display_georeferencing_drawer, picking_mode } = storeToRefs(app_store)

function test (point_index) {
  // app_store.set_picked_point_index(point_index)
  app_store.toggle_picking_mode(true)


  watchOnce(picking_mode, (value) => {
    // triggers only once
    console.log('source changed!')
  })

}



</script>



<style scoped>
.v-btn {
  text-transform: unset !important;
}
</style>
