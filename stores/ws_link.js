import { defineStore } from 'pinia'
import { use_cloud_store } from '@/stores/cloud'
import _ from 'lodash'

import vtkWSLinkClient from '@kitware/vtk.js/IO/Core/WSLinkClient'
import SmartConnect from 'wslink/src/SmartConnect'

import '@kitware/vtk.js/Rendering/OpenGL/Profiles/Geometry'
import { connectImageStream } from '@kitware/vtk.js/Rendering/Misc/RemoteView'
import protocols from '@/protocols'

// Bind vtkWSLinkClient to our SmartConnect
vtkWSLinkClient.setSmartConnectClass(SmartConnect);


export const use_ws_link_store = defineStore('ws_link', {
  state: () => ({
    client: {},
    config: null,
    busy: false,
    is_client_created: false
  }),
  actions: {
    ws_connect () {
      const config = { application: 'cone' };
      const cloud_store = use_cloud_store()
      const { ID } = storeToRefs(cloud_store)
      const app_config = useRuntimeConfig()
      console.log(app_config)
      const base_url = `${app_config.public.VIEWER_PROTOCOL}://${app_config.public.API_URL}/${ID.value}`
      config.sessionURL = `${base_url}/viewer/ws`

      const { client } = this
      console.log("created ", this.is_client_created);
      if (this.is_client_created && client.isConnected()) {
        client.disconnect(-1);
        this.is_client_created = false;
      }
      console.log("created ", this.is_client_created);
      let clientToConnect = client;
      console.log(_.isEmpty(clientToConnect))
      if (_.isEmpty(clientToConnect)) {
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
          this.client.getRemote().vtk.reset().catch(console.error);
          console.log("created ", this.is_client_created);
          this.is_client_created = true;
          console.log("created ", this.is_client_created);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    ws_initialize_server () {
      console.log('ws_initialize_server !_.isEmpty(this.client)', !_.isEmpty(this.client))
      console.log('ws_initialize_server this.client', this.client)
      if (!_.isEmpty(this.client)) {
        this.client
          .getRemote()
          .vtk.create_visualization()
          .catch(console.error);
      }
    },
    reset_camera () {
      console.log('reset_camera !_.isEmpty(this.client)', !_.isEmpty(this.client))
      console.log('reset_camera this.client', this.client)
      if (!_.isEmpty(this.client)) {
        this.client.getRemote().vtk.reset_camera().catch(console.error);
      }
    },
  },
})
