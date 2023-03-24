<template>
  <v-btn :loading="loading" color="primary" @click="upload_file()">
    Load
    <template #loader>
      <v-progress-circular indeterminate size="20" color="white" width="3" />
    </template>
  </v-btn>
  <v-btn variant="text" @click="current_step = 3">
    Cancel
  </v-btn>
</template>

<script setup>
import { use_app_store } from '@/stores/app'
import { use_ws_link_store } from '@/stores/ws_link'
import { use_vtk_store } from '@/stores/vtk'

const app_store = use_app_store()
const vtk_store = use_vtk_store()
const ws_link_store = use_ws_link_store()

const props = defineProps({
  component_options: { type: Object, required: true }
})
const { input_files,
  input_geode_object } = props.component_options

const stepper_tree = inject('stepper_tree')

const loading = ref(false)

async function upload_file () {
  loading.value = true
  ws_link_store.$patch({ busy: true })

  for (let i = 0; i < input_files.length; i++) {

    const reader = new FileReader()
    reader.onload = async function (event) {
      const params = new FormData()
      params.append('object_type', input_geode_object)
      params.append('file', event.target.result)
      params.append('old_file_name', input_files[i].name)
      params.append('file_size', input_files[i].size)

      await api_fetch(`/convert_file`, {
        body: params, method: 'POST', async onResponse ({ response }) {

          vtk_store.create_object_pipeline({ "file_name": response._data.viewable_file_name, "id": response._data.id })

          app_store.add_object_tree_item({
            'id': response._data.id,
            'name': response._data.name,
            'native_file_name': response._data.native_file_name,
            'viewable_file_name': response._data.viewable_file_name,
            'geode_object': input_geode_object,
            'is_visible': true
          })

          stepper_tree.current_step_index = 0
          stepper_tree.files = []
          stepper_tree.geode_object = ''

          ws_link_store.$patch({ busy: false })
        },
        onError ({ error }) {
          console.log(error)
          console.log(response)
          loading.value = false
          ws_link_store.$patch({ busy: false })
          app_store.$patch({ display_object_selector: false })
        }
      })
    }
    reader.readAsDataURL(input_files[i])
  }
  loading.value = false
  app_store.$patch({ display_object_selector: false })
}
</script>