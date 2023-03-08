<template>
  <v-row>
    <v-col cols="8">

      <v-combobox label="Texture" :items="texture_coordinates" variant="underlined"></v-combobox>
    </v-col>
    <v-spacer />
    <v-col cols="4" class="pa-0 align-self-center">
      <v-btn icon flat @click="open_file_input()"><v-icon icon="mdi-file-image-plus"></v-icon></v-btn>
    </v-col>
  </v-row>
</template>


<script setup>
import { use_app_store } from '@/stores/app'
const app_store = use_app_store()

const props = defineProps({
  index: { type: Number, required: true },
  input_file_name: { type: String, required: true },
  input_geode_object: { type: String, required: true },
})

const { index, input_file_name, input_geode_object } = toRefs(props)

const texture_coordinates = ref([])






function open_file_input () {
  var input = document.createElement('input');
  input.type = 'file';

  input.onchange = e => {
    var file = e.target.files[0];
  }

  input.click();
}

async function get_texture_coordinates () {
  const params = new FormData()
  params.append('file_name', input_file_name)
  params.append('geode_object', input_geode_object)
  await api_fetch(`/get_texture_coordinates`, {
    body: params, method: 'POST', async onResponse ({ response }) {
      console.log(response)
      texture_coordinates.value = response._data.texture_coordinates
      ws_link_store.$patch({ busy: false })
    },
    onError ({ error }) {
      console.log(error)
      console.log(response)
      ws_link_store.$patch({ busy: false })
    }
  })
}

onMounted(() => {
  get_texture_coordinates()
})

</script>