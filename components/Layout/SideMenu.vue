<template>
  <v-navigation-drawer v-model="display_menu" clipped permanent app fixed disable-resize-watcher width="350">
    <v-expansion-panels v-if="is_cloud_running" multiple accordion dense>
      <v-expansion-panel v-for="(item, index) in object_tree.items" :key="index">
        <v-expansion-panel-title>
          <v-row>
            <v-col cols="auto" class="align-self-center">
              <v-img :src="geode_objects[item.type].image" width="35" />
            </v-col>
            <v-col cols="auto" class="align-self-center">
              <h4>
                {{ item.displayed_name }}
              </h4>
            </v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          {{ item.id }}
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

  </v-navigation-drawer>
</template>

<script setup>
import { use_app_store } from '@/stores/app'
import { use_cloud_store } from '@/stores/cloud'
import geode_objects from '@/assets/geode_objects'

const app_store = use_app_store()
const cloud_store = use_cloud_store()

const { is_cloud_running } = storeToRefs(cloud_store)
const { display_menu, object_tree } = storeToRefs(app_store)
</script>
