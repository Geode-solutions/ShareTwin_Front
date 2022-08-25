<template>
  <v-expansion-panels v-model="panelState" multiple accordion>
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
    ...mapActions(['setFilenames', 'sendFilenames']),

    UploadFile () {
      const self = this
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = async function (event) {
          try {
            const params = new FormData()
            params.append('file', event.target.result)
            params.append('filename', self.files[0].name)
            params.append('filesize', self.files[0].size)

            self.loading = true
            const response = await self.$axios.post('http://localhost:1234/123456/validitychecker/uploadfile', params)
            self.loading = false

            resolve(response)
          } catch (err) {
            reject(err)
          }
        }
        reader.readAsDataURL(this.files[0])
      })
    },
    Load () {
      const VtiFilename = this.VtiFile.name
      const VtpFilename = this.VtpFile.name
      this.sendFilenames({ VtiFilename, VtpFilename })
    }
  }
}
</script>
