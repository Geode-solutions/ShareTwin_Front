<template>
  <v-navigation-drawer v-model="display_georeferencing_drawer" clipped permanent app fixed disable-resize-watcher
    width="300" location="right">
    <v-row class="ma-0">
      <v-col cols="auto" class="pa-2">
        <v-btn text="Reset all" @click="reset_real_picked_points()" class="pa-2" color="primary" />
      </v-col>
      <v-spacer />
      <v-col cols="auto">
        <v-btn flat icon="mdi-close" size="25" @click="app_store.toggle_display_georeferencing_drawer(false)" />
      </v-col>
    </v-row>
    <v-row class="ma-0">
      <v-card v-for="(real_picked_point, index) in real_picked_points" elevation="2" class="pa-0">
        <v-card-title>
          <v-row align="center">
            <v-col cols="auto" class="pa-0">
              <v-tooltip text="Toggle picking mode" location="left">
                <template v-slot:activator="{ props }">
                  <v-btn flat icon size="20" @click="pick_point(index)">
                    <v-icon size="20" color="primary" v-bind="props">mdi-crosshairs-gps</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
            </v-col>
            <v-col cols="auto">
              Point {{ index + 1 }}
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-row align="center">
            <v-col cols="12">
              <v-row>
                <v-col cols="6" class="pl-2 py-1">
                  <v-chip class="overflow-x-hidden">
                    x : {{ real_picked_point.world_x }}
                  </v-chip>
                </v-col>
                <v-col cols="6" class="pl-2 py-1">
                  <v-chip class="overflow-x-hidden">
                    y : {{ real_picked_point.world_y }}
                  </v-chip>
                </v-col>
              </v-row>
            </v-col>
            <v-spacer />
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
    <v-row class="text-center pa-3 ma-0">
      <v-col cols=" 12" class="text-center px-2 py-0">
        <v-text-field label=" Name of the coordinate system" v-model="coordinate_system_name" />
      </v-col>
    </v-row>
    <v-row class="text-center pa-0 ma-0">
      <v-col class="text-center pa-0">
        <v-btn text="Apply georeferecing" :disabled="disabled_button" color="primary" rounded
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

var real_picked_points = [create_data(), create_data(), create_data()]
const coordinate_system_name = ref('')
const { display_georeferencing_drawer, picking_mode, picked_point, object_tree, object_tree_index } = storeToRefs(app_store)
const disabled_button = computed(() => {
  for (let i = 0; i < real_picked_points.length; i++) {
    console.log('i', i)
    console.log(real_picked_points[i].real_x.value)
    console.log(real_picked_points[i].real_y.value)
    console.log(real_picked_points[i].world_x.value)
    console.log(real_picked_points[i].world_y.value)
    if (([null, undefined, ''].includes(real_picked_points[i].real_x.value)) ||
      ([null, undefined, ''].includes(real_picked_points[i].real_y.value)) ||
      ([null, undefined, ''].includes(real_picked_points[i].world_x.value)) ||
      ([null, undefined, ''].includes(real_picked_points[i].world_y.value))) {
      console.log('return disabled true')
      return true
    }
  }
  if (coordinate_system_name.value !== '') {
    const params = new FormData()
    params.append('geode_object', object_tree.value[object_tree_index.value].geode_object)
    params.append('filename', object_tree.value[object_tree_index.value].native_file_name)
    params.append('coordinate_system_name', coordinate_system_name.value)

    api_fetch(`/coordinate_reference_system_exists`, { body: params, method: 'POST' }, {
      'response_function': (response) => {
        console.log(response)
        // return !response._data.coordinate_reference_system_exists
        disabled_button.value = !response._data.coordinate_reference_system_exists
      }
    })
  } else {
    return true
  }
})


function reset_real_picked_points () {
  real_picked_points = [create_data(), create_data(), create_data()]
  coordinate_system_name.value = ''
}
function pick_point (point_index) {
  app_store.toggle_picking_mode(true)


  watchOnce(picking_mode, () => {
    // triggers only once
    real_picked_points[point_index].world_x.value = picked_point.value.x
    real_picked_points[point_index].world_y.value = picked_point.value.y
  })
}


async function apply_georeferencing () {
  ws_link_store.$patch({ busy: true })

  const params = new FormData()

  params.append('geode_object', object_tree.value[object_tree_index.value].geode_object)
  params.append('id', object_tree.value[object_tree_index.value].id)
  params.append('filename', object_tree.value[object_tree_index.value].native_file_name)
  params.append('coordinate_system_name', coordinate_system_name.value)
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
