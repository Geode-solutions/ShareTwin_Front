<template>
  <v-container class="space-around">
    <v-row align-content="center" class="justify-center">
      <v-col v-if="((!captcha_validated) && ($config.NODE_ENV === 'production'))" cols="12" align-self="center" class="center">
        <v-card class="pb-5" elevation="5">
          <v-card-title class="justify-center">
            Please confirm that you are not a robot
          </v-card-title>
          <v-card-text class="justify-center">
            Please confirm that you're not a robot before launching the app
          </v-card-text>
        </v-card>
        <recaptcha class="justify-center" />
        <v-btn color="primary" @click="submit_recaptcha()">
          Start app
        </v-btn> 
      </v-col>
      <v-col v-else-if="internal_error">
        <InternalError />
      </v-col>
      <v-col v-else-if="under_maintenance">
        <UnderMaintenance />
      </v-col>
      <v-col v-else-if="!cloud_running">
        <CloudLoading />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import CloudLoading from '@/components/CloudLoading.vue'
import InternalError from '@/components/InternalError.vue'
import UnderMaintenance from '@/components/UnderMaintenance.vue'

export default {
  name: 'FileConverter',
  components: { CloudLoading
              , InternalError
              , UnderMaintenance },
  computed: {
    ...mapState(['captcha_validated'
                , 'cloud_running'
                , 'internal_error'
                , 'under_maintenance']),
  },
  watch: {
    async captcha_validated(newValue) {
      if (newValue === true) {
        await this.create_connexion()
        this.ws_connect()
        console.log('tototo')
      }
    },
    cloud_running(newValue, oldValue) {
      if (newValue === false && oldValue == true) {
        this.$store.commit('set_internal_error', true)
      }
    },
  },
  mounted(){
    if(process.client){
      console.log(this.$config.NODE_ENV)
        if(this.$config.NODE_ENV !== 'production'){
            this.$store.commit('set_captcha_validated', true)
        }
    }
  },

  methods: {
    ...mapActions({ create_connexion: 'create_connexion', ws_connect: 'wslink/ws_connect'}),
    async submit_recaptcha() {
        try {
        const token = await this.$recaptcha.getResponse()
        console.log('ReCaptcha token:', token)
        const response = await this.$axios.post(`${this.$config.SITE_URL}/.netlify/functions/recaptcha?token=${token}`)
        this.$store.commit('set_captcha_validated', response.status == 200)
        console.log('this.captchaValidated :', this.captchaValidated)
        await this.$recaptcha.reset()
        } catch (error) {
        console.log('Login error:', error)
        }
    },
  },
}
</script>
