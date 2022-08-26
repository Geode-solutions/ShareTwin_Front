<template>
  <v-main class="appContent">
    <!-- <div style="position: relative; width: 100%; height: 100%">
      <remote-rendering-view :client="client" />
    </div> -->
  </v-main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

// import RemoteRenderingView from '@/components/RemoteRenderingView.vue'


// ----------------------------------------------------------------------------
// Component API
// ----------------------------------------------------------------------------

export default {
  name: 'App',
  components: {
    // RemoteRenderingView,
  },
  computed: {
    ...mapGetters({
      client: 'WS_CLIENT',
      busy: 'WS_BUSY',
      resolution: 'CONE_RESOLUTION',
      height: 'CONE_HEIGHT'
    })
  },
  mounted () {
    this.ws_connect()
  },
  methods: {
    ...mapActions([
      'setConeResolution',
      'setConeHeight',
      'resetCamera',
      'ws_connect'
    ])
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
