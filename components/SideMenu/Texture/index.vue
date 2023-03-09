<template>
  <v-row>
    <v-col cols="8">
      <SideMenuTextureSelector :index="index" />
    </v-col>
    <v-spacer />
    <v-col cols="2" class="pa-0 align-self-center">
      <SideMenuTextureFileSelector :index="index" />
    </v-col>
  </v-row>
</template>


<script setup>
const props = defineProps({
  index: { type: Number, required: true }
})

const { index } = props
</script>