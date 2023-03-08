<template>
  <v-combobox label="Texture" :items="texture_coordinates" variant="underlined"></v-combobox>
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


console.log(index)
console.log(input_file_name)
console.log(input_geode_object)

const texture_coordinates = ref([])


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