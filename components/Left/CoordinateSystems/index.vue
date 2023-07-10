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
              Coordinate systems
            </h4>
          </v-col>
        </v-row>
      </v-expansion-panel-title>
      <v-expansion-panel-text class="pa-0">
        <v-row>
          <v-col align-self-center>
            <v-radio-group v-model="id">
              <v-row v-for="(coordinate_system, index) in coordinate_systems" align="center" class="pa-0">
                <v-col class="pa-1">
                  <v-radio :label=coordinate_system.name :value=index />
                </v-col>
                <v-spacer />
                <v-col align-self-center class="text-center justify-center pa-0">
                  <v-btn v-if="coordinate_system.is_geo" text="Convert" color="primary" rounded density='compact'
                    @click="app_store.toggle_display_crs_converter(true, object_tree_index)" />
                  <v-btn v-else text="Assign" color="primary" rounded density='compact'
                    @click="app_store.toggle_display_crs_assigner(true, object_tree_index)" />
                </v-col>
              </v-row>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-divider class="pa-2" />
        <v-row>
          <v-col cols="12" align="center">
            <v-btn text="Georeference" @click="app_store.toggle_display_georeferencing_drawer(true, object_tree_index)"
              color="primary" rounded />
          </v-col>
        </v-row>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>

const app_store = use_app_store()
const ws_link_store = use_ws_link_store()

const props = defineProps({
  object_tree_index: { type: Number, required: true }
})


const { object_tree_index } = props
const { object_tree } = storeToRefs(app_store)

const current_object = object_tree.value[object_tree_index]
const native_file_name = current_object['native_file_name']
const geode_object = current_object['geode_object']

const id = ref(0)
const coordinate_systems = ref([])

async function get_coordinate_systems () {
  ws_link_store.$patch({ busy: true })
  const params = new FormData()
  params.append('native_file_name', native_file_name)
  params.append('geode_object', geode_object)
  await api_fetch(`/coordinate_systems`, { body: params, method: 'POST' }, {
    'response_function': (response) => {
      console.log(response)
      coordinate_systems.value = response._data.coordinate_systems
    }
  })
  ws_link_store.$patch({ busy: false })
}


onMounted(() => {
  get_coordinate_systems()
})
</script>
<style scoped>
.v-btn {
  text-transform: unset !important;
}
</style>
