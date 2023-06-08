import { defineStore } from 'pinia'
import { use_ws_link_store } from './ws_link'

export const use_vtk_store = defineStore('vtk', {
  state: () => ({}),
  actions: {
    async create_object_pipeline (params) {
      const ws_link_store = use_ws_link_store()
      if (ws_link_store.client) {
        use_ws_link_store().client
          .getRemote()
          .vtk.create_object_pipeline(params)
          .catch(console.error);
      }
    },
    async toggle_object_visibility (params) {
      const ws_link_store = use_ws_link_store()
      if (ws_link_store.client) {
        use_ws_link_store().client
          .getRemote()
          .vtk.toggle_object_visibility(params)
          .catch(console.error);
      }
    },
    async apply_textures (params) {
      const ws_link_store = use_ws_link_store()
      if (ws_link_store.client) {
        ws_link_store.$patch({ busy: true })
        use_ws_link_store().client
          .getRemote()
          .vtk.apply_textures(params)
          .catch(console.error);

        ws_link_store.$patch({ busy: false })
      }
    },
    async get_point_position (params) {
      const ws_link_store = use_ws_link_store()
      if (ws_link_store.client) {
        ws_link_store.$patch({ busy: true })
        use_ws_link_store().client
          .getRemote()
          .vtk.get_point_position(params)
          .catch(console.error);

        ws_link_store.$patch({ busy: false })
      }
    }
  }
})
