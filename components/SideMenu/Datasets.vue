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
        <v-img :src="geode_objects[geode_object].image" width="35" />
      </v-col>
      <v-col cols="8" class="align-self-center">
        <h4 class="overflow-x-hidden">
          {{ displayed_name }}
        </h4>
      </v-col>
    </v-row>
  </v-expansion-panel-title>
  <v-expansion-panel-text>
    <SideMenuTexture :index="index" />
  </v-expansion-panel-text>
</template>

<script setup>
import { use_app_store } from '@/stores/app'
import geode_objects from '@/assets/geode_objects'

const app_store = use_app_store()

const props = defineProps({
  index: { type: Number, required: true }
})

const { index } = props
const object_tree = inject('object_tree')
const current_object = object_tree.value.items[index]

const id = current_object['id']
const displayed_name = current_object['displayed_name']
const file_name = current_object['file_name']
const geode_object = current_object['geode_object']
const is_visible = current_object['is_visible']
</script>
