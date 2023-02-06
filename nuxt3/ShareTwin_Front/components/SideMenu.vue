<template>
  <v-expansion-panels v-model="panelState" multiple accordion>
    <v-expansion-panel>
      <v-file-input chips class="pa-4" label="Please select a .vtp file" accept=".vtp" v-model="VtpFilename" />
      <v-file-input chips class="pa-4" label="Please select a .vti file" accept=".vti" v-model="VtiFilename" />
      <v-btn class="white--text" @click="Load" color="primary">Load</v-btn>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
const VtiFilename = ''
const VtpFilename = ''
function Load (VtiFilename, VtpFilename) {
  send_filenames({ VtiFilename, VtpFilename });
}

</script>
