<template>
  <v-file-input v-model="file" chips class="pa-4" :accept="accept" :label="message" :success="success"
    @click:clear="file = []"  />
</template>

<script setup>


  function SetFilename (changedFile) {
      if (changedFile) {
        this.file = [changedFile]
        this.$emit('input', this.file)
      }
    },
  }
}
</script>