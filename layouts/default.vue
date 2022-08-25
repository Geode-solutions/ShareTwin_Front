<template>
  <v-app>
    <v-app-bar dark color="primary" fixed app>
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
          mdiCamera
        </v-icon>
      </v-row>
      <v-progress-linear :active="busy" :indeterminate="busy" absolute bottom />
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
    
    <v-main class="secondary">
      <nuxt />
    </v-main>

    <!-- <CookieControl v-if="$config.NODE_ENV === 'production'" /> -->
  </v-app>
</template>

<script>
import SideMenu from '@/components/SideMenu.vue'

export default {
  name: 'DefaultLayout',
  components: {
    SideMenu
  },
  data () {
    return {
      name: 'Geode-solutions viewer',
      menu: true,
      date: new Date().getFullYear()
    }
  }
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
