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
        <v-row v-for="(item, index) in items"
          :key="index">
          <FileSelector :messages="item.messages" :accept="item.accept" :file="item.file" :v-model="item.file" />
        </v-row>
        <v-row
          align-content="center"
          justify="center">
          <v-col cols="auto">
            <v-btn color="primary" @click="Load">
              Upload
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
      VtpFile: '',
      items: [
        {
          file: []
          , messages: "Please select a .vtp file"
          , accept: ".vtp"
        }
        , {
          file: []
          , messages: "Please select a .vti file"
          , accept: ".vti"
        }
      ]
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
      for (let i = 0; i < this.items.length; i++) {
        let currentFile = this.items[i].file
        console.log('currentFile.size : ', currentFile.size)
        if(currentFile){
          reader.onload = async function () {
            const params = new FormData()
    
            params.append('object', 'PolygonalSurface3D')
            params.append('file', currentFile)
            params.append('filename', currentFile.name)
            params.append('filesize', currentFile.size)
            params.append('extension', 'vtp')
    
            self.busy = true
    
            try {
              await self.$axios
              .post(`${self.ID}/api/uploadfile`, params)
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
        }
      }
      await reader.readAsDataURL(this.files[0])
    },
    Load () {
      // const VtiFilename = this.VtiFile.name
      // const VtpFilename = this.VtpFile.name
      console.log('fileSize : ', this.items[0].file.name)
      // this.sendFilenames({ this })
      // this.sendFilenames({ VtiFilename, VtpFilename })
    }
  }
}
</script>
