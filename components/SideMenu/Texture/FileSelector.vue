<template>
  <v-badge :content="texture_file.length" color="primary">
    <v-btn icon flat @click="open_file_input()"><v-icon icon="mdi-file-image-plus" color="primary"></v-icon></v-btn>
  </v-badge>
</template>

<script setup>
import { use_app_store } from '@/stores/app'
const app_store = use_app_store()

const props = defineProps({
  index: { type: Number, required: true }
})

const { index } = props

function get_raster_image_ () {
  return 1
}

const texture_file = ref([])
const viewable_file_name = ref('')

watch(texture_file, async new_value => {
  convert_raster_image()
})

watch(viewable_file_name, async new_value => {
  console.log('viewable_file_name', new_value)
  app_store.add_object_texture(index, { "texture_file_name": new_value })
})


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
        viewable_file_name.value = response._data.viewable_file_name
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

onMounted(() => {
  get_raster_image_()
})

</script>