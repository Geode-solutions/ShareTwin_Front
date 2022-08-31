<template>
  <v-expansion-panels multiple accordion>
    <v-expansion-panel>
      <v-expansion-panel-header>
        <div>
          <v-icon color="primary" size="30">mdi-file-upload</v-icon>
          Load files
        </div>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row>
          <FileSelector v-model="VtpFile" messages="Please select a .vtp file" accept=".vtp" />
        </v-row>
        <v-row>
          <FileSelector v-model="VtiFile" messages="Please select a .vti file" accept=".vti" />
        </v-row>
        <v-row
          align-content="center"
          justify="center">
          <v-col cols="auto">
            <v-btn color="primary" @click="Load">
              Load
            </v-btn>
          </v-col>
        </v-row>
      </v-expansion-panel-content>
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
    async Load () {
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
    // Load () {
    //   // const VtiFilename = this.VtiFile.name
    //   const VtpFilename = this.VtpFile.name
    //   this.sendFilenames({ VtpFilename })
    //   // this.sendFilenames({ VtiFilename, VtpFilename })
    // }
  }
}
</script>
