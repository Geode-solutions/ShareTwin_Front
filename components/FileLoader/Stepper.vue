<template>
  <v-card class="card">
    <div v-for="(step, step_index) in steps" :key="step_index" class="pa-3">
      <FileLoaderStep :step_index="step_index" />
    </div>
  </v-card>
</template>

<script setup>
const stepper_tree = inject('stepper_tree')
const { steps } = stepper_tree

</script>
