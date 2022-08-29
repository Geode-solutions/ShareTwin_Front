import vtkWSLinkClient from '@kitware/vtk.js/IO/Core/WSLinkClient'
import SmartConnect from 'wslink/src/SmartConnect'

import '@kitware/vtk.js/Rendering/OpenGL/Profiles/Geometry'
import { connectImageStream } from '@kitware/vtk.js/Rendering/Misc/RemoteView'
import protocols from '@/protocols'

// Bind vtkWSLinkClient to our SmartConnect
vtkWSLinkClient.setSmartConnectClass(SmartConnect)

export const state = () => (
  {
    client: null,
    config: null,
    busy: false
  })

export const getters = {
  WS_CLIENT (state) {
    return state.client
  },
  WS_CONFIG (state) {
    return state.config
  },
  WS_BUSY (state) {
    return !!state.busy
  }
}

export const mutations = {
  WS_CLIENT_SET (state, client) {
    state.client = client
  },
  WS_CONFIG_SET (state, config) {
    state.config = config
  },
  WS_BUSY_SET (state, busy) {
    state.busy = busy
  }
}

export const actions = {
  ws_connect ({ state, commit, dispatch }) {
    // Initiate network connection
    const config = { application: 'cone' }

    // Custom setup for development (http:8080 / ws:1234)
    // if (location.port === '8080') {
    // We suppose that we have dev server and that ParaView/VTK is running on port 1234
    // ws://api2.geode-solutions.com/ws
    config.sessionURL = this.$config.WS_URL
    // config.sessionURL = 'wss://api2.geode-solutions.com/ws'
    console.log('API URL :', config.sessionURL)
    // }

    const { client } = state
    if (client && client.isConnected()) {
      client.disconnect(-1)
    }
    let clientToConnect = client
    if (!clientToConnect) {
      clientToConnect = vtkWSLinkClient.newInstance({ protocols })
    }

    // Connect to busy store
    clientToConnect.onBusyChange((count) => {
      commit('WS_BUSY_SET', count)
    })
    clientToConnect.beginBusy()

    // Error
    clientToConnect.onConnectionError((httpReq) => {
      const message =
        (httpReq && httpReq.response && httpReq.response.error) ||
        'Connection error'
      console.error(message)
      console.log(httpReq)
    })

    // Close
    clientToConnect.onConnectionClose((httpReq) => {
      const message =
        (httpReq && httpReq.response && httpReq.response.error) ||
        'Connection close'
      console.error(message)
      console.log(httpReq)
    })

    // Connect
    clientToConnect
      .connect(config)
      .then((validClient) => {
        connectImageStream(validClient.getConnection().getSession())
        commit('WS_CLIENT_SET', validClient)
        clientToConnect.endBusy()

        // Now that the client is ready let's setup the server for us
        dispatch('WS_INITIALIZE_SERVER')
        // if (state.client) {
        if (state.client) {
          state.client.getRemote().Cone.reset().catch(console.error)
        }
        // state.client.Cone.reset()
        // }
      })
      .catch((error) => {
        console.error(error)
      })
  },
  WS_INITIALIZE_SERVER ({ state }) {
    if (state.client) {
      state.client
        .getRemote()
        .Cone.createVisualization()
        .catch(console.error)
    }
  },
  resetCamera ({ state }) {
    if (state.client) {
      state.client.getRemote().Cone.resetCamera().catch(console.error)
    }
  }
}

