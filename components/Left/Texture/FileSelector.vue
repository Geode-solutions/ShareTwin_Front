<template>
  <v-badge :icon="display_badge ? 'mdi-check' : 'mdi-help'" :color="display_color ? 'black' : 'grey'">
    <v-btn icon flat @click="open_file_input()">
      <v-icon icon="mdi-file-image-plus" :color="display_color ? 'black' : 'grey'" />
    </v-btn>
  </v-badge>
</template>

<script setup>
import { use_app_store } from '@/stores/app'
import { use_ws_link_store } from '@/stores/ws_link'

const app_store = use_app_store()
const ws_link_store = use_ws_link_store()

const props = defineProps({
  object_tree_index: { type: Number, required: true },
  texture_index: { type: Number, required: true }
})

const { object_tree_index, texture_index } = props

const raster_image_input_extensions = ref('')
const texture_file = ref([])
const viewable_file_name = ref('')

const display_color = ref(false)
const display_badge = ref(false)

async function get_raster_image_input_extensions () {
  ws_link_store.$patch({ busy: true })
  const params = new FormData()
  params.append('geode_object', 'RasterImage2D')
  await api_fetch(`/object_allowed_files`, {
    body: params, method: 'POST', async onResponse ({ response }) {
      raster_image_input_extensions.value = response._data.extensions.map((extension) => '.' + extension).join(',')
    },
    onError ({ response, error }) {
      console.log(error)
      console.log(response)
    }
  })
  ws_link_store.$patch({ busy: false })
}

function open_file_input () {
  var input = document.createElement('input');
  input.type = 'file';
  input.accept = raster_image_input_extensions.value;
  input.multiple = false;

  input.onchange = e => {
    texture_file.value = e.target.files;
  }
  input.click();
}

function convert_raster_image () {
  display_color.value = true
  ws_link_store.$patch({ busy: true })
  const reader = new FileReader()
  reader.onload = async function (event) {
    const params = new FormData()
    params.append('object_type', 'RasterImage2D')
    params.append('file', event.target.result)
    params.append('old_file_name', texture_file.value[0].name)
    params.append('file_size', texture_file.value[0].size)

    await api_fetch(`/convert_file`, {
      body: params, method: 'POST', async onResponse ({ response }) {
        viewable_file_name.value = response._data.viewable_file_name
        display_badge.value = true
      },
      onError ({ error }) {
        display_color.value = false
        display_badge.value = false
        console.log(error)
        console.log(response)
      }
    })
    ws_link_store.$patch({ busy: false })
  }
  reader.readAsDataURL(texture_file.value[0])
}

onMounted(() => {
  get_raster_image_input_extensions()
})

watch(texture_file, () => {
  convert_raster_image()
})
watch(viewable_file_name, async new_value => {
  app_store.modify_texture_object(object_tree_index, texture_index, "texture_file_name", new_value)

})

</script>