<template>
  <v-expansion-panels multiple accordion>
    <v-expansion-panel>
      <v-expansion-panel-header>
        <div>
          <v-icon color="primary" size="30">
            mdi-file-upload
          </v-icon>
          Load files
        </div>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row v-for="(item, index) in items"
               :key="index"
        >
          <FileSelector v-model="item.file" :messages="item.messages" :accept="item.accept" />
        </v-row>
        <v-row
          align-content="center"
          justify="center"
        >
          <v-col cols="auto">
            <v-btn color="primary" @click="Upload">
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

    async Upload () {
      const self = this
      // self.$store.wslink.commit('WS_BUSY_SET', true)
      for (let i = 0; i < self.items.length; i++) {
        if (this.items[i].file.length){
          const reader = new FileReader()
          reader.onload = async function (event) {
            const params = new FormData()
            params.append('object', 'PolygonalSurface3D')
            params.append('file', event.target.result)
            params.append('filename', self.items[i].file[0].name)
            params.append('filesize', self.items[i].file[0].size)
            params.append('extension', 'vtp')
            // self.$store.wslink.commit('WS_BUSY_SET', true)
            try {
            self.$axios
              .post(`${self.$config.API_URL}/123456/api/uploadfile`, params)
              .then((response) => {
                if (response.status == 200) {
                  console.log('OKAYYYYY')
                  // this.Load()
                }
                // self.$store.wslink.commit('WS_BUSY_SET', false)
              })
            } catch(err){
              // self.$store.wslink.commit('WS_BUSY_SET', false)
            }
          }
          console.log('filename : ')
          if (this.items[i].file.length){
            reader.readAsDataURL(this.items[i].file[0])

          }
        }
      }
    },
    Load () {
      // const VtiFilename = this.VtiFile.name
      // const VtpFilename = this.VtpFile.name
      console.log('fileSize : ', this.items[0].file[0].size)
      // this.sendFilenames({ this })
      // this.sendFilenames({ VtiFilename, VtpFilename })
    }
  }
}
</script>
