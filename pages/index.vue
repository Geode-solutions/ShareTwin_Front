<template>
  <div style="position: relative; width: 100%; height: 100%">
    <Launcher v-if="!cloudRunning" />
    <remote-rendering-view v-else :client="client" />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import RemoteRenderingView from '@/components/RemoteRenderingView.vue'
import Launcher from '@/components/Launcher.vue'
// ----------------------------------------------------------------------------
// Component API
// ----------------------------------------------------------------------------

export default {
  name: 'App',
  components: {
    Launcher, RemoteRenderingView,
  },
  computed: {
    ...mapState({ID: 'ID', cloudRunning: 'cloudRunning'}),
    ...mapGetters({
      busy: 'wslink/WS_BUSY',
      client: 'wslink/WS_CLIENT',
      height: 'cone/CONE_HEIGHT',
      resolution: 'cone/CONE_RESOLUTION'
    })
  },
  async mounted () {
    if(process.client){
      await this.createConnexion()
      this.ws_connect()
    }
  },
  methods: {
    ...mapActions({
      createConnexion: 'createConnexion',
      setConeResolution: 'cone/setConeResolution',
      setConeHeight: 'cone/setConeHeight',
      resetCamera: 'wslink/resetCamera',
      ws_connect: 'wslink/ws_connect'
  })
  },
}
</script>

<style scoped>
/* set vuetify-specific wrapper to contain our overlay */
.content--wrap {
  position: relative;
}

.appContent {
  /* need a fixed height of arbitrary value
   * so the vtk viewers don't grow too much in
   * height when resizing. */
  height: 0;
}

.logo {
  height: 35px;
  padding-right: 10px;
}

.slider {
  max-width: 300px;
}

.switch {
  max-width: 100px;
  width: auto;
  flex: 0;
  padding-left: 20px;
  padding-top: 20px !important;
}
</style>
