<template>
  <v-app>
    <LayoutHeader />
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

.card {
  border-radius: 15px
}
</style>

