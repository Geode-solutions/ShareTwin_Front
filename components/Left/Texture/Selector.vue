<template class="pa-0">
  <v-row class="pa-0 align-self-center">
    <v-col cols="1" class="pa-0 align-self-center">
      <v-container v-if="object_tree[object_tree_index].textures.length > 1" class="pa-0">

        <LeftTextureDeleteButton :object_tree_index="object_tree_index" :texture_index="texture_index" />
      </v-container>
    </v-col>
    <v-col cols="8" class="pa-0 align-self-center">
      <v-combobox label="Texture" :loading="loading" :items="texture_coordinates" variant="underlined"
        v-model="texture_name" class="pa-0"></v-combobox>
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
  <v-row v-if="texture_index == object_tree[object_tree_index].textures.length - 1" class="pa-0">
    <v-col cols="1" class="pa-0 align-self-center">

      <LeftTextureAddButton :object_tree_index="object_tree_index" />
    </v-col>
  </v-row>
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

// const { object_tree_index } = props
const object_tree_index = 0
const { object_tree } = storeToRefs(app_store)

const current_object = object_tree.value[object_tree_index]
const native_file_name = current_object['native_file_name']
const geode_object = current_object['geode_object']

const loading = ref(false)
const raster_image_input_extensions = ref('')
const texture_coordinates = ref([])
const texture_name = ref([])
const texture_file = ref([])
const viewable_file_name = ref('')


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
      },
      onError ({ error }) {
        console.log(error)
        console.log(response)
      }
    })
    ws_link_store.$patch({ busy: false })
  }
  reader.readAsDataURL(texture_file.value[0])
}

async function get_texture_coordinates () {
  loading.value = true
  const params = new FormData()
  params.append('native_file_name', native_file_name)
  params.append('geode_object', geode_object)
  await api_fetch(`/texture_coordinates`, {
    body: params, method: 'POST', async onResponse ({ response }) {
      console.log(response)
      texture_coordinates.value = response._data.texture_coordinates
    },
    onError ({ response, error }) {
      console.log(error)
      console.log(response)
    }
  })
  loading.value = false
}

async function get_raster_image_input_extensions () {
  ws_link_store.$patch({ busy: true })
  const params = new FormData()
  params.append('geode_object', 'RasterImage2D')
  await api_fetch(`/object_allowed_files`, {
    body: params, method: 'POST', async onResponse ({ response }) {
      console.log(response)
      raster_image_input_extensions.value = response._data.extensions.map((extension) => '.' + extension).join(',')
    },
    onError ({ response, error }) {
      console.log(error)
      console.log(response)
    }
  })
  ws_link_store.$patch({ busy: false })
}

onMounted(() => {
  get_texture_coordinates()
  get_raster_image_input_extensions()
})

watch(texture_file, () => {
  convert_raster_image()
})

watch(viewable_file_name, async new_value => {
  app_store.add_object_texture(object_tree_index, { "texture_name": texture_name.value, "texture_file_name": new_value })
})
</script>


<style>
.v-expansion-panel-content__wrap {
  padding: 0 !important;
}
</style>
      