<template>
  <v-tooltip text="Add a texture">
    <template v-slot:activator="{ props }">
      <v-btn icon size="20">
        <v-icon icon="mdi-plus-circle" size="20" v-bind="props"></v-icon>
      </v-btn>
    </template>
  </v-tooltip>
</template>



<script setup>


</script>