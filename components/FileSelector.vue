<template>
  <v-file-input v-model="files" chips class="pa-4" :label="label" :accept="accept" @click:clear="files = []" />
</template>

<script setup>
const data_tree = inject('data_tree')

const props = defineProps({
  component_options: { type: Object, required: true },
  index: { type: Number, required: true }
})

const { accept, label } = props.component_options
const { index } = props
const files = ref([])

watch(files, (value) => {
  console.log(value)
  data_tree.items[index].file = value

})

</script>
