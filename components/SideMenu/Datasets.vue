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
        <v-img :src="image" width="35" />
      </v-col>
      <v-col cols="8" class="align-self-center">
        <h4 class="overflow-x-hidden">
          {{ name }}
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
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue';

const app_store = use_app_store()

const name = ref('')
const is_visible = ref(true)
const image = ref('')

const props = defineProps({
  index: { type: Number, required: true }
})

const { index } = props
const { object_tree } = storeToRefs(app_store)

onMounted(() => {
  console.log('mounted object_tree', object_tree)
  const current_object = object_tree.value[index]
  console.log(current_object)
  name.value = current_object['name']
  is_visible.value = current_object['is_visible']
  image.value = geode_objects[current_object['geode_object']].image

})


watch(object_tree, new_value => {
  console.log('new_value', new_value)

  const current_object = new_value[index]
  console.log(current_object)
  name.value = current_object['name']
  is_visible.value = current_object['is_visible']
  image.value = geode_objects[current_object['geode_object']].image
})

</script>
