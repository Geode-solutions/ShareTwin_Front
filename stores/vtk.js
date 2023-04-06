import { defineStore } from 'pinia'
import { use_ws_link_store } from './ws_link'
const ws_link_store = use_ws_link_store()

export const use_vtk_store = defineStore('vtk', {
  state: () => ({}),
  actions: {
    async create_object_pipeline (params) {
      if (ws_link_store.client) {
        use_ws_link_store().client
          .getRemote()
          .vtk.create_object_pipeline(params)
          .catch(console.error);
      }
    },
    async toggle_object_visibility (params) {
      if (ws_link_store.client) {
        use_ws_link_store().client
          .getRemote()
          .vtk.toggle_object_visibility(params)
          .catch(console.error);
      }
    },
    async apply_textures (params) {
      if (ws_link_store.client) {
        ws_link_store.$patch({ busy: true })
        use_ws_link_store().client
          .getRemote()
          .vtk.apply_textures(params)
          .catch(console.error);

        ws_link_store.$patch({ busy: false })
      }
    }
  }
})
