<template>
  <v-app>
    <v-app-bar dark color="primary" fixed app clipped-left>
      <v-row class="hidden-sm-and-down px-2">
        <v-col>

          <v-btn :active="false" active-class="no-active" to="/">
            <!-- <v-app-bar-nav-icon> -->
            <ShareTwinLogo />
            <!-- </v-app-bar-nav-icon> -->
          </v-btn>
          <v-spacer />
        </v-col>
      </v-row>
      <v-progress-linear :active="busy" :indeterminate="busy" absolute bottom />
    </v-app-bar>

    <v-navigation-drawer clipped permanent app fixed disable-resize-watcher width="350">
      <SideMenu />
    </v-navigation-drawer>

    <v-main class="secondary">
      <slot />
    </v-main>
  </v-app>
</template>

<script setup>
// busy: 'wslink/WS_BUSY',
</script>

<style scoped>
* {
  text-transform: none !important;
}
</style>

<style>
.v-card__text,
.v-card__title {
  word-break: normal;
  /* maybe !important  */
}
</style>
