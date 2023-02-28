import { defineStore } from 'pinia'
import { use_ws_link_store } from './ws_link'
const ws_link_store = use_ws_link_store()

export const use_vtk_store = defineStore('vtk', {
  state: () => ({
    filename: '',
  }),
  actions: {
    async create_object_pipeline (params) {
      if (ws_link_store.client) {
        use_ws_link_store().client
          .getRemote()
          .vtk.create_object_pipeline(params)
          .catch(console.error);
      }
    }
  }
})
