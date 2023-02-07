<template>
  <v-file-input v-model="files" chips class="pa-4" :label="label" :accept="accept" @click:clear="files = []"
    @change="SetFilename" />
</template>

<script setup>

const props = DefineProps({
  component_options: { type: Object, required: true }
})

const { accept, label } = props.component_options
const files = ref([])

watch(files, (value) => {
  console.log(value)
})

</script>
