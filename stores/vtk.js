import { defineStore } from 'pinia'
import { use_ws_link_store } from './ws_link'
const ws_link_store = use_ws_link_store()

export const use_vtk_store = defineStore('vtk', {
  state: () => ({
    filename: '',
  }),
  actions: {
    async send_filenames (filenames) {
      if (ws_link_store.client) {
        use_ws_link_store().client
          .getRemote()
          .vtk.send_filenames(filenames)
          .catch(console.error);
      }
    }
  }
})
