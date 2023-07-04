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
      <v-expansion-panel-text clas="pa-0">

        <v-radio-group v-model="id">
          {{ id }}
          <v-radio label="Radio 1" value="1"></v-radio>
          <v-radio label="Radio 2" value="2"></v-radio>
          <v-radio label="Radio 3" value="3"></v-radio>
        </v-radio-group>
        <v-row>
          <v-col align-self-center>

            <v-btn text="Georeference" @click="app_store.toggle_display_georeferencing_drawer(true)" color="primary">

            </v-btn>
          </v-col>
        </v-row>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>

const app_store = use_app_store()

const props = defineProps({
  object_tree_index: { type: Number, required: true }
})


const { object_tree_index } = props
const { object_tree } = storeToRefs(app_store)

const current_object = object_tree.value[object_tree_index]
const native_file_name = current_object['native_file_name']
const geode_object = current_object['geode_object']

const id = ref(0)

async function get_coordinate_systems () {
  loading.value = true
  const params = new FormData()
  params.append('native_file_name', native_file_name)
  params.append('geode_object', geode_object)
  await api_fetch(`/coordinate_systems`, { body: params, method: 'POST' }, {
    'response_function': (response) => {
      coordinate_systems.value = response._data.coordinate_systems
    }
  })
  loading.value = false
}


onMounted(() => {
  get_coordinate_systems()
})

// const { object_tree_index } = props
// const { object_tree } = storeToRefs(app_store)
</script>
<style scoped></style>
