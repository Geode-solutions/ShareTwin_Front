<template>
  <v-row>
    <v-col cols="8">
      <SideMenuTextureSelector :index="index" @emits="add_object_texture()" />
    </v-col>
    <v-spacer />
    <v-col cols="2" class="pa-0 align-self-center">
      <SideMenuTextureFileSelector :index="index" @emits="add_object_texture()" />
    </v-col>
  </v-row>
</template >


<script setup >
import { use_app_store } from '@/stores/app'
const app_store = use_app_store()

const props = defineProps({
  index: { type: Number, required: true }
})

const { index } = props



function add_object_texture (texture_name, texture_file) {
  texture_object = { 'texture_name': texture_name, 'texture_file': texture_file }
  app_store.add_object_texture(index, add_object_texture)
}
</script>
      