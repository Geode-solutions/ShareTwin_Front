<template>
  <v-app>
    <Header />
    <SideMenu />
    <FileLoaderWrapper />

    <v-main class="secondary">
      <slot />
    </v-main>
  </v-app>
</template>

<script setup>

</script>

<style scoped>
* {
  text-transform: none !important;
}
</style>

<style>
.card {
  border-radius: 15px
}
</style>
