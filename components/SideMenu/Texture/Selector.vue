<template>
  <v-combobox label="Texture" :items="texture_coordinates" variant="underlined"></v-combobox>
</template>


<script setup>
import { use_ws_link_store } from '@/stores/ws_link'
const ws_link_store = use_ws_link_store()

const props = defineProps({
  index: { type: Number, required: true }
})

const { index } = props
const emits = defineEmits('add_object_texture')
const object_tree = inject('object_tree')

const current_object = object_tree.value.items[index]
const native_file_name = current_object['native_file_name']
const geode_object = current_object['geode_object']

const texture_coordinates = ref([])

async function get_texture_coordinates () {
  const params = new FormData()
  params.append('native_file_name', native_file_name)
  params.append('geode_object', geode_object)
  console.log(native_file_name)
  console.log(geode_object)
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

</script>