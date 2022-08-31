<template>
  <v-app>
    <v-app-bar dark color="primary" fixed app clipped-left>
      <v-row class="hidden-sm-and-down px-2">
        <v-btn text active-class="no-active" nuxt to="/">
          <v-app-bar-nav-icon>
            <v-icon large>
              $vuetify.icons.logo
            </v-icon>
          </v-app-bar-nav-icon>
          <v-toolbar-title>{{ name }}</v-toolbar-title>
        </v-btn>
        <v-spacer />
        <v-switch
          class="switch"
          @click="$vuetify.theme.dark = !$vuetify.theme.dark"
        />
        <v-icon
          @click="resetCamera()"
        >
          mdi-camera
        </v-icon>
      </v-row>
      <v-progress-linear :active="busy" :indeterminate="busy" absolute bottom />
    </v-app-bar>

    <v-navigation-drawer
      clipped
      permanent
      app
      fixed
      disable-resize-watcher
      width="350"
    >
      <SideMenu />
    </v-navigation-drawer>
    
    <v-main class="secondary">
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
// mapActions
import SideMenu from '@/components/SideMenu.vue'

export default {
  name: 'DefaultLayout',
  components: {
    SideMenu
  },
  data () {
    return {
      name: 'Geode-solutions viewer',
    }
  },
  computed: {
    ...mapGetters({
      client: 'wslink/WS_CLIENT',
      busy: 'wslink/WS_BUSY',
      resolution: 'cone/CONE_RESOLUTION',
      height: 'cone/CONE_HEIGHT'
    })
  },
  // methods: {
  //   ...mapActions([
  //     'cone/setConeResolution',
  //     'cone/setConeHeight',
  //     'wslink/resetCamera',
  //     'wslink/ws_connect'
  //   ])
  // },
}
</script>

<style scoped>
* {
  text-transform: none !important;
}
.v-btn {
  min-width: 0;
}
.v-btn--active.no-active::before {
  opacity: 0 !important;
}
</style>

<style>
.v-card__text,
.v-card__title {
  word-break: normal; /* maybe !important  */
}
</style>
