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
          <FileSelector v-model="item.file" :messages="item.messages" :accept="item.accept"/>
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
      VtiFilename: '',
      VtpFilename: '',
      items: [
        {
          file: []
          , messages: "Please select a .obj file"
          , accept: ".obj"
          , type : "data"
        }
        , {
          file: []
          , messages: "Please select a .vti file"
          , accept: ".vti"
          , type : "texture"
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
            params.append('file', event.target.result)
            params.append('filename', self.items[i].file[0].name)
            params.append('filesize', self.items[i].file[0].size)

            let route
            if(self.items[i].type==="data"){
              route = "convertfile"
              params.append('object', 'PolygonalSurface3D')
              params.append('extension', 'vtp')
            } else if(self.items[i].type==="texture"){
              route = "uploadfile"
            }
            try {
            self.$axios
              .post(`${self.$config.API_URL}/${route}`, params)
              .then((response) => {
                if (response.status == 200) {
                  let newFilename = response.data.newFilename
                  console.log(newFilename)
                  if(i===0){
                    self.VtpFilename = newFilename
                  } else if(i===1){
                    self.VtiFilename = newFilename
                  }
                }
              })
            } catch(err){
              console.log({err})
              self.$store.wslink.commit('WS_BUSY_SET', false)
            }
          }
          if (this.items[i].file.length){
            reader.readAsDataURL(this.items[i].file[0])
            console.log(this.VtpFilename)
          }
        }
      }
      console.log(this.VtpFilename)
      console.log(this.VtpFilename)

      this.Load(this.VtpFilename, this.VtiFilename)
    },
    Load (VtpFilename, VtiFilename) {
      this.sendFilenames({ VtpFilename, VtiFilename })
    }
  }
}
</script>
