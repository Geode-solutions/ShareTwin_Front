<template>
  <v-expansion-panel-title>
    <v-row>
      <v-col cols="auto" class="pa-0 align-self-center">

        <v-btn flat icon small v-on:click.stop="app_store.toggle_object_visibility(index)">
          <v-icon>
            {{ is_visible ? 'mdi-checkbox-marked-outline' : 'mdi-checkbox-blank-outline' }}
          </v-icon>
        </v-btn>
      </v-col>
      <v-col cols="auto" class="pa-0 align-self-center">
        <v-img :src="geode_objects[type].image" width="35" />
      </v-col>
      <v-col cols="8" class="align-self-center">
        <h4 class="overflow-x-hidden">
          {{ displayed_name }}
        </h4>
      </v-col>
    </v-row>
  </v-expansion-panel-title>
  <v-expansion-panel-text>
    <!-- <v-row>
      <v-col cols="8">

        <v-combobox label="Texture" :items="texture_coordinates" variant="underlined"></v-combobox>
      </v-col>
      <v-spacer />
      <v-col cols="4" class="pa-0 align-self-center">

        <v-btn icon flat @click="open_file_input()"><v-icon icon="mdi-file-image-plus"></v-icon></v-btn>
      </v-col>
    </v-row> -->
    <SideMenuTextureSelector :index="index" :input_file_name="displayed_name" :input_geode_object="displayed_name" />

  </v-expansion-panel-text>
</template>

<script setup>
import { use_app_store } from '@/stores/app'
import geode_objects from '@/assets/geode_objects'

const app_store = use_app_store()

const props = defineProps({
  id: { type: String, required: true },
  index: { type: Number, required: true },
  displayed_name: { type: String, required: true },
  type: { type: String, required: true },
  is_visible: { type: Boolean, required: true }
})

const texture_coordinates = ["Tile_+046_+026_0"]

const { id, index, displayed_name, type, is_visible } = toRefs(props)


function open_file_input () {
  var input = document.createElement('input');
  input.type = 'file';

  input.onchange = e => {
    var file = e.target.files[0];
  }

  input.click();
}
</script>
