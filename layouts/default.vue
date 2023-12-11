<template>
  <v-app>
    <LayoutHeader />
    <v-main class="secondary">
      <slot />
    </v-main>
  </v-app>
  <CookieControl v-if="public_runtime_config.NODE_ENV === 'production'" />
</template>

<script setup>
  const public_runtime_config = useRuntimeConfig().public
</script>

<style scoped>
  * {
    text-transform: none !important;
  }

  .card {
    border-radius: 15px;
  }
</style>
