<template>
  <v-btn :loading="loading" color="primary" @click="convert_file()">
    Load
    <template #loader>
      <v-progress-circular indeterminate size="20" color="white" width="3" />
    </template>
  </v-btn>
  <v-btn variant="text" @click="stepper_tree.current_step_index = 3">
    Cancel
  </v-btn>
</template>

<script setup>
  const app_store = use_app_store()
  const viewer_store = use_viewer_store()
  const websocket_store = use_websocket_store()

  const props = defineProps({
    input_files: { type: Array, required: true },
    input_geode_object: { type: String, required: true },
  })
  const { input_files, input_geode_object } = props

  const stepper_tree = inject("stepper_tree")

  const loading = ref(false)

  async function convert_file() {
    loading.value = true

    for (let i = 0; i < input_files.length; i++) {
      const reader = new FileReader()
      reader.onload = async function (event) {
        websocket_store.$patch({ busy: true })

        const params = new FormData()
        params.append("geode_object", input_geode_object)
        params.append("file", event.target.result)
        params.append("old_file_name", input_files[i].name)
        params.append("file_size", input_files[i].size)

        await api_fetch(
          `/convert_file`,
          { method: "POST", body: params },
          {
            response_function: async (response) => {
              viewer_store.create_object_pipeline({
                file_name: response._data.viewable_file_name,
                id: response._data.id,
              })

              const object_tree_item = {
                id: response._data.id,
                name: response._data.name,
                native_file_name: response._data.native_file_name,
                viewable_file_name: response._data.viewable_file_name,
                geode_object: input_geode_object,
                coordinate_systems: [],
              }
              await app_store.add_object_tree_item(object_tree_item)

              stepper_tree.current_step_index = 0
              stepper_tree.files = []
              stepper_tree.geode_object = ""
            },
          },
        )

        websocket_store.$patch({ busy: false })
      }
      reader.readAsDataURL(input_files[i])
    }
    loading.value = false
    app_store.$patch({ display_object_selector: false })
  }
</script>
