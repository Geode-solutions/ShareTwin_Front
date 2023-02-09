import { defineStore } from 'pinia'

import vtkWSLinkClient from '@kitware/vtk.js/IO/Core/WSLinkClient'
import SmartConnect from 'wslink/src/SmartConnect'

import '@kitware/vtk.js/Rendering/OpenGL/Profiles/Geometry'
import { connectImageStream } from '@kitware/vtk.js/Rendering/Misc/RemoteView'
import protocols from '@/protocols'

// Bind vtkWSLinkClient to our SmartConnect
vtkWSLinkClient.setSmartConnectClass(SmartConnect);


export const use_ws_link_store = defineStore('ws_link', {
  state: () => ({
    client: null,
    config: null,
    busy: false,
  }),
  actions: {
    ws_connect () {
      const config = { application: 'cone' };
      const cloud_store = use_cloud_store()
      const { ID } = storeToRefs(cloud_store)
      const app_config = useRuntimeConfig()
      const base_url = `${app_config.WS_PROTOCOL}://${app_config.BASE_URL}/${ID.value}`
      config.sessionURL = `${base_url}/viewer/ws`

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
          .Cone.create_visualization()
          .catch(console.error);
      }
    },
    reset_camera () {
      if (this.client) {
        this.client.getRemote().Cone.reset_camera().catch(console.error);
      }
    },
  },
})
