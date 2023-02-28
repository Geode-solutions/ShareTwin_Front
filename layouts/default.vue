<template>
  <v-app>
    <Header />
    <SideMenu />

    <v-main class="secondary">
      <slot />
    </v-main>
  </v-app>
</template>



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
