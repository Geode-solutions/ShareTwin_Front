<template>
    <v-btn icon flat @click="open_file_input()"><v-icon icon="mdi-file-image-plus"></v-icon></v-btn>
</template>


<script setup>




function open_file_input () {
  var input = document.createElement('input');
  input.type = 'file';

  input.onchange = e => {
    var file = e.target.files[0];
  }

  input.click();
}</script>