import { defineStore } from 'pinia'

export const use_data_store = defineStore('data', {
  state: () => ({
    filename: '',
  }),
  actions: {
    async send_filenames ({ rootState }, filenames) {
      // return dispatch('WS_SEND_FILENAME', files);
      console.log(rootState)
      if (rootState.wslink.client) {
        rootState.wslink.client
          .getRemote()
          .Cone.send_filenames(filenames)
          .catch(console.error);
      }
    }
  }
})
