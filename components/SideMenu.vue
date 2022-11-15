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
      DataFilename: '',
      TextureFilename: '',
      items: [
        {
          file: []
          , messages: "Please select a data file"
          , accept: ".obj, .vtp"
          , type : "data"
        }
        , {
          file: []
          , messages: "Please select a texture file"
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
      setBusy: 'wslink/WS_BUSY_SET',
      sendFilenames: 'cone/sendFilenames'
    }),

    async Upload () {
      const self = this
      self.setBusy(true)

      for (let i = 0; i < self.items.length; i++) {
        if (this.items[i].file.length){
          const reader = new FileReader()
          reader.onload = async function (event) {
            const params = new FormData()
            params.append('file', event.target.result)
            params.append('filename', self.items[i].file[0].name)
            params.append('filesize', self.items[i].file[0].size)

            let route
            if((self.items[i].type==="data") && (!self.items[i].file[0].name.includes('.vtp'))){
              console.log(self.items[i].file[0].name.includes('.vtp'))
              route = "convertfile"
              params.append('object', 'PolygonalSurface3D')
              params.append('extension', 'vtp')
            } else if(self.items[i].type==="texture"){
              route = "uploadfile"
            }
            // console.log('route :', route)
            // console.log('self.$config.GEODE_URL :', self.$config.GEODE_URL)
            try {
            const response = await self.$axios.post(`${self.$config.GEODE_URL}/geode/${route}`, params)
     
            if (response.status == 200) {
              let newFilename = response.data.newFilename
              console.log({newFilename})
              if(self.items[i].type==="data"){
                self.DataFilename = newFilename
              } else if(self.items[i].type==="texture"){
                self.TextureFilename = newFilename
              }
              self.Load(self.DataFilename, self.TextureFilename)
            }

            } catch(err){
              console.log({err})
              self.setBusy(false)
            }
          }
          if (self.items[i].file.length){
            reader.readAsDataURL(this.items[i].file[0])
          }
        }
      }

    },
    async Load (DataFilename, TextureFilename) {
      this.sendFilenames({ DataFilename, TextureFilename })
    }
  }
}
</script>
