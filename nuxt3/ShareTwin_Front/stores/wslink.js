import { defineStore } from 'pinia'

import vtkWSLinkClient from 'vtk.js/Sources/IO/Core/WSLinkClient';
import SmartConnect from 'wslink/src/SmartConnect';

import protocols from 'Visualization_Frontend/src/protocols';

import { connectImageStream } from 'vtk.js/Sources/Rendering/Misc/RemoteView';

// Bind vtkWSLinkClient to our SmartConnect
vtkWSLinkClient.setSmartConnectClass(SmartConnect);


export const use_ws_link_store = defineStore('ws_link', {
  state: () => ({
    client: null,
    config: null,
    busy: false,
  }),
  // getters: {
  //   WS_CLIENT (state) {
  //     return state.client;
  //   },
  // },
  actions: {
    ws_connect () {
      const config = { application: 'cone' };
      if (location.port === '8080') {
        // config.sessionURL = `ws://localhost:1234/ws`;
        config.sessionURL = `wss://api2.geode-solutions.com:443/ws`;
      }

      const { client } = this
      if (client && client.isConnected()) {
        client.disconnect(-1);
      }
      let clientToConnect = client;
      if (!clientToConnect) {
        clientToConnect = vtkWSLinkClient.newInstance({ protocols });
      }

      // Connect to busy store
      clientToConnect.onBusyChange((count) => {
        this.buzy = count
      });
      clientToConnect.beginBusy();

      // Error
      clientToConnect.onConnectionError((httpReq) => {
        const message =
          (httpReq && httpReq.response && httpReq.response.error) ||
          `Connection error`;
        console.error(message);
        console.log(httpReq);
      });

      // Close
      clientToConnect.onConnectionClose((httpReq) => {
        const message =
          (httpReq && httpReq.response && httpReq.response.error) ||
          `Connection close`;
        console.error(message);
        console.log(httpReq);
      });

      // Connect
      clientToConnect
        .connect(config)
        .then((validClient) => {
          connectImageStream(validClient.getConnection().getSession());
          this.client = validClient
          clientToConnect.endBusy();

          // Now that the client is ready let's setup the server for us
          this.ws_initialize_server()
          if (this.client) {
            this.client.getRemote().Cone.reset().catch(console.error);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    ws_initialize_server () {
      if (this.client) {
        this.client
          .getRemote()
          .Cone.createVisualization()
          .catch(console.error);
      }
    },
    reset_camera ({ state }) {
      if (state.client) {
        this.client.getRemote().Cone.resetCamera().catch(console.error);
      }
    },
  },
})
