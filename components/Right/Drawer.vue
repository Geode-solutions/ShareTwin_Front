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

      <v-card v-for="(real_picked_point, index) in real_picked_points" elevation="2" class="pa-0">
        <v-card-title>
          Point {{ index + 1 }}
        </v-card-title>
        <v-card-text>
          <v-row align="center">
            <v-col cols="10">
              <v-row>
                <v-col cols="6">
                  <v-chip class="overflow-x-hidden">
                    x : {{ real_picked_point.world_x }}
                  </v-chip>
                </v-col>
                <v-col cols="6">
                  <v-chip class="overflow-x-hidden">
                    y : {{ real_picked_point.world_y }}
                  </v-chip>
                </v-col>
              </v-row>
            </v-col>
            <v-spacer />
            <v-col cols="auto">
              <v-tooltip text="Toggle picking mode" location="left">
                <template v-slot:activator="{ props }">
                  <v-btn flat icon size="20" @click="pick_point(index)">
                    <v-icon size="20" color="primary" v-bind="props">mdi-crosshairs-gps</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="py-0">
              <v-text-field label="Real x" type="number" step="0.01" density='compact'
                :model-value="real_picked_points[index].real_x" />
            </v-col>
            <v-col class="py-0">
              <v-text-field label="Real y" type="number" step="0.01" density='compact'
                :model-value="real_picked_points[index].real_y" />
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider v-if="index <= real_picked_points.length" />
      </v-card>
    </v-row>
    <v-row align="center">
      <v-col class='text-center'>

        <v-btn text="Apply georeferecing" :disabled="!real_picked_points_valid" color="primary" rounded
          @click="apply_georeferencing" />
      </v-col>
    </v-row>

  </v-navigation-drawer>
</template>

<script setup>

const app_store = use_app_store()
const vtk_store = use_vtk_store()
const ws_link_store = use_ws_link_store()

function create_data () {
  const world_x = ref(null)
  const world_y = ref(null)
  const real_x = ref(null)
  const real_y = ref(null)
  return { world_x, world_y, real_x, real_y }
}

const real_picked_points = [create_data(), create_data(), create_data()]
const { display_georeferencing_drawer, picking_mode, picked_point, object_tree, object_tree_index } = storeToRefs(app_store)

function pick_point (point_index) {
  // app_store.set_picked_point_index(point_index)
  app_store.toggle_picking_mode(true)


  watchOnce(picking_mode, (value) => {
    // triggers only once
    console.log(value)
    console.log(picked_point)
    console.log(picked_point.value.x)
    console.log(picked_point.value.y)

    real_picked_points[point_index].world_x = picked_point.value.x
    real_picked_points[point_index].world_y = picked_point.value.y
    console.log('source changed!')
  })
}

function real_picked_points_valid () {
  for (let i = 0; i < real_picked_points.length; i++) {
    if (!real_picked_points[i].real_x.value == null || !real_picked_points[i].real_y.value == null || !real_picked_points[i].world_x.value == null || !real_picked_points[i].world_y.value == null) {
      return false
    }
  }
  return true
}

async function apply_georeferencing () {
  ws_link_store.$patch({ busy: true })
  console.log('object_tree_index', object_tree_index.value)
  console.log('real_picked_points', real_picked_points)

  const params = new FormData()

  params.append('geode_object', object_tree.value[object_tree_index.value].geode_object)
  params.append('id', object_tree.value[object_tree_index.value].id)
  params.append('filename', object_tree.value[object_tree_index.value].native_file_name)
  params.append('coordinate_system_name', 'test')
  params.append('input_origin_x', real_picked_points[0].world_x)
  params.append('input_origin_y', real_picked_points[0].world_y)
  params.append('input_point_1_x', real_picked_points[1].world_x)
  params.append('input_point_1_y', real_picked_points[1].world_y)
  params.append('input_point_2_x', real_picked_points[2].world_x)
  params.append('input_point_2_y', real_picked_points[2].world_y)
  params.append('output_origin_x', real_picked_points[0].real_x.value)
  params.append('output_origin_y', real_picked_points[0].real_y.value)
  params.append('output_point_1_x', real_picked_points[1].real_x.value)
  params.append('output_point_1_y', real_picked_points[1].real_y.value)
  params.append('output_point_2_x', real_picked_points[2].real_x.value)
  params.append('output_point_2_y', real_picked_points[2].real_y.value)

  await api_fetch(`/georeference`, { body: params, method: 'POST' }, {
    'response_function': (response) => {
      console.log(response)
      vtk_store.update_data({ id: object_tree.value[object_tree_index.value].id })
    }
  })
  ws_link_store.$patch({ busy: false })
}

</script>



<style scoped>
.v-btn {
  text-transform: unset !important;
}
</style>
