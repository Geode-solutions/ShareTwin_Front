<template>
  <v-combobox label="Texture" :loading="loading" :items="texture_coordinates" variant="underlined" v-model="texture_name"
    :error="error" class="pa-0" @click:clear="error = true" @click:append-outer="error = false" clearable></v-combobox>
</template>

<script setup>
import { use_app_store } from '@/stores/app'

const app_store = use_app_store()

const props = defineProps({
  object_tree_index: { type: Number, required: true },
  texture_index: { type: Number, required: true }
})

const { object_tree_index, texture_index } = props
const { object_tree } = storeToRefs(app_store)

const current_object = object_tree.value[object_tree_index]
const native_file_name = current_object['native_file_name']
const geode_object = current_object['geode_object']

const error = object_tree.value[object_tree_index].textures[texture_index].texture_name.is_valid
// const error = ref(false)
const loading = ref(false)
const texture_coordinates = ref([])
const texture_name = ref([])

async function get_texture_coordinates () {
  loading.value = true
  const params = new FormData()
  params.append('native_file_name', native_file_name)
  params.append('geode_object', geode_object)
  await api_fetch(`/texture_coordinates`, {
    body: params, method: 'POST', async onResponse ({ response }) {
      texture_coordinates.value = response._data.texture_coordinates
    },
    onError ({ response, error }) {
      console.log(error)
      console.log(response)
    }
  })
  loading.value = false
}


onMounted(() => {
  get_texture_coordinates()
})



watch(texture_name, async new_value => {
  console.log('texture_name value: ', new_value)
  const is_valid = ref(true)
  if (new_value != null && new_value != undefined) {
    is_valid.value = true
  } else {
    is_valid.value = false
  }
  console.log('is_valid.value', is_valid.value)

  app_store.modify_texture_object(object_tree_index, texture_index, {
    'texture_name': {
      'value': new_value,
      'is_valid': is_valid.value
    }
  })
})

</script>