<template>
  <v-row>
    <v-col cols="8">
      <v-combobox label="Texture" :items="texture_coordinates" variant="underlined"></v-combobox>
    </v-col>
    <v-spacer />
    <v-col cols="2" class="pa-0 align-self-center">
      <v-badge :content="texture_file.length" color="primary">
        <v-btn icon flat @click="open_file_input()">
          <v-icon icon="mdi-file-image-plus" color="primary" />
        </v-btn>
      </v-badge>
    </v-col>
  </v-row>
</template >

<script setup>
import { use_app_store } from '@/stores/app'
import { use_ws_link_store } from '@/stores/ws_link'

const app_store = use_app_store()
const ws_link_store = use_ws_link_store()

const props = defineProps({
  index: { type: Number, required: true }
})

const { index } = props
const { object_tree } = storeToRefs(app_store)

const current_object = object_tree.value[index]
const native_file_name = current_object['native_file_name']
const geode_object = current_object['geode_object']

const texture_coordinates = ref([])
const texture_file = ref([])
const viewable_file_name = ref('')


function open_file_input () {
  var input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.multiple = true;

  input.onchange = e => {
    texture_file.value = e.target.files;
    console.log(e.target.files[0].name)
  }
  input.click();
}

function convert_raster_image () {
  const reader = new FileReader()
  reader.onload = async function (event) {
    const params = new FormData()
    params.append('object_type', 'RasterImage2D')
    params.append('file', event.target.result)
    params.append('old_file_name', texture_file.value[0].name)
    params.append('file_size', texture_file.value[0].size)

    await api_fetch(`/convert_file`, {
      body: params, method: 'POST', async onResponse ({ response }) {
        console.log(response)
        console.log(response._data.viewable_file_name)
        viewable_raster_image_file_name.value = response._data.viewable_file_name
        ws_link_store.$patch({ busy: false })
      },
      onError ({ error }) {
        console.log(error)
        console.log(response)
        loading.value = false
        ws_link_store.$patch({ busy: false })
      }
    })
  }
  reader.readAsDataURL(texture_file.value[0])
}

async function get_texture_coordinates () {
  const params = new FormData()
  params.append('native_file_name', native_file_name)
  params.append('geode_object', geode_object)
  // console.log(native_file_name)
  // console.log(geode_object)
  await api_fetch(`/get_texture_coordinates`, {
    body: params, method: 'POST', async onResponse ({ response }) {
      console.log(response)
      texture_coordinates.value = response._data.texture_coordinates
      ws_link_store.$patch({ busy: false })
    },
    onError ({ response, error }) {
      console.log(error)
      console.log(response)
      ws_link_store.$patch({ busy: false })
    }
  })
}

onMounted(() => {
  get_texture_coordinates()
})


watch(texture_file, async new_value => {
  convert_raster_image()
})

watch(viewable_file_name, async new_value => {
  console.log('viewable_file_name', new_value)
  app_store.add_object_texture(index, { "texture_name": 'Tile_+046_+027_0', "texture_file_name": new_value })
})
</script>
      