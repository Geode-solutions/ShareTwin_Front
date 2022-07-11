<template>
  <v-app>
    <v-app-bar app absolute clipped-left>
      <v-app-bar-nav-icon @click="controlsDrawer = !controlsDrawer" />
      <img :src="logo" class="logo" v-on:click="resetCamera()" />
      <span class="title">Geode-solutions viewer</span>
      <v-progress-linear :active="busy" :indeterminate="busy" absolute bottom />
      <v-spacer />
      <v-switch
        class="switch"
        @click="$vuetify.theme.dark = !$vuetify.theme.dark"
      />
      <v-icon v-text="`$resetCamera`" v-on:click="resetCamera()" />
    </v-app-bar>
    <v-navigation-drawer
      v-model="controlsDrawer"
      clipped
      app
      fixed
      disable-resize-watcher
      width="300"
    >
      <SideMenu />
    </v-navigation-drawer>
    <v-main class="appContent">
      <div style="position: relative; width: 100%; height: 100%">
        <remote-rendering-view :client="client" />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import logo from 'Visualization_Frontend/src/assets/logo.png';
import RemoteRenderingView from 'Visualization_Frontend/src/components/RemoteRenderingView.vue';
import SideMenu from 'Visualization_Frontend/src/components/SideMenu.vue';

// ----------------------------------------------------------------------------
// Component API
// ----------------------------------------------------------------------------

export default {
  name: 'App',
  components: {
    RemoteRenderingView,
    SideMenu,
  },
  data() {
    return {
      logo,
    };
  },
  computed: {
    ...mapGetters({
      client: 'WS_CLIENT',
      busy: 'WS_BUSY',
      resolution: 'CONE_RESOLUTION',
      height: 'CONE_HEIGHT',
    }),
  },
  methods: {
    ...mapActions([
      'setConeResolution',
      'setConeHeight',
      'resetCamera',
      'ws_connect',
    ]),
  },
  mounted() {
    this.ws_connect();
  },
};
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
