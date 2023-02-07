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
        <v-row v-for="(item, index) in data_tree" :key="index">
          <compo :component_options="item.component_options" />
        </v-row>
        <v-row align-content="center" justify="center">
          <v-col cols="auto">
            <v-btn color="primary" @click="upload_file">
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
import FileSelector from './FileSelector.vue'

const cloud_store = use_cloud_store()
const ws_link_store = use_ws_link_store()

const { is_cloud_running } = storeToRefs(cloud_store)

const data_tree = reactive([
  {
    title: '',
    file: [],
    component: {
      component_name: shallowRef(FileSelector),
      component_options: {
        label: "Please select a data file"
        , accept: ".obj, .vtp"
      }
    }
    , type: "data"
  }
])

async function upload_file () {
  ws_link_store.$patch({ busy: true })

  for (let i = 0; i < data_tree.length; i++) {
    if (data_tree[i].file.length) {
      const reader = new FileReader()
      reader.onload = async function (event) {
        const params = new FormData()
        params.append('file', event.target.result)
        params.append('filename', data_tree[i].file[0].name)
        params.append('filesize', data_tree[i].file[0].size)
        params.append('object', 'PolygonalSurface3D')
        params.append('extension', 'vtp')
        if (data_tree[i].file.length) {
          try {
            const { data, error } = await api_fetch(`/${convertfile}`, { body: params, method: 'POST' })
            let new_filename = data.value.newFilename
            console.log({ new_filename })
            load(new_filename)
            ws_link_store.$patch({ busy: false })
          } catch (error) {
            console.log({ error })

          }
        }
        if (data_tree[i].file.length) {
          reader.readAsDataURL(data_tree[i].file[0])
        }
      }
    }
  }
  async function load (data_filename) {
    send_filenames({ data_filename })
  }
}

</script>
