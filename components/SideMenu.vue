<template>
  <v-expansion-panels multiple accordion>
    <v-expansion-panel>
      <v-file-input
        v-model="VtpFile"
        chips
        class="pa-4"
        messages="Please select a .vtp file"
        accept=".vtp"
      />
      <v-file-input
        v-model="VtiFile"
        chips
        class="pa-4"
        messages="Please select a .vti file"
        accept=".vti"
      />
      <v-btn class="white--text" color="#003630" @click="Load">
        Load
      </v-btn>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SideMenu',
  data () {
    return {
      VtiFile: '',
      VtpFile: ''
    }
  },
  computed: {},
  methods: {
    ...mapActions({
      setFilenames: 'wslink/setFilenames',
      sendFilenames: 'cone/sendFilenames'
    }),
    Load () {
      const VtiFilename = this.VtiFile.name
      const VtpFilename = this.VtpFile.name
      this.sendFilenames({ VtiFilename, VtpFilename })
    }
  }
}
</script>
