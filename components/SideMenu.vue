<template>
  <v-expansion-panels v-if="is_cloud_running" multiple accordion>
    <v-expansion-panel>
      <v-expansion-panel-title>
        <div>
          <v-icon color="primary" size="30">
            mdi-file-upload
          </v-icon>
          Load files
        </div>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-row v-for="(item, index) in data_tree.items" :key="index">
          <component :is="item.component.component_name" :component_options="item.component.component_options"
            :index="index" />
        </v-row>
        <v-row align-content="center" justify="center">
          <v-col cols="auto">
            <v-btn color="primary" @click="upload_file()">
              Upload
            </v-btn>
          </v-col>
        </v-row>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
import { use_cloud_store } from '@/stores/cloud'
import { use_ws_link_store } from '@/stores/ws_link'
import { use_vtk_store } from '@/stores/vtk'
import FileSelector from '@/components/FileSelector.vue'

const cloud_store = use_cloud_store()
const ws_link_store = use_ws_link_store()
const vtk_store = use_vtk_store()

const { is_cloud_running } = storeToRefs(cloud_store)

const data_tree = reactive({
  items: [
    {
      file: [],
      component: {
        component_name: shallowRef(FileSelector),
        component_options: {
          multiple: false,
          label: 'Please select a file'
          , accept: ".obj, .vtp"
        }
      }

    }
  ]
})

provide('data_tree', data_tree)

async function upload_file () {
  ws_link_store.$patch({ busy: true })
  console.log('1')
  for (let i = 0; i < data_tree.items.length; i++) {
    console.log('2')
    let current_item = data_tree.items[i]
    const reader = new FileReader()
    reader.onload = async function (event) {
      console.log('4')
      const params = new FormData()
      params.append('file', event.target.result)
      params.append('filename', data_tree.items[i].file[0].name)
      params.append('filesize', data_tree.items[i].file[0].size)
      const route = "convertfile"
      params.append('object', 'PolygonalSurface3D')
      params.append('extension', 'vtp')
      console.log('5')

      if (current_item.file.length) {
        console.log('6')
        await api_fetch(`/geode/convertfile`, {
          body: params, method: 'POST', onResponse ({ response }) {
            load(response._data.newFilename)
          },
          onError ({ error }) {
            console.log(error)
            ws_link_store.$patch({ busy: false })
          }
        })
      }
    }
    if (current_item.file.length) {
      console.log('3.5')
      console.log(current_item.file[0])
      reader.readAsDataURL(current_item.file[0])
    }
  }
}

async function load (DataFilename) {
  vtk_store.send_filenames({ DataFilename })
}

</script>
