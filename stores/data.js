import { defineStore } from 'pinia'
import { use_ws_link_store } from './ws_link'

export const use_data_store = defineStore('data', {
  state: () => ({
    filename: '',
  }),
  actions: {
    async send_filenames (filenames) {
      if (use_ws_link_store.client) {
        use_ws_link_store.client
          .getRemote()
          .Cone.send_filenames(filenames)
          .catch(console.error);
      }
    }
  }
})
