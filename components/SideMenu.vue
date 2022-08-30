<template>
  <v-expansion-panels multiple accordion>
    <v-expansion-panel>
      <FileSelector v-model="VtpFile" messages="Please select a .vtp file" accept=".vtp" />
      <FileSelector v-model="VtiFile" messages="Please select a .vti file" accept=".vti" />
      <v-btn class="white--text" color="#003630" @click="Load">
        Load
      </v-btn>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import FileSelector from '@/components/FileSelector.vue'

export default {
  name: 'SideMenu',
  components: { FileSelector },
  data () {
    return {
      files: [],
      success: false,
      message: '',
      VtiFile: '',
      VtpFile: ''
    }
  },
  computed: {
    ...mapState({
      busy: 'busy'
    }),
  },
  methods: {
    ...mapActions({
      setFilenames: 'wslink/setFilenames',
      sendFilenames: 'cone/sendFilenames'
    }),

    SetVtpFile(changedFiles){
      this.success = true
      this.message = 'File(s) selected'
      if (changedFiles) {
        this.files = [changedFiles]
      }
    },
    SetVtiFile(changedFiles){
      this.success = true
      this.message = 'File(s) selected'
      if (changedFiles) {
        this.files = [changedFiles]
      }
    },
    async Upload () {
      const self = this
      const reader = new FileReader()
      reader.onload = async function (event) {
        const params = new FormData()

        params.append('object', 'PolygonalSurface3D')
        params.append('file', event.target.result)
        params.append('filename', self.this.VtpFile.name)
        params.append('filesize', self.this.VtpFile.size)
        params.append('extension', 'vtp')

        self.busy = true

        try {
          await self.$axios
          .post(`${self.ID}/fileconverter/convertfile`, params, {responseType: 'blob'})
          .then((response) => {
            if (response.status == 200) {
              this.Load()
            }
            self.busy = false
          })
        } catch(err){
          self.busy = false
        }
      }
      await reader.readAsDataURL(this.files[0])
    },
    Load () {
      // const VtiFilename = this.VtiFile.name
      const VtpFilename = this.VtpFile.name
      this.sendFilenames({ VtpFilename })
      // this.sendFilenames({ VtiFilename, VtpFilename })
    }
  }
}
</script>
