<template>
  <v-btn :loading="loading" color="primary" @click="convert_files()">
    Convert
    <template #loader>
      <v-progress-circular indeterminate size="20" color="white" width="3" />
    </template>
  </v-btn>
  <v-btn variant="text" @click="stepper_tree.current_step_index = 3">
    Cancel
  </v-btn>
</template>
  
<script setup>
import { useToggle } from '@vueuse/core'

const app_store = use_app_store()

const props = defineProps({
  component_options: { type: Object, required: true }
})

const { object_tree_index, input_crs, output_crs } = props.component_options
const stepper_tree = inject('stepper_tree')
const loading = ref(false)
const toggle_loading = useToggle(loading)

async function convert_files () {
  let params = new FormData()
  const object_tree_item = app_store.object_tree[object_tree_index]

  params.append('geode_object', object_tree_item.geode_object)
  params.append('id', object_tree_item.id)
  params.append('filename', object_tree_item.native_file_name)
  params.append('input_crs_authority', input_crs['authority'])
  params.append('input_crs_code', input_crs['code'])
  params.append('input_crs_name', input_crs['name'])
  params.append('output_crs_authority', output_crs['authority'])
  params.append('output_crs_code', output_crs['code'])
  params.append('output_crs_name', output_crs['name'])

  toggle_loading()

  const route = `/convert_geographic_coordinate_system`
  await api_fetch(route, { method: 'POST', body: params },
    {
      'request_error_function': () => { toggle_loading() },
      'response_function': () => {
        toggle_loading()
        stepper_tree.current_step_index = 0
        stepper_tree.input_crs = {}
        stepper_tree.output_crs = {}
      },
      'response_error_function': () => { toggle_loading() }
    }
  )

}

</script>