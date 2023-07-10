<template>
  <v-btn :loading="loading" color="primary" @click="convert_files()">
    Assign
    <template #loader>
      <v-progress-circular indeterminate size="20" color="white" width="3" />
    </template>
  </v-btn>
  <v-btn variant="text" @click="current_step = 3">
    Cancel
  </v-btn>
</template>
  
<script setup>
import { useToggle } from '@vueuse/core'

const props = defineProps({
  component_options: { type: Object, required: true }
})


const { object_tree_index, output_crs } = props.component_options
const stepper_tree = inject('stepper_tree')
const loading = ref(false)
const toggle_loading = useToggle(loading)

async function convert_files () {
  let params = new FormData()

  params.append('geode_object', input_geode_object)
  params.append('filename', input_files[i].name)
  params.append('crs_authority', output_crs['authority'])
  params.append('crs_code', output_crs['code'])
  params.append('crs_name', output_crs['name'])
  toggle_loading()

  const route = `${tool_route}/convert_file`
  await api_fetch(route, { method: 'POST', body: params },
    {
      'request_error_function': () => { toggle_loading() },
      'response_function': () => {
        toggle_loading()

        stepper_tree.current_step_index = 0
        stepper_tree.input_crs = {}
      },
      'response_error_function': () => { toggle_loading() }
    }
  )
}

</script>