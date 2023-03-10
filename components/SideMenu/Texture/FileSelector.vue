<template>
  <v-badge :content="texture_file.length" color="primary">
    <v-btn icon flat @click="open_file_input()"><v-icon icon="mdi-file-image-plus" color="primary"></v-icon></v-btn>
  </v-badge>
</template>


<script setup>


function get_raster_image_ () {
  return 1
}


const texture_file = ref([])



function open_file_input () {
  var input = document.createElement('input');
  input.type = 'file';
  input.accept = '.vtp';
  input.multiple = true;

  input.onchange = e => {
    texture_file.value = e.target.files;
    console.log(e.target.files[0].name)
  }
  input.click();
}


// const stepper_tree = inject('stepper_tree')

onMounted(() => {
  get_raster_image_()
})

</script>