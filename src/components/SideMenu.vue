<template>
  <v-expansion-panels v-model="panelState" multiple accordion>
    <v-expansion-panel
      ><v-file-input
        chips
        class="pa-4"
        messages="Please select a .vtp file"
        accept=".vtp"
        v-model="VtpFile"
      ></v-file-input>
      <v-file-input
        chips
        class="pa-4"
        messages="Please select a .vti file"
        accept=".vti"
        v-model="VtiFile"
      ></v-file-input>
      <v-btn class="white--text" @click="Load" color="#003630">Load</v-btn>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SideMenu',
  data() {
    return {
      VtiFile: '',
      VtpFile: '',
    };
  },
  computed: {},
  methods: {
    ...mapActions(['setFilenames', 'sendFilenames']),

    Load() {
      const VtiFilename = this.VtiFile.name;
      const VtpFilename = this.VtpFile.name;
      this.sendFilenames({ VtiFilename, VtpFilename });
    },
  },
};
</script>
