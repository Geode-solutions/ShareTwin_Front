export const state = () => (
  {
    resolution: 6,
    height: 2,
    filename: ''
  })

export const getters = {
  resolution (state) {
    return state.resolution
  },
  height (state) {
    return state.height
  },
  filename (state) {
    return state.filename
  }
}
export const actions = {
  async setConeResolution ({ state, dispatch }, resolution) {
    const r = Number(resolution)
    state.resolution = r
    return dispatch('WS_UPDATE_RESOLUTION', r)
  },
  async setConeHeight ({ state, dispatch }, height) {
    const h = Number(height)
    state.height = h
    return dispatch('WS_UPDATE_HEIGHT', h)
  },
  async sendFilenames ({ rootState }, filenames) {
    // return dispatch('WS_SEND_FILENAME', files);
    console.log(rootState)
    console.log("filenames :", filenames)
    if (rootState.wslink.client) {
      rootState.wslink.client
        .getRemote()
        .Cone.sendFilenames(filenames)
        .catch(console.error)
    }
  }
}

